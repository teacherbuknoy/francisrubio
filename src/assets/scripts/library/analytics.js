const { v4: createUUID } = require('uuid')
const { OperatingSystem } = require('../utilities/operating-system')

const EVENT_KEYS = Object.freeze({
  SITE_VISIT: 'SITE_VISIT',
  SITE_LEAVE: 'SITE_LEAVE',
  NAVIGATE: 'NAVIGATE',
  CONFIG_CHANGE: 'CONFIG_CHANGE',
  DOWNLOAD: 'DOWNLOAD'
})

function installAnalytics(url = "http://localhost:8888") {
  const uuid = createUUID()
  let analyticsEvents = []
  let sendingAnalyticsData = false

  function __initialize() {

    window.addEventListener('pagehide', send)
    window.addEventListener('beforeunload', send)
    window.addEventListener('unload', send)
    window.addEventListener('visibilitychange', send)

    if (OperatingSystem.isIos())
      window.addEventListener("blur", send)

  }

  function send() {
    const data = JSON.stringify(analyticsEvents)

    if (!sendingAnalyticsData) {
      __sendBeacon(data)
    }
  }

  function __clearAnalytics() {
    analyticsEvents = []
    sendingAnalyticsData = false
    console.log("[ANALYTICS] Data sent and cleared from state")
  }

  function __sendBeacon(data) {
    if (analyticsEvents.length > 0) {
      console.log("[ANALYTICS] Sending analytics data")
      console.log(analyticsEvents)

      const beacon = window.navigator.sendBeacon(url, data)

      if (beacon) {
        __clearAnalytics()
        return
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(url, options)
        .then(response => response.text())
        .then(response => console.log(response))
        .catch(e => console.error(e))
        .finally(() => __clearAnalytics())
    } else {
      console.debug("[ANALYTICS] No event to send. Skipping.")
    }
  }

  function getCurrentDateTime() {
    let currentDate = new Date()
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' })
    return formatter.format(currentDate)
  }

  function __createEventDetails(eventType, customDataType, customData) {
    return {
      sessionId: uuid,
      eventType,
      createdAt: getCurrentDateTime(),
      device: OperatingSystem.getDevice(),
      userAgent: navigator.userAgent,
      dateTime: new Date().toISOString(),
      browser: OperatingSystem.getBrowser(),
      os: OperatingSystem.getName(),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      customDataType,
      customData,
      path:
        window.location.pathname == "/"
          ? window.location.pathname
          : window.location.pathname.replace(/\/$/, "")
    }
  }

  __initialize()

  return {
    createEventDetails: __createEventDetails,
    logEvent: /** @param {String} eventType  */ (eventType, customDataType, customData) => analyticsEvents.push(__createEventDetails(eventType, customDataType, customData)),
  }
}

export { installAnalytics, EVENT_KEYS as AnalyticsEvents }