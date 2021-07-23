$(document).ready(function() {
    //Глобальный слайдер на главной
    if ($('.mainslider').length) {
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
                acs.addEventListener('touchstart', findScrollDirectionOtherBrowsers);
        
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
                appendDots: $(this).siblings('.slider__pag').find('.slider__pag-wrap .dots'),
                pauseOnHover: false,
                pauseOnFocus: false,
                fade: true,
                customPaging: function(slick,index) {
                    
                    return '<span>' + (index + 1) + '</span>';
                },
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            dots: false
                        }
                    }
                ]
            })
        
            if($(this).find('.slider__item').length <= 1) {
                $(this).find('.slick-dots').hide();
                $(this).find('.slider__pag').hide();
            } else {                
                $(this).siblings('.slider__pag').find('.button-prev').click(function() {
                    $(this).closest('.slider').find('.slider__wrapper').slick('slickPrev');
                })
                $(this).siblings('.slider__pag').find('.button-next').click(function() {
                    $(this).closest('.slider').find('.slider__wrapper').slick('slickNext');
                })
            }
        
        });
    }

    //карта на слайде География
    if($('.mainslider').length) {
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                center: [59.971668064132984,30.490338999999977],
                controls: [],                
                zoom: 7
            });

            var myPlacemark = new ymaps.Placemark([59.971668064132984,30.490338999999977], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/pin.png',
                iconImageSize: [55, 56],
                iconImageOffset: [-28, -45]
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
        }
    }

    //клик по бургеру
    $('.burger').click(function () {
        $('body').toggleClass('opacity-layer no-scroll');
        $(this).toggleClass('active');
        $('.header .logo').toggleClass('opacity');
        $('.header__menu').toggle("slide", { direction: "right" }, 500);
    })

    if ($('.about .wysiwyg').length) {
        //$('.about .wysiwyg').
    }


    if($('.services').length) {
        //простановка нумерации
        $('.services__item').each(function(index) {
            let itemNumber = index + 1;
            console.log(itemNumber);
            if(itemNumber < 10) {
                $(this).find('.count').text("0" + itemNumber);
            } else {
                $(this).find('.count').text(itemNumber);
            }
            
        })

        // аккордион услуг
        $('.services__toggle').click(function() {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
        })
    }

    //карта
    if ($('.contacts-map').length) {
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                center: [59.971668064132984,30.490338999999977],
                controls: [],                
                zoom: 15
            });

            var myPlacemark = new ymaps.Placemark([59.971668064132984,30.490338999999977], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/pin.png',
                iconImageSize: [55, 56],
                iconImageOffset: [-28, -45]
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }

    //Объекты
    if ($('.object-list').length) {
        //простановка нумерации
        $('.object-list__item').each(function(index) {
            let itemNumber = index + 1;
            
            if(itemNumber < 10) {
                $(this).find('.count').text("0" + itemNumber);
            } else {
                $(this).find('.count').text(itemNumber);
            }
            
        })

        if ($(window).width() > 992) {
            //показ первого активного элемента и прикрепление ссылки        
            let firstItemLink = $('.object-list__item:first-of-type').attr('data-link');
            let firstItemImg = $('.object-list__item:first-of-type').attr('data-img');
            let btnMore = $('.object-list-btn');
            //таймаут для избежания постоянной подгрузки картинок
            let timeout;
            let wait = 500;

            $('.object-list__item:first-of-type').addClass('current');
            $('.object-list-image img').attr('src', firstItemImg);
            btnMore.attr('href', firstItemLink);

            //наведение на элементы списка
            $('.object-list__item').hover(function() {     
                clearTimeout(timeout);       
                let itemLink = $(this).attr('data-link');
                let itemImg = $(this).attr('data-img');
                let imageBlock = $('.object-list-image');

                $(this).siblings().removeClass('current');
                $(this).addClass('current');
                
                btnMore.attr('href', itemLink);

                imageBlock.find('img').fadeOut();

                let show = function() {                    
                    imageBlock.fadeIn();
                    imageBlock.find('img').attr('src', '');
                    imageBlock.find('img').attr('src', itemImg);
                    imageBlock.find('img').fadeIn();
                }

                timeout = setTimeout(show, wait);
                
                
            }, function() {                
                //clearTimeout(timeout);  
                
            })
        } else {
            // аккордион объектов
            $('.object-list__toggle').click(function() {
                $(this).toggleClass('active');
                $(this).next().slideToggle();
            })
        }
        

        
    }

    //Объекты детальная
    if($('.object-detail').length) {
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                center: [59.971668064132984,30.490338999999977],
                controls: [],                
                zoom: 16
            });

            var myPlacemark = new ymaps.Placemark([59.971668064132984,30.490338999999977], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/pin.png',
                iconImageSize: [55, 56],
                iconImageOffset: [-28, -45]
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }

});


