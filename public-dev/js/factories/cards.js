function cardsFactory(socketio, $rootScope)
{
	var factory = {};
	var searchedCards = [];
	var savedCards = [];
	var previousQuery;

	socketio.on('list', replaceSimpleList);
	socketio.on('card', replaceWithFullCard);

	function replaceSimpleList(simpleList)
	{
		searchedCards = simpleList;
		$rootScope.$apply();
	}

	function replaceWithFullCard(fullCard)
	{
		replaceCard(searchedCards, fullCard);
		replaceCard(savedCards, fullCard);
		$rootScope.$apply();
	}

	function replaceCard(cards, card)
	{
		_(cards).each(function(element, index, list)
		{
			if (element.name === card.name)
			{
				list[index] = card;
			}
		});
	}

	factory.getSearchedCards = function() {return searchedCards};
	factory.getSavedCards = function() {return savedCards};

	factory.search = function(query)
	{
		var newQuery = query.trim();
		if (!newQuery || previousQuery === newQuery) return;
		previousQuery = newQuery;

		console.log('searching:', newQuery);
		if (query && query.length > 2) socketio.emit('search', newQuery);
	};

	factory.save = function(name)
	{
		console.log('saving '+name);
		if (!_(savedCards).findWhere({name: name})) // not pushing if it's already in
		{
			var card = _(searchedCards).findWhere({name: name});
			if (card) savedCards.push(card);
		}
	};

	factory.unsave = function(name)
	{
		console.log('unsaving '+name);
		var card = _(savedCards).findWhere({name: name});
		if (card) savedCards = _(savedCards).without(card);
	};

	return factory;
}