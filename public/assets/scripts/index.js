/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/components/Dialog.js":
/*!*************************************************!*\
  !*** ./src/assets/scripts/components/Dialog.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dialog": () => (/* binding */ Dialog),
/* harmony export */   "dialogs": () => (/* binding */ windowDialogs)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



var focusableSelectors = ['a[href]:not([tabindex^="-"])', 'area[href]:not([tabindex^="-"])', 'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])', 'input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked', 'select:not([disabled]):not([tabindex^="-"])', 'textarea:not([disabled]):not([tabindex^="-"])', 'button:not([disabled]):not([tabindex^="-"])', 'iframe:not([tabindex^="-"])', 'audio[controls]:not([tabindex^="-"])', 'video[controls]:not([tabindex^="-"])', '[contenteditable]:not([tabindex^="-"])', '[tabindex]:not([tabindex^="-"])'];

var Dialog = /*#__PURE__*/function () {
  /**
   * Creates a modal dialog component
   * @param {HTMLElement} element the dialog element
   */
  function Dialog(element) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Dialog);

    if (element == null) {
      throw Error('Dialog element is null.');
    }

    this.element = element;
    this.element.setAttribute('hidden', true);
    this.element.setAttribute('role', 'dialog');
    this.element.setAttribute('aria-modal', true);
    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
    this._handleKeyDown = this.handleKeyDown.bind(this);
    this._maintainFocus = this.maintainFocus.bind(this);
    this.triggers = [];

    var closers = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(this.element.querySelectorAll('[data-dialog-hide]'));

    closers.forEach(function (closer) {
      return closer.addEventListener('click', function (e) {
        _this.hide();
      });
    });
    console.log(closers); // CUSTOM EVENTS

    this.events = {
      show: [],
      hide: []
    };
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Dialog, [{
    key: "on",
    value: function on(type, fn) {
      this.events[type].push(fn);
    }
  }, {
    key: "off",
    value: function off(type, fn) {
      var index = this.events[type].indexOf(fn);
      if (index > -1) this.events[type].splice(index, 1);
    }
  }, {
    key: "show",
    value: function show() {
      this.previouslyFocused = document.activeElement;
      this.isShown = true;
      this.element.removeAttribute('hidden');
      document.addEventListener('keydown', this._handleKeyDown);
      document.body.addEventListener('focus', this._maintainFocus, true);
      this.moveFocusIn();
      document.documentElement.classList.add('no-scroll');
      this.events.show.forEach(function (event) {
        return event();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.isShown = false;
      this.element.setAttribute('hidden', true);
      document.removeEventListener('keydown', this._handleKeyDown);
      document.body.removeEventListener('focus', this._maintainFocus, true);

      if (this.previouslyFocused && this.previouslyFocused.focus) {
        this.previouslyFocused.focus();
      }

      document.documentElement.classList.remove('no-scroll');
      this.events.hide.forEach(function (event) {
        return event();
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isShown) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'Escape') this.hide();else if (event.key === 'Tab') trapTabKey(this.element, event);
    }
  }, {
    key: "maintainFocus",
    value: function maintainFocus(event) {
      var isInDialog = event.target.closest('[aria-modal="true"]');
      if (!isInDialog) this.moveFocusIn();
    }
  }, {
    key: "moveFocusIn",
    value: function moveFocusIn() {
      var target = this.element.querySelector('[autofocus]') || getFocusableChildren(this.element)[0];
      if (target) target.focus();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var closers = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(this.element.querySelectorAll('[data-dialog-hide]'));

      closers.forEach(function (closer) {
        return closer.removeEventListener('click', _this2._hide);
      });
      this.events.show.forEach(function (event) {
        return _this2.off('show', event);
      });
      this.events.hide.forEach(function (event) {
        return _this2.off('hide', event);
      });
    }
  }]);

  return Dialog;
}();

function trapTabKey(node, event) {
  var focusableChildren = getFocusableChildren(node);
  var focusedItemIndex = focusableChildren.indexOf(document.activeElement);
  var lastIndex = focusableChildren.length - 1;
  var withShift = event.shiftKey;

  if (withShift && focusedItemIndex === 0) {
    focusableChildren[lastIndex].focus();
    event.preventDefault();
  } else if (!withShift && focusedItemIndex === lastIndex) {
    focusableChildren[0].focus();
    event.preventDefault();
  }
}
/**
 * Checks if an element is visible
 * @param {HTMLElement} element the element to check
 * @returns a function that returns true if the element is visible
 */


function isVisible(element) {
  return function (element) {
    return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
  };
}

function getFocusableChildren(root) {
  var elements = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(root.querySelectorAll(focusableSelectors.join(',')));

  return elements.filter(isVisible);
} // Get all unique IDs


function getUniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

var dialogTriggers = document.querySelectorAll('button[data-dialog]');

