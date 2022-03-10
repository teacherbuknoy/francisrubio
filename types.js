/**
 * @callback TabEventCallback
 * @param {TabEvent} e the details of the event
 */

/**
 * @typedef {Object} TabEvent
 * @property {Tab} target the Tab object that raised the event
 * @property {TabControl} parent the TabControl object that the target belongs to
 * @property {Tab} hidden the Tab object that was hidden by this event
 * @property {Tab} shown the Tab object that was shown by this event
 */