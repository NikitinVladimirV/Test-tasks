/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/_components.js":
/*!************************************!*\
  !*** ./src/scripts/_components.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/index */ "./src/scripts/components/index.js");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_index__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/scripts/_vendor.js":
/*!********************************!*\
  !*** ./src/scripts/_vendor.js ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/scripts/components/episode-slider.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/episode-slider.js ***!
  \**************************************************/
/***/ (() => {

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
  function move() {
    let next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    click = false;
    bullets[currentSlide].classList.remove("active");
    next ? currentSlide++ : currentSlide--;
    bullets[currentSlide].classList.add("active");
    const currentTX = +getComputedStyle(sliderWrapper).transform.split(",")[4];
    sliderWrapper.style.transform = `translateX(${currentTX - (next ? offset : -offset)}px)`;
    next ? prevButton.removeAttribute("disabled") : nextButton.removeAttribute("disabled");
    if (next) {
      if (currentSlide >= arrLength - 1) nextButton.setAttribute("disabled", true);
    } else {
      if (currentSlide === 0) prevButton.setAttribute("disabled", true);
    }
    setTimeout(() => {
      click = true;
    }, 500);
  }
}

/***/ }),

/***/ "./src/scripts/components/index.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/index.js ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/scripts/components/string.js":
/*!******************************************!*\
  !*** ./src/scripts/components/string.js ***!
  \******************************************/
/***/ (() => {

const strings = document.querySelectorAll(".string");
strings.forEach(string => {
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

/***/ }),

/***/ "./src/scripts/components/team-slider.js":
/*!***********************************************!*\
  !*** ./src/scripts/components/team-slider.js ***!
  \***********************************************/
/***/ (() => {

const slider = document.querySelector(".slider-team");
const sliderWrapper = slider.querySelector(".slider-team__wrapper");
const slides = sliderWrapper.children;
const offset = slides[0].offsetWidth + 16;
const arrLength = slides.length;
let currentSlide = 1;
const currentSlidesEl = document.querySelector(".team__count-number");
currentSlidesEl.textContent = currentSlide;
const totalSlidesEl = document.querySelector(".team__count-from");
totalSlidesEl.textContent = arrLength;
const buttonPrev = document.querySelector(".team__btn--prev");
const buttonNext = document.querySelector(".team__btn--next");
window.addEventListener("resize", () => {
  window.location.reload();
});
addCloneEl(slides, arrLength);
sliderWrapper.style.transform = `translateX(-${arrLength * offset}px)`;
let click = true;
buttonPrev.addEventListener("click", () => {
  clearInterval(interval);
  if (click) move(offset, 500, false);
});
buttonNext.addEventListener("click", () => {
  clearInterval(interval);
  if (click) move(offset, 500);
});
const interval = setInterval(() => {
  move(offset, 500);
}, 4500);
function move(offset, duration) {
  let next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  click = false;
  const currentTX = +getComputedStyle(sliderWrapper).transform.split(",")[4];
  if (next) {
    currentSlide++;
    currentSlidesEl.textContent = currentSlide = currentSlide > arrLength ? 1 : currentSlide;
  } else {
    currentSlide--;
    currentSlidesEl.textContent = currentSlide = currentSlide === 0 ? arrLength : currentSlide;
  }
  setTimeout(() => {
    addCloneEl(slides, 1, next);
  }, next ? 0 : duration);
  sliderWrapper.animate([{
    transform: `translateX(${currentTX - (next ? offset : -offset)}px)`
  }], {
    duration: 500
  });
  setTimeout(() => {
    removeEl(slides, next);
  }, next ? duration : 0);
  setTimeout(() => {
    click = true;
  }, 600);
}
function removeEl(element) {
  let fromStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  fromStart ? element[0].remove() : element[element.length - 1].remove();
}
function addCloneEl(element) {
  let clonesNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  let toEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  for (let i = 0; i < clonesNumber; i++) {
    let cloneItem = toEnd ? element[i].cloneNode(true) : element[element.length - 1].cloneNode(true);
    toEnd ? element[i].parentNode.append(cloneItem) : element[element.length - 1].parentNode.prepend(cloneItem);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_vendor */ "./src/scripts/_vendor.js");
/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_components */ "./src/scripts/_components.js");
/* harmony import */ var _components_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/string */ "./src/scripts/components/string.js");
/* harmony import */ var _components_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_team_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/team-slider */ "./src/scripts/components/team-slider.js");
/* harmony import */ var _components_team_slider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_team_slider__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_episode_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/episode-slider */ "./src/scripts/components/episode-slider.js");
/* harmony import */ var _components_episode_slider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_episode_slider__WEBPACK_IMPORTED_MODULE_4__);





})();

/******/ })()
;
//# sourceMappingURL=main.js.map