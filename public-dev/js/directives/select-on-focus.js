function selectOnFocusDirective()
{
	return {
		restrict: 'A',
		link: function (scope, element)
		{
			element.on('click', function ()
			{
				this.select();
			});
		}
	};
}