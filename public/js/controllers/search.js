function searchController($scope, cards)
{
	$scope.getCards = cards.getSearchedCards;

	$scope.queryChanged = function(query)
	{
		if (query) cards.search(query);
	}
}