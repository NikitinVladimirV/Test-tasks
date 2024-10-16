const items = document.querySelectorAll(".products__item");

items.forEach((item) => {
  const img = item.querySelector(".products__img");

  let target;

  img.ondragstart = function () {
    return false;
  };

  img.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    target = e.currentTarget;
    target.style.position = "fixed";
    target.style.zIndex = "2";
    item.style.height = `${target.clientHeight}px`;
    item.style.width = `${target.clientWidth}px`;

    document.addEventListener("pointermove", mouseMove);

    function mouseMove(e) {
      target.style.left = e.pageX - target.offsetWidth / 2 + "px";
      target.style.top = e.pageY - target.offsetHeight / 2 + "px";
    }

    img.addEventListener("pointerup", (e) => {
      e.preventDefault();

      document.removeEventListener("pointermove", mouseMove);

      const cart = document.querySelector(".products__cart");
      const cartTop = cart.getBoundingClientRect().top;
      const cartRight = cart.getBoundingClientRect().right;
      const cartBottom = cart.getBoundingClientRect().bottom;
      const cartLeft = cart.getBoundingClientRect().left;
      const imgTop = img.getBoundingClientRect().top;
      const imgRight = img.getBoundingClientRect().right;
      const imgBottom = img.getBoundingClientRect().bottom;
      const imgLeft = img.getBoundingClientRect().left;

      if (cartTop < imgTop && cartRight > imgRight && cartBottom > imgBottom && cartLeft < imgLeft) {
        cart.append(img);
        img.style.zIndex = 0;
      }

      if (cart.children.length > 3) {
        const btn = document.querySelector(".products__btn");
        btn.style.display = "inline";
      }
    });
  });
});
