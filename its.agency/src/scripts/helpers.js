export function calculateCountProductsInList(list) {
  let count = 0;

  if (list) list.forEach((data) => (count += data.count));

  return count;
}

export function createElement({ tag = "div", classes = [], content = "", id, src, alt, type, value, html }) {
  const el = document.createElement(tag);
  classes.forEach((className) => {
    el.classList.add(className);
  });
  el.textContent = content;
  if (html) el.innerHTML = html;

  if (id) el.id = id;
  if (src) el.setAttribute("src", src);
  if (alt) el.setAttribute("alt", alt);
  if (type) el.setAttribute("type", type);
  if (value) el.setAttribute("value", value);

  return el;
}

export function changeStorage(key, value = null, action = null) {
  if (action === "set") {
    localStorage.setItem("cart", JSON.stringify(value));
  } else if (action === "clear") {
    localStorage.removeItem("cart");
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}
