function searchController($scope, cards)
{
	$scope.getCards = cards.getSearchedCards;
	$scope.save = cards.save;
	$scope.search = _.debounce(cards.search, 1000);

	$scope.key = function($event)
	{
		console.log('target', $event.target);
		if ($event.keyCode === 13)
		{
			angular.element($event.target)[0].blur();
		}
	}
}