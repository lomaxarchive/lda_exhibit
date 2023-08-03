/**
 * @file
 * A JavaScript file for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($, Drupal) {
    Drupal.behaviors.site = {
        attach: function (context, settings) {
            var sectionElements = $('.js-section');
            var sectionIds = [];
            // Set variable to be at zero when scrolling, one if a link has been clicked.
            var jumpSection = 0;
            var getSectionIds = function () {
                for (var i = sectionElements.length - 1; i >= 0; i--) {
                    sectionIds.unshift($(sectionElements[i]).attr('id'));
                }
            };
            $('.fullpage').fullpage({
                autoScrolling: true,
                css3: true,
                licenseKey: 'gplv3-license',
                sectionSelector: '.js-section',
                scrollOverflow: true,
                scrollingSpeed: 1000,
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips: [],
                credits: false,
                verticalCentered: true,
                showActiveTooltip: true,
                scrollOverflowReset: true,
                bigSectionsDestination: 'top',

            });

            $('.js-next-section').click(function (e) {
                e.preventDefault();
                $.fn.fullpage.moveSectionDown();
            });

            $('.bxslider').bxSlider({
                infiniteLoop: false,
                hideControlOnEnd: true,
                slideWidth: 1500,
                easing: 'ease',
                slideSelector: 'div.slider',
                wrapperClass: 'bx-wrapper deco-box',
                nextText: '<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.37 49.88"><g id="f"><path d="m4.3,49.15c6.51-6.51,13.02-13.02,19.53-19.53.93-.93,1.85-1.85,2.78-2.78,2.28-2.28-1.26-5.81-3.54-3.54-6.51,6.51-13.02,13.02-19.53,19.53-.93.93-1.85,1.85-2.78,2.78-2.28,2.28,1.26,5.81,3.54,3.54h0Z" fill="#currentColor"/><path d="m26.64,23.1C20.11,16.58,13.58,10.05,7.06,3.52L4.27.74C1.99-1.54-1.54,1.99.74,4.27c6.53,6.53,13.05,13.05,19.58,19.58l2.79,2.79c2.28,2.28,5.81-1.26,3.54-3.54h0Z" fill="#currentColor"/></g></svg>',
                prevText: '<?xml version="1.0" encoding="UTF-8"?><svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.37 49.88"><g id="h"><path d="m23.08.74C16.56,7.25,10.05,13.76,3.54,20.27l-2.78,2.78c-2.28,2.28,1.26,5.81,3.54,3.54,6.51-6.51,13.02-13.02,19.53-19.53l2.78-2.78c2.28-2.28-1.26-5.81-3.54-3.54h0Z" fill="#currentColor"/><path d="m.74,26.78c6.53,6.53,13.05,13.05,19.58,19.58l2.79,2.79c2.28,2.28,5.81-1.26,3.54-3.54-6.53-6.53-13.05-13.05-19.58-19.58l-2.79-2.79c-2.28-2.28-5.81,1.26-3.54,3.54h0Z" fill="#currentColor"/></g></svg>',

            });
        }
    };

})(jQuery, Drupal, drupalSettings);


/*!
 * Simple one button audio player
 */
(function ($) {
    Drupal.behaviors.exaudio_toggle = {
        attach: function (context, settings) {

            $('.play', context).click(function () {
                var $this = $(this);

                // starting audio
                var audioID = "sound" + $(this).attr('id');

                $this.toggleClass('active');
                if ($this.hasClass('active')) {
                    $this.removeClass("play-button");
                    $this.addClass("pause-button");
                    $("#" + audioID).trigger('play');
                } else {
                    $this.removeClass("pause-button");
                    $this.addClass("play-button");
                    $("#" + audioID).trigger('pause');
                }
            });
        }
    };
})(jQuery, Drupal);



/**
 * @file
 * A JavaScript file for image credit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Palantir.net
 */

