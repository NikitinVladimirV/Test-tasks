const slider = document.querySelector(".slider-team");
const sliderWrapper = slider.querySelector(".slider-team__wrapper");
const slides = sliderWrapper.children;
const offset = slides[0].offsetWidth + 16;
const arrLength = slides.length;
let currentSlide = 1;
const currentSlidesEl = document.querySelector(".team__count-number");
currentSlidesEl.textContent = currentSlide;
const totalSlidesEl = document.querySelector(".team__count-from");
totalSlidesEl.textContent = arrLength;

const buttonPrev = document.querySelector(".team__btn--prev");
const buttonNext = document.querySelector(".team__btn--next");

window.addEventListener("resize", () => {
  window.location.reload();
});

addCloneEl(slides, arrLength);
sliderWrapper.style.transform = `translateX(-${arrLength * offset}px)`;

let click = true;

buttonPrev.addEventListener("click", () => {
  clearInterval(interval);
  if (click) move(offset, 500, false);
});
buttonNext.addEventListener("click", () => {
  clearInterval(interval);
  if (click) move(offset, 500);
});

const interval = setInterval(() => {
  move(offset, 500);
}, 4500);

function move(offset, duration, next = true) {
  click = false;

  const currentTX = +getComputedStyle(sliderWrapper).transform.split(",")[4];

  if (next) {
    currentSlide++;
    currentSlidesEl.textContent = currentSlide =
      currentSlide > arrLength ? 1 : currentSlide;
  } else {
    currentSlide--;
    currentSlidesEl.textContent = currentSlide =
      currentSlide === 0 ? arrLength : currentSlide;
  }

  setTimeout(
    () => {
      addCloneEl(slides, 1, next);
    },
    next ? 0 : duration
  );

  sliderWrapper.animate(
    [{ transform: `translateX(${currentTX - (next ? offset : -offset)}px)` }],
    { duration: 500 }
  );

  setTimeout(
    () => {
      removeEl(slides, next);
    },
    next ? duration : 0
  );

  setTimeout(() => {
    click = true;
  }, 600);
}

function removeEl(element, fromStart = true) {
  fromStart ? element[0].remove() : element[element.length - 1].remove();
}

function addCloneEl(element, clonesNumber = 1, toEnd = true) {
  for (let i = 0; i < clonesNumber; i++) {
    let cloneItem = toEnd
      ? element[i].cloneNode(true)
      : element[element.length - 1].cloneNode(true);
    toEnd
      ? element[i].parentNode.append(cloneItem)
      : element[element.length - 1].parentNode.prepend(cloneItem);
  }
}
