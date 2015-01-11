function cardsFactory(socketio, $rootScope)
{
	var factory = {};
	var searchedCards = [];
	var savedCards = [];

	socketio.on('list', replaceSimpleList);
	socketio.on('card', replaceWithFullCard);

	function replaceSimpleList(simpleList)
	{
		//console.log('got list', simpleList);
		searchedCards = simpleList;
		$rootScope.$apply();
	}

	function replaceWithFullCard(fullCard)
	{
		//console.log('got card', fullCard);
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
		console.log('search called, searching:', query);
		if (query) socketio.emit('search', query);
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