(function ($) {

    Drupal.behaviors.image_credit = {
        attach: function (context, settings) {
            $('.js-figcaption-cta', context).click(function () {
                var thisCaption = $(this);
                // Define the target expandable div.
                var targetImage = thisCaption.parents('figure').find('figcaption');
                var containerWidth = thisCaption.parents('.horizontal-slider__section').width();
                var imageWidth = thisCaption.parents('figure').find('img').width();
                var imageCaption = thisCaption.parents('figure').find('figcaption');
                // Check for optional slide-down container.
                if (thisCaption.parents('figure').find('.js-figure__caption-reveal ').length) {
                    var captionSlider = thisCaption.parents('figure').find('.js-figure__caption-reveal ');
                    // Show if it is hidden.
                    if ($(captionSlider).is(":hidden")) {
                        targetImage.toggleClass('js-figcaption--revealed');
                        // If the image is not full width, calculate the caption size to fit.
                        if (imageWidth < containerWidth) {
                            var captionWidthDifference = (containerWidth - imageWidth) / 2;
                            // Calculation includes subtracting 30 to compensate for .75 rem padding.
                            var newCaptionWidth = imageWidth + captionWidthDifference - 30;
                            $(captionSlider).slideDown(200).width(imageWidth);
                            imageCaption.width(newCaptionWidth);
                        } else {
                            // This image is full width. Slide open with no wdith change.
                            $(captionSlider).slideDown(200).width(imageWidth);
                        }
                    } else {
                        // Hide the image that is already showing.
                        $(captionSlider).slideUp(200, function () {
                            targetImage.toggleClass('js-figcaption--revealed');
                        });
                    }
                } else {
                    // If there isn't a slide-down container, reveal the caption normally.
                    targetImage.toggleClass('js-figcaption--revealed');
                }
            });
        }
    };
})(jQuery, Drupal);


/**
 * @file
 * A JavaScript file for the setting header height within a section hero.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

/**
 * @file
 * A JavaScript file for image credit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Palantir.net
 */


(function ($) {
    Drupal.behaviors.image_caption = {
        attach: function (context, settings) {
            $('.js-image-caption--trigger', context).click(function () {
                // Define the target expandable div.
                var targetDrawer = $(this).parents('.image-caption').find('.image-caption__drawer');
                targetDrawer.toggleClass('js-image-caption--hidden');
            });
        }
    };
})(jQuery, Drupal);



/**
 * Read more section
 */

(function ($) {

    Drupal.behaviors.read_more_toggle = {
        attach: function (context, settings) {
            // Close all expander elenments that need to be closed initially.
            $('.read-more--closed').hide(0);
            // Function for expander component to expand and collapse.
            $('.read-more--trigger', context).click(function () {
                var buttonClicked = $(this);
                // Define the target expandable div.
                var changeThisPanel = $(this).parents('.js-read-more').find('.read-more--wrapper');
                var changePanelParent = $(this).parents('.js-read-more');
                // Load button text from data attribute when div is expanded.
                var expandedText = $(this).data('text-expanded');
                // Load button text from data attribute when div is collapsed.
                var collapsedText = $(this).data('text-collapsed');

                // Toggle the button and panel states.
                if (changeThisPanel.hasClass("read-more--closed")) {
                    buttonClicked.find('.read-more--arrow-up').show(0);
                    buttonClicked.find('.read-more--arrow-down').hide(0);
                    changeThisPanel.removeClass("read-more--closed").addClass("read-more--expanded").slideDown(300);
                    buttonClicked.find('.button-with-icon__text').html(expandedText).attr('title', expandedText);
                } else if (changeThisPanel.hasClass("read-more--expanded")) {
                    buttonClicked.find('.read-more--arrow-down').show(0);
                    buttonClicked.find('.read-more--arrow-up').hide(0);
                    changeThisPanel.removeClass("read-more--expanded").addClass("read-more--closed").slideUp(300);
                    buttonClicked.find('.button-with-icon__text').html(collapsedText).attr('title', collapsedText);
                }
            });
        }
    };
})(jQuery, Drupal);;


/**
 * Attach modal to body
 */

(function ($) {
    Drupal.behaviors.modal_bg = {
        attach: function (context, settings) {
            $("button.btn-exhibit", context).click(function () {
                $(".modal-exhibit").appendTo("body");
            });
        }
    };
})(jQuery, Drupal);
