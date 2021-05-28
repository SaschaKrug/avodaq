$(document).ready(function() {
	$('html').toggleClass('no-js js');
	$('#fullpage').fullpage({
		anchors: ['home', 'ueber-uns', 'loesungen', 'news', 'megatrends', 'partner', 'jobs', 'kontakt', 'impressum', 'rechtl-hinweise'],
		menu: '#menu',
		resize : false,
		slidesNavigation: true,
		scrollOverflow: true,
		scrollOverflowOptions: {
	    		preventDefault: false
	    	},
		animateAnchor: false,
		loopHorizontal: false,
		keyboardScrolling: false,
		normalScrollElements: '.block-maps',
		afterRender: function(){
			var activeSection = $('.fp-section').eq(0);
			activeSection.find("[class*='img-box']").each(function() {
				var imagePath = $(this).attr('data-original');
				if(imagePath) {
					$(this).css('background-image', 'url("' + imagePath + '")');
				}

			});
			if (!$('.nav-main .active').length) {
				$('.nav-main li').eq(0).addClass('active');
			}
		},
		afterLoad: function(anchorLink, index){
			if ($('.nav-toggle-menu').is('.active')) {
				$('.nav-toggle-menu').trigger('click');
			}
			if (!index == 0) {
				$('.nav-main li').eq(index -1).addClass('active');
			}
			var activeSlide = $('.fp-section.active .fp-slide.active');
			activeSlide.find("[class*='img-box']").each(function() {
				var imagePath = $(this).attr('data-original');
				if(imagePath) {
					$(this).css('background-image', 'url("' + imagePath + '")');
				}

			});

			var nextSlides = $('.fp-section.active .fp-slide.active').next();

			nextSlides.find("[class*='img-box']").each(function() {
				var imagePath = $(this).attr('data-original');
				if(imagePath) {
					$(this).css('background-image', 'url("' + imagePath + '")');
				}
			});
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
			if(slideIndex > 0){
				$.fn.fullpage.setAllowScrolling(false);
			} else {
				$.fn.fullpage.setAllowScrolling(true);
			}
			var activeSlide = $('.fp-section .fp-slide.active');
			activeSlide.find("[class*='img-box']").each(function() {
				var imagePath = $(this).attr('data-original');
				if(imagePath) {
					$(this).css('background-image', 'url("' + imagePath + '")');
				}

			});

			var nextSlides = $('.fp-section.active .fp-slide.active').next();

			nextSlides.find("[class*='img-box']").each(function() {
				var imagePath = $(this).attr('data-original');
				if(imagePath) {
					$(this).css('background-image', 'url("' + imagePath + '")');

				}

			});
		},
		onLeave: function(index, nextIndex, direction){
			setTimeout(function(){
				var section = $('.fp-section').eq((index - 1));
				if (section.find('.slides').length) {
					$.fn.fullpage.scrollDefault(section, 0);
				}
			}, 500);
		}
	});


	$('.section').on('click', '.toSlide', function(event) {
		event.preventDefault();
		var currentSection = window.location.hash.substr(1);
		var slideToGoTo = $(this).attr('data-index') - 1;
		console.log($.fn.fullpage);
		$.fn.fullpage.moveTo(currentSection, slideToGoTo);
	});
	/**
	 * Scrolling horizontally when clicking on the slider controls.
	 */
	$('.section').on('click', '.controlArrow', function() {
		if ($(this).hasClass('prev')) {
			$.fn.fullpage.moveSlideLeft();
		} else {
			$.fn.fullpage.moveSlideRight();
		}
	});

	//Helper for Slidenavbuttons prev & next
	$('.controlArrow, .linkArrow').first().hover(function() {
		$(this).closest('div').toggleClass('active');
	});
	//Navigation toggle
	$('.nav-toggle-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
	});
	$('.btn-drop').click(function() {
		$(this).toggleClass('active');
		$(this).find('span').toggleClass('icon-arrow-top icon-arrow-down');
	});
	$('.btn-drop ul a').click(function() {
		$(this).closest('btn-drop').removeClass('active');
	});
	$('.acc-handle').click(function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.acc-panel').removeClass('active');
		} else {
			$('.acc-handle, .acc-panel').removeClass('active');
			$(this).addClass('active');
			$(this).next('.acc-panel').addClass('active');
		}
	});
	$('.ios-switch').click(function(e) {
		$(this).toggleClass('lang-en lang-de');
	});
	//Additional Google maps config for first panel (Hamburg) active onload
	if ($('.acc-toggler1').next().hasClass('active')) {
		gmap1_initialize();
	}
	$(".ce_video").fitVids();
	$('.cities-nav [data-toggle]').click(function() {
		var selection = $(this).attr('data-toggle');
		$('.job:not(.' + selection + ')').slideUp(200);
		$('.job.' + selection).slideDown(200);
	});
});
