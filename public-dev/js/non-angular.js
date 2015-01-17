
/**
 * Add shadow to the search box area when scrolling down the cards
 * Remove shadow when scrolled all the way up
 */
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

/**
 * Get rid of the tabIndex which causes dotted lines around the whole div
 * There's no option for it in the nanoScroller config
 * You can only set the tabIndex to -1 but it still gets focused when you click a card
 */
(function()
{
	setTimeout(function()
	{
		$('.nano-content').removeAttr('tabIndex');
	}, 500);
})();