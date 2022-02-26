/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/animations/navigation-bar.js":
/*!*********************************************************!*\
  !*** ./src/assets/scripts/animations/navigation-bar.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/dom */ "./src/assets/scripts/utilities/dom.js");


var eventCallback = function eventCallback(list, classes) {
  return function (e) {
    /** @type {HTMLElement} */
    var target = e.target;
    var parentSelector = '.navigation-link:is(a, button)';
    var childSelector = '.navigation-link:is(a, button) *';

    if (target.matches(parentSelector) || target.matches(childSelector)) {
      var link = target.matches(parentSelector) ? target : target.closest(parentSelector);
      var left = link.offsetLeft,
          top = link.offsetTop,
          height = link.clientHeight,
          width = link.clientWidth;
      list.classList.add(classes);
      list.style.setProperty('--left', "".concat(left, "px"));
      list.style.setProperty('--top', "".concat(top, "px"));
      list.style.setProperty('--width', "".concat(width, "px"));
      list.style.setProperty('--height', "".concat(height, "px"));
    }
  };
};

(0,_utilities_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('[data-navigation-links]').forEach(function (ul) {
  /** @type {HTMLElement} */
  var list = ul;
  list.addEventListener('mouseover', eventCallback(list, 'hover'));
  list.addEventListener('focusin', eventCallback(list, 'focus'));
  list.addEventListener('mouseout', function (e) {
    list.classList.remove('hover');
  });
  list.addEventListener('mouseleave', function (e) {
    list.classList.remove('hover');
  });
  list.addEventListener('focusout', function (e) {
    list.classList.remove('focus');
  });
});

/***/ }),

/***/ "./src/assets/scripts/utilities/dom.js":
/*!*********************************************!*\
  !*** ./src/assets/scripts/utilities/dom.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "$$": () => (/* binding */ $$),
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
/**
 * Alias for document.querySelector
 *
 * @param {string} selector the selector to use
 * @return {HTMLElement} the result
 */
function $(selector) {
  return document.querySelector(selector);
}
/**
 * Alias for document.querySelectorAll
 *
 * @param {string} selector the selector to use
 * @return {NodeList} the result
 */


function $$(selector) {
  return document.querySelectorAll(selector);
}
/**
 * Alias for document.createElement
 *
 * @param {string} tag the HTML tag (with no angle brackets)
 * @return {HTMLElement} the newly-created element
 */


function createElement(tag) {
  return document.createElement(tag);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/assets/scripts/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animations_navigation_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations/navigation-bar */ "./src/assets/scripts/animations/navigation-bar.js");

})();

/******/ })()
;
//# sourceMappingURL=index.js.map