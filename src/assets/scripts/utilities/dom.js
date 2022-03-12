/**
 * Alias for document.querySelector
 *
 * @param {string} selector the selector to use
 * @return {HTMLElement} the result
 */
function $ (selector) {
  return document.querySelector(selector)
}

/**
 * Alias for document.querySelectorAll
 *
 * @param {string} selector the selector to use
 * @return {NodeList} the result
 */
function $$ (selector) {
  return document.querySelectorAll(selector)
}

/**
 * Alias for document.createElement
 *
 * @param {string} tag the HTML tag (with no angle brackets)
 * @return {HTMLElement} the newly-created element
 */
function createElement (tag) {
  return document.createElement(tag)
}

/**
 * Removes all children of an element
 *
 * @param {Node} element
 */
function removeChildren (element) {
  if (element.lastChild != null) {
    element.removeChild(element.lastChild)
  }
}

export { $, $$, createElement, removeChildren }
