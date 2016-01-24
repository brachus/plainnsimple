
/*
 * Credit goes to Mohammad Adil:
 * 
 * http://stackoverflow.com/questions/15590236/fade-in-element-on-scroll-down-using-css
 * 
 * Creative Commons Attribution
 */

var sel_list = ['.widget'];
var sel_box_shad = '.nav'
var fadin_offset = 200;
var fad_dur = 300;
var boxshad_val = 'none';

var search_state = 'closed';

var scrolltotop_state = 'none';

var scrolltotop_right = '10px';

var totop_dur = 300;




var do_parallax = function()
{
	var img_ymid = 500;
	$('.parallax_banner').each(function (i)
		{
			var obj_btm = $(this).offset().top;
			var scr_rel = $(window).scrollTop() - obj_btm;
			$(this).css(
				{
					'background-position': '0px '+(scr_rel * 0.6)+'px'
				}
			);	
		}
	);
}

var search_open = function()
{
	search_state = 'open';
	
	/* fade out/disable every other navitem in top bar */
	$('a.navitem, a.navitem_active').each(
		function(i)
		{
			$(this).animate( { 'opacity':'0'}, fad_dur/2);
			$(this).css('pointer-events', 'none');
		}
	);
	
	/* adjust search icon padding */
	$('a.navitem_search').animate( { 'padding-left':'16px',
		'padding-right':'8px'}, fad_dur/2);
	
	/* make visible, adjust size, and fade in text field*/
	$('input').css({'pointer-events':'auto', 'display':'block'});
	$('input').animate({'width':'200px','padding':'0px 10px', 'opacity':'1'}, fad_dur/2);
	$('input').focus();
	
	/* make visible, adjust size, and fade in search box close button */
	$('a.navitem_search_close').css({'pointer-events':'auto', 'display':'block'});
	$('a.navitem_search_close').animate(
		{
			'width':'20px',
			'padding-top':'14px',
			'padding-right':'40px',
			'padding-left':'10px',
			'opacity':'1'
		},
		fad_dur/2
	);
	
}

var search_close = function()
{
	search_state = 'closed';
	
	$('a.navitem_search_close').css({'pointer-events':'none'});
	$('a.navitem_search_close').animate(
		{
			'width':'0', 
			'opacity':'0',
			'padding':'14px 0px'
		},
		fad_dur/2
	);
	
	$('input').css({'pointer-events':'none'});
	$('input').animate({'width':'0px', 'opacity':'0', 'padding':'0'}, fad_dur/2);
	
	$('a.navitem_search').animate( { 'padding-left':'40px','padding-right':'40px'}, fad_dur/2);
	
	$('a.navitem, a.navitem_active').each(
		function(i)
		{
			$(this).animate( { 'opacity':'1'}, fad_dur/2);
			$(this).css('pointer-events', 'auto');
		}
	);
}

var do_search = function()
{
	console.log('do_search()');
	/* do search */
}

var search_toggle = function()
{
	if (search_state == 'closed')
	{
		search_open();
		
	}
	else
		do_search();
}

/* using jquery, check through each object under multiple elements,
 * and if object is within view, fade it in.*/
var effect_check_through_fadein = function(instant)
{	
	$('.widget').each(function (i)
		{				
			var obj_btm = $(this).offset().top;
			var obj_btm_offset = obj_btm + fadin_offset;
			var win_btm = $(window).scrollTop() + $(window).height();
			
			if (instant && win_btm > obj_btm)
				$(this).css(
						{	'opacity' : '1',
							'margin-top' : '10px'
						} );
				
			else if (win_btm > obj_btm_offset)
				$(this).animate(
					{
						'opacity': '1',
						'margin-top': '10px'
					},
					fad_dur);
		 }
		 );
}

/* disable box shadow effect of top bar when scroll is at the very top*/
var effect_no_shadow_at_top = function()
{
	/* retrieve boxshad setting for sel_box_shad */
	if (boxshad_val == 'none')
		boxshad_val = $(sel_box_shad).css('box-shadow');
	
		
	if ( $(window).scrollTop() < 2)
		$(sel_box_shad).css(
			{ 'box-shadow': 'none',
				'-webkit-box-shadow' : 'none',
				'-moz-box-shadow' : 'none'
				} );
		
	else
		$(sel_box_shad).css(
			{ 'box-shadow' : boxshad_val,
				'-webkit-box-shadow' : boxshad_val,
				'-moz-box-shadow' : boxshad_val
				} );
			
}

var no_scrolltotop_at_top = function()
{
	if ( $(window).scrollTop() < 50)
	{
		if (scrolltotop_state == 'visible')
		{
			$('a.footer_bottom_scrollup_button').animate(
				{ 'right': '-100px' }, 
				fad_dur/2
			);
			
			scrolltotop_state = 'none';
		}
	}
	else
	{
		if (scrolltotop_state == 'none')
		{
			$('a.footer_bottom_scrollup_button').animate(
				{ 'right': '10px' }, 
				fad_dur/2
			);
			
			scrolltotop_state = 'visible';
		}
	}
}

var scroll_to_top = function()
{
	$('html, body').animate({ scrollTop: 0 }, totop_dur );
}


/* .ready is better*/
$(window).ready(
	function()
	{
		effect_check_through_fadein(true);
		effect_no_shadow_at_top();
		
		no_scrolltotop_at_top();
		
		do_parallax();
		
		$('a.navitem_search').click(search_toggle);
		
		$('a.navitem_search_close').click(search_close);
		
		$('a.footer_bottom_scrollup_button').click(scroll_to_top);
		
	}
);


$(window).scroll(
	function()
	{
		effect_check_through_fadein(false);
		effect_no_shadow_at_top();
		
		no_scrolltotop_at_top();
		
		do_parallax();
	}
);
