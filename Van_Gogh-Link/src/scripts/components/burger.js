const burgerBtn = document.querySelector(".header__open-btn");

if (burgerBtn) {
  const menu = document.querySelector(".header__menu");

  burgerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    menu.classList.toggle("active");
    document.body.classList.toggle("scroll-stop");
  });
}
