function searchController($scope, cards)
{
	$scope.cards = cards.searchCards;



	$scope.queryChanged = function(query)
	{
		if (query) socketIo.emit('search', query);
	}
}