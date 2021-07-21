$(document).ready(function() {
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
            console.log(itemNumber);
            if(itemNumber < 10) {
                $(this).find('.count').text("0" + itemNumber);
            } else {
                $(this).find('.count').text(itemNumber);
            }
            
        })

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


            timeout = setTimeout(show, wait)
            
        }, function() {
            clearTimeout(timeout);
        })
        




        

        // $('.company-designers__collections__link').hover(function() {
        //     clearTimeout(timeout);
        //     let self = $(this);

        //     self.siblings().addClass('disabled');
        //     let srcImage = self.attr('data-image');
        //     let imageBlock = self.siblings('.company-designers__collections__img');
            

        //     let show = function() {
                
        //         imageBlock.fadeIn();
        //         imageBlock.find('img').attr('src', srcImage);
        //     }


        //     timeout = setTimeout(show, wait)

        // },
        // function() {
        //     clearTimeout(timeout);
        //     $(this).siblings().removeClass('disabled');
        //     let imageBlock = $(this).siblings('.company-designers__collections__img');
        //     imageBlock.find('img').attr('src', '');
        //     imageBlock.fadeOut();
        // });
    }

});