var modalsWithNoTrigger = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelectorAll('[data-modal]')).filter(function (i) {
  return i.id;
}).map(function (d) {
  var dummyButton = document.createElement('button');
  dummyButton.dataset.dialog = d.id;
  dummyButton.dataset.show = d.dataset.modal === 'show';
  console.log(d.id, dummyButton);
  return dummyButton;
});

var dialogButtons = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(dialogTriggers), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(modalsWithNoTrigger));
var dialogIDs = dialogButtons.map(function (button) {
  return button.dataset.dialog;
}).filter(getUniqueValues);
var windowDialogs = dialogIDs.map(function (id) {
  var dialogElement = document.getElementById(id);

  if (dialogElement != null) {
    var dialog = new Dialog(dialogElement);

    var triggers = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(dialogButtons).filter(function (button) {
      return button.dataset.dialog === id;
    });

    triggers.forEach(function (trigger) {
      return dialog.triggers.push(trigger);
    });
    dialog.triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        dialog.toggle();
      });
    });
    dialog.on('hide', function () {
      dialog.triggers.forEach(function (trigger) {
        return trigger.setAttribute('aria-expanded', false);
      });
    });
    dialog.on('show', function () {
      dialog.triggers.forEach(function (trigger) {
        return trigger.setAttribute('aria-expanded', true);
      });
    });
    var isOpenByDefault = dialog.triggers.find(function (button) {
      return button.dataset.show === 'true';
    }) != null;
    if (isOpenByDefault) dialog.show();
    return dialog;
  } else {
    console.error({
      message: "Element ".concat(dialogID, " is null."),
      button: button
    });
  }
});


/***/ }),

/***/ "./src/assets/scripts/components/PopOver.js":
/*!**************************************************!*\
  !*** ./src/assets/scripts/components/PopOver.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopOver": () => (/* binding */ PopOver),
/* harmony export */   "popovers": () => (/* binding */ popovers)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");




var PopOver = /*#__PURE__*/function () {
  /**
   * Creates a new popover, as specified by the trigger button's
   * [data-popover] attribute. The [data-popover] attribute should
   * specify the [id] of the HTMLElement that will be the popover
   * @param {HTMLButtonElement} trigger the button that triggers this popover
   */
  function PopOver(trigger) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, PopOver);

    this.trigger = trigger;
    var popover = document.getElementById(trigger.dataset.popover);

    if (popover == null) {
      throw Error("Popover is null");
    }

    this.events = {
      show: [],
      hide: []
    };
    this.trigger.addEventListener("click", function (e) {
      return _this.toggle();
    });
    this.popOver = popover;
    this._isShown = false;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") _this.hide();
    });
    document.addEventListener("click", function (e) {
      if (!e.target.matches("button[data-popover], button[data-popover] *")) {
        _this.hide();
      }
    });
    this.hide();
  }
  /**
   * @
   */


  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(PopOver, [{
    key: "isShown",
    get: function get() {
      return this._isShown;
    }
    /**
     * Shows this popover
     */
    ,
    set: function set(value) {
      this._isShown = value;
      this.toggle(value);
    }
  }, {
    key: "show",
    value: function show() {
      this.trigger.setAttribute("aria-expanded", "false");
      this.popOver.removeAttribute("hidden");
      this._isShown = true;
      this.events.show.forEach(function (event) {
        return event();
      });
    }
    /**
     * Hides this popover
     */

  }, {
    key: "hide",
    value: function hide() {
      this.trigger.setAttribute("aria-expanded", "false");
      this.popOver.setAttribute("hidden", "true");
      this._isShown = false;
      this.events.hide.forEach(function (event) {
        return event();
      });
    }
    /**
     * Toggles this popover
     * @param {boolean} isPopoverShown if null, toggles this popover; otherwise, true shows this popover, false hides it
     */

  }, {
    key: "toggle",
    value: function toggle(isPopoverShown) {
      var popoverIsShown = isPopoverShown == null ? this.isShown : isPopoverShown;
      if (popoverIsShown) this.hide();else this.show();
    }
    /**
     * Adds an event listener to this popover
     * @param {String} type the type of event to listen for
     * @param {Function} fn the function to execute when the event is triggered
     */

  }, {
    key: "on",
    value: function on(type, fn) {
      this.events[type].push(fn);
    }
    /**
     * Removes an event listener to this popover
     * @param {String} type the type of event to listen for
     * @param {Function} fn the function to execute when the event is triggered
     */

  }, {
    key: "off",
    value: function off(type, fn) {
      var index = this.events[type].indexOf(fn);
      if (index > -1) this.events[type].splice(index, 1);
    }
  }]);

  return PopOver;
}();

var popoverTriggers = document.querySelectorAll("button[data-popover]");

var popovers = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(popoverTriggers).map(function (button) {
  return new PopOver(button);
});



/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
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
/* harmony import */ var _components_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Dialog */ "./src/assets/scripts/components/Dialog.js");
/* harmony import */ var _components_PopOver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PopOver */ "./src/assets/scripts/components/PopOver.js");


console.log(_components_Dialog__WEBPACK_IMPORTED_MODULE_0__.dialogs);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map