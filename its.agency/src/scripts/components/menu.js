const navMenu = document.querySelector(".header__nav");
const navBtn = navMenu.querySelector(".nav__btn");

navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navMenu.classList.toggle("nav--open");

  if (navMenu.classList.contains("nav--open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
