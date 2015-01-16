function cardsFactory(socketio, $rootScope, ngProgress)
{
	var factory = {};
	var searchedCards = [];
	var savedCards = [];
	var previousQuery;

	socketio.on('list', gotList);
	socketio.on('card', replaceWithFullCard);

	function gotList(simpleList)
	{
		console.log('got list:', simpleList);
		ngProgress.complete();
		replaceSimpleList(simpleList);
	}

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
		var newQuery;
		if (query) newQuery = query.trim();
		if (!newQuery || newQuery.length < 3 || previousQuery === newQuery) return;
		previousQuery = newQuery;

		console.log('searching:', newQuery);
		ngProgress.start();
		socketio.emit('search', newQuery);
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