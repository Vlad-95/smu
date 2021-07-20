$(document).ready(function() {
    
});

//Глобальный слайдер на главной
if ($('mainslider').length) {
    const mainSlider = new Swiper('.mainslider', {
        // Optional parameters
        direction: 'vertical',
        loop: false,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">0' + (index + 1) + '</span>';
            },
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        },
        
        
    });

    mainSlider.on('slideChangeTransitionEnd', function () {
        var acs = document.querySelectorAll('.swiper-slide-active')[0];
        var hasVerticalScrollbar = acs.scrollHeight > acs.clientHeight;
        console.log(hasVerticalScrollbar);
                
        if (hasVerticalScrollbar) {
            var scrollHeight = acs.scrollHeight;
            var slideSize = acs.swiperSlideSize;
            var scrollDifferenceTop = scrollHeight - slideSize;
    
            acs.addEventListener('wheel', findScrollDirectionOtherBrowsers);
    
            function findScrollDirectionOtherBrowsers(event) {
                var scrollDifference = scrollHeight - slideSize - acs.scrollTop;
    
                                // Scroll wheel browser compatibility
                                var delta = event.wheelDelta || -1 * event.deltaY;
                
                // Enable scrolling if at edges
                var spos = delta < 0 ? 0 : scrollDifferenceTop;
                
                if (!(scrollDifference == spos))
                    mainSlider.mousewheel.disable();
                else
                    mainSlider.mousewheel.enable();
            }
        }
    });
}

if ($('.slider').length) {
    $('.slider .slider__wrapper').each(function () {
        $(this).slick({
            autoplay: true,
            autoplaySpeed: 6000,
            arrows: false,
            dots:true,
            pauseOnHover: false,
            pauseOnFocus: false,
            fade: true,
            customPaging: function(slick,index) {
                
                return '<span>' + (index + 1) + '</span>';
            }
        })
    
        if($(this).find('.slider__item').length <= 1) {
            $(this).find('.slick-dots').hide();
            $(this).find('.slider__pag').hide();
        } else {
            $(this).siblings('.slider__pag').find('.button-prev').click(function() {
                console.log($(this))
                $(this).closest('.slider').find('.slider__wrapper').slick('slickPrev');
            })
            $(this).siblings('.slider__pag').find('.button-next').click(function() {
                $(this).closest('.slider').find('.slider__wrapper').slick('slickNext');
            })
        }
    
    });
}

if ($('.about .wysiwyg').length) {
    //$('.about .wysiwyg').
}

