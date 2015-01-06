function mainController($scope)
{
	var searching = false;

	$scope.isSearching = function() {return searching;};
	$scope.setSearching = function(bool) {searching = bool;};
}