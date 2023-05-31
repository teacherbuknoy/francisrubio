const { installAnalytics, AnalyticsEvents } = require('./library/analytics')

const analytics = installAnalytics('/.netlify/functions/analytics')

window.addEventListener('DOMContentLoaded', e => analytics.logEvent(AnalyticsEvents.SITE_VISIT))
window.addEventListener('beforeunload', e => analytics.logEvent(AnalyticsEvents.SITE_LEAVE))

document.addEventListener('click', e => {
  if (e.target.matches('a, a *')) {
    let link = document.createElement('a')
    link = e.target.closest('a')
    analytics.logEvent(AnalyticsEvents.NAVIGATE, 'URL', link.href)
  }
})