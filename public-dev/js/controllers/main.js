function mainController($scope)
{
	var searching = true;

	$scope.isSearching = function() {return searching;};
	$scope.setSearching = function(bool)
	{
		searching = bool;
		fixNanoScroller();
	};

	/**
	 * Hack! nanoScroller needs to be told to update
	 * itself after layout changes :(
	 */
	function fixNanoScroller()
	{
		setTimeout(function() {angular.element('.nano').nanoScroller();}, 400);
	}
}