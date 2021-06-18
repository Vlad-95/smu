$(document).ready(function() {
    
});

//Глобальный слайдер на главной
const mainSlider = new Swiper('.mainslider', {
    // Optional parameters
    direction: 'vertical',
    loop: false,
    mousewheel: true,
    autoHeight: true,
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
        mousewheel: true,
    },
    
    
});

//слайдер внутри слайдера
const smallMainSlider = new Swiper('.mainslider .slider', {
    // Optional parameters
    effect: 'fade',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
        type: 'bullets',
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
    
});