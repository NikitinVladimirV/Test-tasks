console.log("Component");

const products = document.querySelector(".products");
const cart = document.querySelector(".products__cart");
const shelfs = document.querySelector(".products__shelfs");
const list = document.querySelector(".products__list");
const items = document.querySelectorAll(".products__item");
const btn = document.querySelector(".products__btn");

let target;

///////////////////////////////////////////////////////////////////////
// items.forEach((item) => {
//   const img = item.querySelector(".products__img");

//   img.addEventListener("touchmove", dragMove);

//   function dragMove(e) {
//     e.preventDefault();

//     item.style.height = `${img.clientHeight}px`;
//     item.style.width = `${img.clientWidth}px`;

//     let touch = e.targetTouches[0];

//     const offsetX = products.offsetLeft + shelfs.offsetLeft + list.offsetLeft + item.offsetLeft;
//     const offsetY = products.offsetTop + shelfs.offsetTop + list.offsetTop + item.offsetTop;
//     const imgWidth = img.offsetWidth;
//     const imgHeight = img.offsetHeight;

//     img.style.top = `${touch.pageY - offsetY - imgHeight / 2}px`;
//     img.style.left = `${touch.pageX - offsetX - imgWidth / 2}px`;
//   }
// });

/////////////////////////////////////////////////////////////////////
items.forEach((item) => {
  const img = item.querySelector(".products__img");

  img.ondragstart = function () {
    return false;
  };

  img.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (e.which === 1) {
      target = e.currentTarget;
      target.style.position = "fixed";
      target.style.zIndex = "2";
      item.style.height = `${target.clientHeight}px`;
      item.style.width = `${target.clientWidth}px`;
    }

    document.addEventListener("pointermove", mouseMove);

    function mouseMove(e) {
      target.style.left = e.pageX - target.offsetWidth / 2 + "px";
      target.style.top = e.pageY - target.offsetHeight / 2 + "px";
    }

    img.addEventListener("pointerup", (e) => {
      e.preventDefault();
      document.removeEventListener("pointermove", mouseMove);

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
        btn.style.display = "inline";
      }
    });
  });
});
// items.forEach((item) => {
//   const img = item.querySelector(".products__img");

//   img.ondragstart = function () {
//     return false;
//   };

//   img.addEventListener("pointer", (e) => {
//     if (e.which === 1) {
//       target = e.currentTarget;
//       target.style.position = "fixed";
//       target.style.zIndex = "2";
//       item.style.height = `${target.clientHeight}px`;
//       item.style.width = `${target.clientWidth}px`;
//     }

//     document.addEventListener("mousemove", mouseMove);

//     function mouseMove(e) {
//       target.style.left = e.pageX - target.offsetWidth / 2 + "px";
//       target.style.top = e.pageY - target.offsetHeight / 2 + "px";
//     }

//     img.addEventListener("mouseup", (e) => {
//       document.removeEventListener("mousemove", mouseMove);

//       const cartTop = cart.getBoundingClientRect().top;
//       const cartRight = cart.getBoundingClientRect().right;
//       const cartBottom = cart.getBoundingClientRect().bottom;
//       const cartLeft = cart.getBoundingClientRect().left;
//       const imgTop = img.getBoundingClientRect().top;
//       const imgRight = img.getBoundingClientRect().right;
//       const imgBottom = img.getBoundingClientRect().bottom;
//       const imgLeft = img.getBoundingClientRect().left;

//       if (cartTop < imgTop) {
//         console.log("Top");
//       }
//       if (cartRight > imgRight) {
//         console.log("Right");
//       }
//       if (cartBottom > imgBottom) {
//         console.log("Bottom");
//       }
//       if (cartLeft < imgLeft) {
//         console.log("Left");
//       }
//       if (cartTop < imgTop && cartRight > imgRight && cartBottom > imgBottom && cartLeft < imgLeft) {
//         cart.append(img);
//         img.style.zIndex = 0;
//       }
//       if (cart.children.length > 3) {
//         btn.style.display = "inline";
//       }

//       console.log(cart.children.length);
//     });
//   });
// });
