import Swiper from 'swiper/bundle';

// Slider - Main
const bannerSwiper = new Swiper('.banner-swiper', {
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: true,
  },
  speed: 1000,
  pagination: {
    el: '.banner-swiper__pagination',
    clickable: true,
  },
});
const trendsSwiper = new Swiper('.trends-swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: '.trends__button-next',
    prevEl: '.trends__button-prev',
  },
  breakpoints: {
    769: {
      slidesPerView: 3,
    },
  },
});
// Slider - About
const productsListSwiper = new Swiper('.products-list-swiper', {
  slidesPerView: 1,
  pagination: {
    el: '.products-list-swiper__pagination',
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    prevEl: '.products-list-swiper__button--prev',
    nextEl: '.products-list-swiper__button--next',
  },
});
// Swiper double
const compareSwiper = new Swiper('.compare__card-swiper', {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: '.compare__button-next',
    prevEl: '.compare__button-prev',
  },
});
const compareSwiperDescr = new Swiper('.compare__descr-swiper', {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 20,
});
compareSwiper.controller.control = compareSwiperDescr;
compareSwiperDescr.controller.control = compareSwiper;
