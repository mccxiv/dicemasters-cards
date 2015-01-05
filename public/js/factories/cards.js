function cardsFactory(socketio, $rootScope)
{
	var factory = {};
	var searchedCards = [];
	var savedCards = [];

	socketio.on('list', replaceSimpleList);
	socketio.on('card', replaceSearchCard);

	function replaceSimpleList(simpleList)
	{
		console.log('got list', simpleList);
		searchedCards = simpleList;
		$rootScope.$apply();
	}

	function replaceSearchCard(fullCard)
	{
		console.log('got card', fullCard);
		_(searchedCards).each(function(element, index, list)
		{
			if (element.name === fullCard.name)
			{
				list[index] = fullCard;
				$rootScope.$apply();
			}
		});
	}

	factory.getSearchedCards = function() {return searchedCards};
	factory.getSavedCards = function() {return savedCards};

	factory.search = function(query, progressCallback)
	{
		socketio.emit('search', query); //TODO
	};

	factory.save = function(name)
	{
		var card = _(searchedCards).findWhere({name: name});
		if (card) savedCards.push(card);
	};

	factory.unsave = function(name)
	{
		var card = _(savedCards).findWhere({name: name});
		if (card) savedCards = _(savedCards).without(card);
	};

	return factory;
}
