const overlay = document.querySelector(".content__wrapper");
const filters = document.querySelector(".content__filters");
const filterOpenBtn = document.querySelector(".catalog__btn-filter");
const filterCloseBtn = document.querySelector(".filters__btn-close");

filterOpenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("content__wrapper--open");
  filters.classList.add("filters--open");

  document.body.style.overflow = "hidden";
});

filterCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.remove("content__wrapper--open");
  filters.classList.remove("filters--open");

  document.body.style.overflow = "";
});
