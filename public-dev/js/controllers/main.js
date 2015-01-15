function mainController($scope)
{
	var searching = true;

	$scope.isSearching = function() {return searching;};
	$scope.setSearching = function(bool) {searching = bool;};
}