function cardsFactory(socketio)
{
	var searchedCards = [];
	var savedCards = [];

	socketio.on('list', replaceSimpleList);
	socketio.on('card', replaceSearchCard);

	function save(name)
	{
		var card = _(searchedCards).findWhere({name: name});
		if (card) savedCards.push(card);
	}

	function unsave(name)
	{
		var card = _(savedCards).findWhere({name: name});
		if (card) savedCards = _(savedCards).without(card);
	}

	function replaceSimpleList(simpleList)
	{
		searchedCards = simpleList;
	}

	function replaceSearchCard(fullCard)
	{
		_(searchedCards).each(function(element, index, list)
		{
			if (element.name === fullCard.name) list[index] = fullCard;
		});
	}

	function search(query, progressCallback)
	{
		/*socketio.emit('search', query)
		socketio.on('list', progressCallback);
		socketio.on('card', progressCallback);
		socketio.on('done', progressCallback);*/ //TODO
	}

	return {
		getSaved: function() {return savedCards;},
		getSearched: function() {return searchedCards},
		save: save,
		unsave: unsave,
		search: search
	}
}
