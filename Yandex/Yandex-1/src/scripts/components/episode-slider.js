if (window.innerWidth <= 935) {
  const slider = document.querySelector(".slider-episodes");
  const sliderWrapper = slider.querySelector(".slider-episodes__wrapper");
  const slides = slider.querySelectorAll(".slider-episodes__item");
  const arrLength = slides.length;
  const prevButton = slider.querySelector(".slider-episodes__btn--prev");
  const nextButton = slider.querySelector(".slider-episodes__btn--next");
  const bulletsContainer = slider.querySelector(".slider-episodes__count");
  const offset = sliderWrapper.offsetWidth + 20;
  let currentSlide = 0;

  sliderWrapper.style.transform = `translateX($0px)`;

  for (let i = 0; i < arrLength; i++) {
    const bullet = createBullet();
    if (i === 0) bullet.classList.add("active");
    bulletsContainer.append(bullet);
  }
  const bullets = slider.querySelectorAll(".slider-episodes__count-bullet");

  let click = true;

  prevButton.addEventListener("click", () => {
    if (click) move(false);
  });

  nextButton.addEventListener("click", () => {
    if (click) move();
  });

  function createBullet() {
    const bullet = document.createElement("span");
    bullet.classList.add("slider-episodes__count-bullet");

    return bullet;
  }

  function move(next = true) {
    click = false;

    bullets[currentSlide].classList.remove("active");
    next ? currentSlide++ : currentSlide--;
    bullets[currentSlide].classList.add("active");

    const currentTX = +getComputedStyle(sliderWrapper).transform.split(",")[4];

    sliderWrapper.style.transform = `translateX(${
      currentTX - (next ? offset : -offset)
    }px)`;

    next
      ? prevButton.removeAttribute("disabled")
      : nextButton.removeAttribute("disabled");

    if (next) {
      if (currentSlide >= arrLength - 1)
        nextButton.setAttribute("disabled", true);
    } else {
      if (currentSlide === 0) prevButton.setAttribute("disabled", true);
    }

    setTimeout(() => {
      click = true;
    }, 500);
  }
}
