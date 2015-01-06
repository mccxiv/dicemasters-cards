function searchController($scope, cards)
{
	$scope.getCards = cards.getSearchedCards;
	$scope.save = cards.save;
	$scope.search = cards.search;
}