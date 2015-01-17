(function()
{
	var body = $('body');

	$(document).on('update', '.nano', handleNanoScroll);

	function handleNanoScroll(e, values)
	{
		if (values.position) body.addClass('scrolling-search-cards');
		if (!values.position) body.removeClass('scrolling-search-cards');
	}

})();