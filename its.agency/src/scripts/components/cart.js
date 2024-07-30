import { setHeaderProductsCountInCart } from ".";
import { calculateCountProductsInList, changeStorage, createElement } from "../helpers";

window.addEventListener("storage", (e) => {
  console.log(e.key);
});

const btnCartOpen = document.querySelector(".actions-list__btn--cart");

// Modal Cart
if (btnCartOpen) {
  btnCartOpen.addEventListener("click", (e) => {
    const path = btnCartOpen.getAttribute("data-path");
    const modals = document.querySelectorAll(".modal");

    if (changeStorage("cart")) fillCart();

    modals.forEach((modal) => {
      if (modal.getAttribute("data-target") === path) {
        document.body.style.overflow = "hidden";
        modal.classList.remove("is-hidden");

        const modalOverlay = modal.querySelector(".modal__overlay");

        modalOverlay.addEventListener("click", (e) => {
          if (e.target === modalOverlay) {
            modal.classList.add("is-hidden");
            document.body.style.overflow = "";
            setHeaderProductsCountInCart(calculateCountProductsInList(changeStorage("cart")) || 0);
          }
        });
      }
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.querySelector(".modal__close").addEventListener("click", () => {
      modal.classList.add("is-hidden");
      document.body.style.overflow = "";
      setHeaderProductsCountInCart(calculateCountProductsInList(changeStorage("cart")) || 0);
    });
  });
}
// Cart
const cart = document.querySelector(".cart");
const cartCountEl = cart.querySelector("#cart-count");
const totalCostEl = cart.querySelector("#totalCost");
let productsInCart = changeStorage("cart");
totalCostEl.textContent = productsInCart ? calculateTotalCost() : 0;

function fillCart() {
  productsInCart = changeStorage("cart").filter((item) => item.count > 0);
  changeStorage("cart", productsInCart, "set");

  cartCountEl.textContent = calculateCountProductsInList(changeStorage("cart"));
  totalCostEl.textContent = productsInCart ? calculateTotalCost() : 0;
  if (productsInCart) fillCartList(productsInCart);
}

function calculateTotalCost() {
  return productsInCart.map((item) => item.count * item.product.cost).reduce((acc, item) => (acc += item), 0);
}

function createCard(product, count) {
  const card = createElement({ tag: "li", classes: ["body-cart__item", "cart-item"] });

  const image = createElement({ tag: "img", classes: ["cart-item__image"], src: product.image, alt: "фото товара" });
  card.append(image);

  const description = createElement({ tag: "div", classes: ["cart-item__description"] });
  const title = createElement({ tag: "h3", classes: ["cart-item__title"], content: product.title });
  const costWrapper = createElement({ tag: "span", classes: ["cart-item__cost"], content: " ₽" });
  const costSum = createElement({ tag: "span", classes: ["cart-item__cost"], content: product.cost });
  costWrapper.prepend(costSum);
  description.append(title);
  description.append(costWrapper);
  card.append(description);

  const counter = createElement({ tag: "div", classes: ["cart-item__counter", "counter"] });
  const decrementIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  const decrementBtn = createElement({ tag: "button", classes: ["counter__btn", "counter__btn--decrement", "btn-reset"], html: decrementIcon });
  const input = createElement({ tag: "input", classes: ["counter__input"], type: "text", value: count });
  const incrementIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.33325V12.6666" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  const incrementBtn = createElement({ tag: "button", classes: ["counter__btn", "counter__btn--increment", "btn-reset"], html: incrementIcon });
  counter.append(decrementBtn);
  counter.append(input);
  counter.append(incrementBtn);
  card.append(counter);

  const removeIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  const removeBtn = createElement({ tag: "button", classes: ["cart-item__btn", "remove-btn", "btn-reset"], html: removeIcon });
  const repeatIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 1L21 5L17 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 23L3 19L7 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  const repeatBtn = createElement({ tag: "button", classes: ["cart-item__btn", "repeat-btn", "btn-reset"], html: repeatIcon });
  card.append(removeBtn);
  card.append(repeatBtn);

  decrementBtn.addEventListener("click", (e) => {
    input.value--;

    if (input.value < 1) {
      decrementBtn.setAttribute("disabled", true);
      card.classList.add("is-delete");
    }

    changeAndSaveCount(product, input.value);
  });

  incrementBtn.addEventListener("click", (e) => {
    input.value++;
    decrementBtn.removeAttribute("disabled");
    card.classList.remove("is-delete");

    changeAndSaveCount(product, input.value);
  });
  removeBtn.addEventListener("click", (e) => {
    decrementBtn.setAttribute("disabled", true);
    incrementBtn.setAttribute("disabled", true);
    card.classList.add("is-delete");
    input.value = 0;

    changeAndSaveCount(product, input.value);
  });
  repeatBtn.addEventListener("click", (e) => {
    decrementBtn.removeAttribute("disabled");
    incrementBtn.removeAttribute("disabled");
    card.classList.remove("is-delete");
    input.value = 1;

    changeAndSaveCount(product, input.value);
  });

  return card;
}

function changeProductCount(product, count) {
  return productsInCart.map((item) => {
    if (item.product.id === product.id) {
      item.count = +count;
    }
    return item;
  });
}

function changeAndSaveCount(product, count) {
  productsInCart = changeProductCount(product, count);
  totalCostEl.textContent = productsInCart ? calculateTotalCost() : 0;
  changeStorage("cart", productsInCart, "set");
  cartCountEl.textContent = calculateCountProductsInList(changeStorage("cart"));
}

const cartList = cart.querySelector(".body-cart__list");

const clearCartBtn = cart.querySelector("#cart-clear");
clearCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear("cart");
  cartCountEl.textContent = calculateCountProductsInList(changeStorage("cart"));
  totalCostEl.textContent = changeStorage("cart") ? calculateTotalCost() : 0;
  setHeaderProductsCountInCart(calculateCountProductsInList(changeStorage("cart")));
  cartList.innerHTML = "";
});

function fillCartList(products) {
  const cartList = cart.querySelector(".body-cart__list");
  cartList.innerHTML = "";

  products.forEach((item) => {
    cartList.append(createCard(item.product, item.count));
  });
}
