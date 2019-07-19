(function($) {
    'use strict';
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
        anchors: ['welcome', 'about', 'apps', 'join', 'contacts'],
        menu: '#header-nav',
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: true,
        easing: 'easeInOutCubic',
        resize: false,
        css3: false,
        normalScrollElements: '#modalWindow',
        onLeave: function(index, nextIndex, direction) {
            if (!isSlideAnimation) {
                slideElem.addClass('transition');
            }
            showCatFace();
            showHelm();
            isSlideAnimation = true;
            function showCatFace() {
                if(nextIndex === 2) {
                    $('.cat-face').addClass('show-cat');
                }
                else {
                    $('.cat-face').removeClass('show-cat');
                }
            }
            function showHelm() {
                if(nextIndex > 2) {
                    $('.helmet_parent-block').addClass('hide-helmet');
                    setTimeout(function () {
                        $('.helmet-block').addClass('change-index');
                    }, 1000);
                }
                else {
                    $('.helmet_parent-block').removeClass('hide-helmet');
                    $('.helmet-block').removeClass('change-index');
                }
            }
        },
        afterLoad: function(origin, index) {
            var loadedSection = this;
            slideElem.removeClass('transition');
            isSlideAnimation = false;
            prevIndex = index - 1;
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
            var error_message = contactForm.find('.error-message');
            var success_message = contactForm.find('.success-message');
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
                fetch('https://bic2xlt1e9.execute-api.us-east-1.amazonaws.com/dev/message', {
                    method: 'post',
                    body: JSON.stringify({name: user_name, email: user_email, message: user_message})
                }).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    success_message.fadeIn(500);
                    error_message.fadeOut(200);
                }).catch(function(err) {
                    error_message.fadeIn(500);
                    success_message.fadeOut(200);
                });
            } else {
                error_message.fadeIn(500);
                success_message.fadeOut(200);
            }
            return false;
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
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            infinity: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true
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
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 700,
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
            var label = input.nextElementSibling,
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
        /* ------------------------------------------------------------------------ */
        /*  Menu on mobile
        /* ------------------------------------------------------------------------ */
        $(".navbar-toggler").click(function () {
            $(".navbar-collapse").addClass("active");
        });
        $(".navbar-nav").click(function () {
            $(".navbar-collapse").removeClass("active");
        });
        $(document).mouseup(function (e) {
            var div = $(".navbar-collapse");
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass("active");
            }
        });
    });
})(jQuery);