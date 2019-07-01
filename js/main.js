/*-----------------------------------------------------------------------------------

    Template Name: New Launch v1.0.0 | Responsive Coming Soon Page HTML
    Author: MZ
    Author URI: http://themeforest.net/user/mzworks

-----------------------------------------------------------------------------------*/

(function($) {
    'use strict';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').addClass('mobile');
    }
    /* ------------------------------------------------------------------------ */
    /*  Countdown
    /* ------------------------------------------------------------------------ */
    var clock = $('#clock');
    if (clock.length) {
        if (clock.hasClass('js-timer-elapsed')) {
            // Elasped timer/countdown

            //Put your date
            var year = '2009';
            var month = '03';
            var day = '11';
            var time = '00:00:00';
            //End Put your date

            var date = year + '/' + month + '/' + day + ' ' + time;
            var now = new Date();
            var dateFormat = 'YYYY/MM/DD hh:mm:ss';

            var momentDate = moment(date, dateFormat);
            var momentNow = moment(now, dateFormat);

            var outputYears = moment(momentNow, dateFormat).diff(momentDate, 'years');
            var outputYearsLabel = outputYears > 1 ? 'Years' : 'Year';

            var dateCurrentYear = now.getFullYear() + '/' + month + '/' + day + ' ' + time;
            var outputDays = moment(dateCurrentYear, dateFormat).diff(momentNow, 'days');
            var outputDaysLabel = outputDays > 1 ? 'Days' : 'Day';

            var outputMonths = moment(dateCurrentYear, dateFormat).diff(momentNow, 'months');

            clock.countdown(date, {
                elapse: true,
                strftime: dateFormat
            }).on('update.countdown', function(event) {
                var output = [
                    '<div class="counter-container">',
                    '<div class="counter-box first"><div class="number">' + Math.abs(outputYears) + '</div><span>' + outputYearsLabel + '</span></div>', // Years
                    '<div class="counter-box first"><div class="number">' + Math.abs(outputMonths) + '</div><span>Months</span></div>', // Months
                    '<div class="counter-box first"><div class="number">' + Math.abs(outputDays) + '</div><span>' + outputDaysLabel + '</span></div>', // Days
                    '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>', // Hours
                    '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>', // Minutes
                    '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>', // Seconds
                    '</div>'
                ].join('\n');
                $(this).html(
                    event.strftime(output)
                );
            });
        } else {
            // Default countdown
            clock.countdown('2019/10/14 12:00:00').on('update.countdown', function(event) {
                var output = [
                    '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>', //Days
                    '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>', //Hours
                    '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>', //Minutes
                    '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>' //Seconds
                ].join('\n');
                $(this).html(
                    event.strftime(output)
                );
            });
        }
    }


    /* ------------------------------------------------------------------------ */
    /*  FitVivs | responsive video
    /* ------------------------------------------------------------------------ */
    $(".js-video-container").fitVids();

    /* ------------------------------------------------------------------------ */
    /*  Tooltips
    /* ------------------------------------------------------------------------ */
    $("body").tooltip({
        selector: '[data-toggle=tooltip]'
    });

    /* ------------------------------------------------------------------------ */
    /*  Full page js
    /* ------------------------------------------------------------------------ */
    var isSlideAnimation = false;
    var slideElem = $('.page');

    var prevIndex = 0;
    $('#fullpage').fullpage({
        anchors: ['about', 'apps', 'join', 'contacts'],
        menu: '#header-nav',
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: true,
        easing: 'easeInOutCubic',
        resize: false,
        css3: false,
        responsive: 1000,
        onLeave: function(index, nextIndex, direction) {
            if (!isSlideAnimation) {
                slideElem.addClass('transition');
            }
            isSlideAnimation = true;
        },
        afterLoad: function(anchorLink, index) {
            slideElem.removeClass('transition');
            $('#sidebar-nav li').eq(prevIndex).removeClass('current');
            $('#sidebar-nav li').eq(index - 2).addClass('current');
            isSlideAnimation = false;
            prevIndex = index - 2;
        },
        afterRender: function() {
            isSlideAnimation = false;
        }
    });
    $('.js-to-slide').on('click', function() {
        var elem = $(this),
            slideID = elem.data('slide');
        $.fn.fullpage.moveTo(slideID);
    });

    /* ------------------------------------------------------------------------ */
    /*  Contact form
    /* ------------------------------------------------------------------------ */
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        $(document).on('submit', '#contact-form', function(e) {
            e.preventDefault();
            var user_name = contactForm.find('input[name=name]').val();
            var user_email = contactForm.find('input[name=email]').val();
            var user_message = contactForm.find('textarea[name=message]').val();
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };

            function ValidateEmail(email) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(email);
            }
            if (ValidateEmail(user_email) && (user_message.length > 1) && (user_name.length > 1)) {
                $.post('sendmail.php', post_data, function(response) {
                    contactForm.find('.success-message').fadeIn(500);
                    contactForm.find('.error-message').fadeOut(200);
                });
            } else {
                contactForm.find('.error-message').fadeIn(500);
                contactForm.find('.success-message').fadeOut(200);
            }
            return false;
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  Mailchimp subscribe
    /* ------------------------------------------------------------------------ */
    var mailchimpForm = $('.mailchimp-form');

    function mailchimpMsg(resp) {
        if (resp.result === 'success') {
            mailchimpForm.find('.success-message').html(resp.msg).fadeIn(500);
            mailchimpForm.find('.error-message').fadeOut(200);
        } else if (resp.result === 'error') {
            mailchimpForm.find('.error-message').html(resp.msg).fadeIn(500);
        }
    }
    if (mailchimpForm.length) {
        mailchimpForm.ajaxChimp({
            callback: mailchimpMsg,
            url: "//mzworks.us11.list-manage.com/subscribe/post?u=f8b7080a6aeab4d4219940a06&amp;id=2fd7eed4be" // Replace this with your own mailchimp post URL. Paste the url inside "". The mailchimp post url will look like this: http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  ANIMATED ELEMENTS
    /* ------------------------------------------------------------------------ */
    $('.animated').appear();
    $('.animated').on('appear', function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
                setTimeout(function() {
                    elem.addClass(animation + " visible");
                }, animationDelay);
            } else {
                elem.addClass(animation + " visible");
            }
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  VERTICAL ALIGMENT BLOCKS
    /* ------------------------------------------------------------------------ */
    function verticalCenterBlock() {
        $('.js-vertical-middle').each(function() {
            var _this = $(this);
            var height = _this.outerHeight();
            _this.addClass('vertical-middle').css('margin-top', -(height / 2));
        });
    }

    $(window).on('resize', verticalCenterBlock);

    $(window).on('load', function() {

        // Remove setTimeout
        setTimeout(function() {
            verticalCenterBlock();
        }, 0);

        /*
            Loader
        */
        $('.loading').fadeOut('300');

        /* Starting Animation on Load */
        $('.onstart').each(function() {
            var elem = $(this);
            if (!elem.hasClass('visible')) {
                var animationDelay = elem.data('animation-delay');
                var animation = elem.data('animation');
                if (animationDelay) {
                    setTimeout(function() {
                        elem.addClass(animation + " visible");
                    }, animationDelay);
                } else {
                    elem.addClass(animation + " visible");
                }
            }
        });


        /* ------------------------------------------------------------------------ */
        /*  Carousel
        /* ------------------------------------------------------------------------ */
        $(".slider").slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        var item = $(".item");
        item.hover(
            function handlerIn () {
                var currentItem = $(this);
                currentItem.addClass('hover');
                item.addClass('dark-bg');
                if (currentItem.hasClass('hover')) {
                    currentItem.removeClass('dark-bg');
                }
            },
            function handlerOut () {
                item.removeClass('hover');
                item.removeClass('dark-bg');
            }
        );
        $(".slider-join").slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        /* ------------------------------------------------------------------------ */
        /*  Input File
        /* ------------------------------------------------------------------------ */
        var inputs = document.querySelectorAll('.contact-form-file');
        Array.prototype.forEach.call(inputs, function(input){
            var label	 = input.nextElementSibling,
                labelVal = label.innerHTML;
            input.addEventListener('change', function(e){
                var fileName = '';
                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else
                    fileName = e.target.value.split( '\\' ).pop();
                if( fileName )
                    label.querySelector( 'span' ).innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });
            input.addEventListener('focus', function(){ input.classList.add( 'has-focus' ); });
            input.addEventListener('blur', function(){ input.classList.remove( 'has-focus' ); });
        });
    });
})(jQuery);