const strings = document.querySelectorAll(".string");

strings.forEach((string) => {
  const stringContent = string.querySelector(".string__content");

  const stringWidth = string.offsetWidth;
  const stringContentWidth = stringContent.scrollWidth;

  function move() {
    let currentTX = getComputedStyle(stringContent).transform.split(",")[4];
    currentTX = parseFloat(currentTX) - 1;

    if (-currentTX >= stringContentWidth) {
      stringContent.style.transform = "translateX(" + stringWidth + "px)";
    } else {
      stringContent.style.transform = "translateX(" + currentTX + "px)";
    }
  }

  setInterval(move, 10);
});
