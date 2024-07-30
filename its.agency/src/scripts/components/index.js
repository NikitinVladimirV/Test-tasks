import { calculateCountProductsInList, changeStorage, createElement } from "../helpers";
import { getProducts } from "./api";

export const productsList = await getProducts();

let filterProducts = productsList;
let sortProducts = filterProducts;
let filterFlags = [];

export function setHeaderProductsCountInCart(count = 0) {
  const cartOpenBtn = document.querySelector("#cart-open-btn");
  cartOpenBtn.textContent = count;
}
function filterPageList(array, flag = null) {
  filterProducts = array.filter((product) => {
    switch (flag) {
      case "new":
        return product.new;
      case "available":
        return product.available;
      case "contract":
        return product.contract;
      case "exclusive":
        return product.exclusive;
      case "sale":
        return product.sale;
      default:
        return product;
    }
  });
}
export function setPageProductsCount(count) {
  const countEl = document.querySelector("#product-count");
  countEl.textContent = count;
}
function sortPageList(data, flag = "cost-desc") {
  sortProducts = data.sort((a, b) => {
    switch (flag) {
      case "cost-asc":
        return a.cost - b.cost;
      case "popular-desc":
        return b.popular - a.popular;
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return b.cost - a.cost;
    }
  });
}
function renderCatalog(productsItem) {
  const catalog = document.querySelector(".catalog__body");
  catalog.innerHTML = "";

  productsItem.forEach((task) => {
    const card = createPageCard(task);
    catalog.append(card);
  });
}
function createPageCard(data) {
  const card = createElement({ classes: ["catalog__body-card", "catalog-card"] });

  const imageWrapper = createElement({ classes: ["catalog-card__image"] });
  card.append(imageWrapper);
  const image = createElement({ tag: "img", src: data.image, alt: "фото товара" });
  imageWrapper.append(image);
  const title = createElement({ tag: "h3", classes: ["catalog-card__title"], content: data.title });
  card.append(title);
  const buyWrapper = createElement({ classes: ["catalog-card__buy"] });
  card.append(buyWrapper);
  const costWpapper = createElement({ tag: "span", classes: ["catalog-card__cost"], content: " ₽" });
  buyWrapper.append(costWpapper);
  const cost = createElement({ tag: "span", content: data.cost, id: "product-cost" });
  costWpapper.prepend(cost);
  const button = createElement({ tag: "button", classes: ["catalog-card__btn"], content: "+" });
  buyWrapper.append(button);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(data);
  });

  return card;
}
function addToCart(product) {
  const productsInStorage = changeStorage("cart") || [];

  if (productsInStorage.length < 1) {
    productsInStorage.push({ count: 1, product: product });
  } else {
    const productExist = productsInStorage.find((data) => data.product.id === product.id);
    productExist ? productExist.count++ : productsInStorage.push({ count: 1, product: product });
  }

  changeStorage("cart", productsInStorage, "set");
  const countProducts = calculateCountProductsInList(changeStorage("cart"));
  setHeaderProductsCountInCart(countProducts);
}

const select = document.querySelector(".sort");
select.addEventListener("input", (e) => {
  e.preventDefault();
  sortPageList(filterProducts, select.value);
  renderCatalog(sortProducts);
});

const filters = document.querySelectorAll(".switch__input");
filters.forEach((filterEl) => {
  filterEl.addEventListener("input", (e) => {
    e.preventDefault();
    if (filterEl.checked) {
      filterFlags.push(filterEl.name);
    } else {
      if (filterFlags.length < 1) filterPageList(products);
      filterFlags = filterFlags.filter((flag) => flag !== filterEl.name);
      filterProducts = productsList;
    }

    filterFlags.forEach((flag) => {
      filterPageList(filterProducts, flag);
    });
    sortPageList(filterProducts);
    setPageProductsCount(sortProducts.length);
    renderCatalog(sortProducts);
  });
});

setHeaderProductsCountInCart(calculateCountProductsInList(changeStorage("cart")));
filterPageList(productsList);
setPageProductsCount(sortProducts.length);
sortPageList(filterProducts);
renderCatalog(sortProducts);
