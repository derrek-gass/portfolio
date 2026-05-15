/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
  /*----------------------------------------------------*/
  /* FitText Settings
------------------------------------------------------ */

  setTimeout(function () {
    $('h1.responsive-headline').fitText(1, {
      minFontSize: '40px',
      maxFontSize: '900p',
    });
  }, 10);

/*----------------------------------------------------*/
  /*	Make sure that #header-background-image height is
  /* equal to the browser height.
------------------------------------------------------ */

  $('header').css({ height: $(window).height() });
  $(window).on('resize', function () {
    $('header').css({ height: $(window).height() });
    $('body').css({ width: $(window).width() });
  });

  /*----------------------------------------------------*/
  /*	Fade In/Out Primary Navigation
------------------------------------------------------*/

  $(window).on('scroll', function () {
    var h = $('header').height();
    var y = $(window).scrollTop();
    var nav = $('#nav-wrap');

    if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
      nav.fadeOut('fast');
    } else {
      if (y < h * 0.2) {
        nav.removeClass('opaque').fadeIn('fast');
      } else {
        nav.addClass('opaque').fadeIn('fast');
      }
    }
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
------------------------------------------------------*/

  $('.item-wrap a').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    removalDelay: 200,
    showCloseBtn: false,
    mainClass: 'mfp-fade',
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*----------------------------------------------------*/
  /*	Flexslider
/*----------------------------------------------------*/
  $('.flexslider').flexslider({
    namespace: 'flex-',
    controlsContainer: '.flex-container',
    animation: 'slide',
    controlNav: true,
    directionNav: false,
    smoothHeight: true,
    slideshowSpeed: 7000,
    animationSpeed: 600,
    randomize: false,
  });
});
