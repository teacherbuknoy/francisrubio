const { installAnalytics, AnalyticsEvents } = require('./library/analytics')

const analytics = installAnalytics('/.netlify/functions/analytics')

window.addEventListener('DOMContentLoaded', e => analytics.logEvent(AnalyticsEvents.SITE_VISIT))
window.addEventListener('beforeunload', e => analytics.logEvent(AnalyticsEvents.SITE_LEAVE))

document.addEventListener('click', e => {
  if (e.target.matches('a, a *')) {
    let link = document.createElement('a')
    link = e.target.closest('a')

    const url = link.href

    if (url.startsWith('mailto')) {
      analytics.logEvent(AnalyticsEvents.NAVIGATE, 'Email', url)
    }
    else if (url.startsWith('tel')) {
      analytics.logEvent(AnalyticsEvents.NAVIGATE, 'Phone', url)
    }
    else if (link.hasAttribute('download')) {
      analytics.logEvent(AnalyticsEvents.DOWNLOAD, 'URL', url)
    }
    else {
      analytics.logEvent(AnalyticsEvents.NAVIGATE, 'URL', url)
    }

  }

  if (e.target.matches('[data-dialog=modal__email], [data-dialog=modal__email] *')) {
    analytics.logEvent(AnalyticsEvents.NAVIGATE, 'Form', location.toString() + '#modal__email')
  }

  if (e.target.matches('[data-dialog=search-menu], [data-dialog=search-menu] *')) {
    analytics.logEvent(AnalyticsEvents.NAVIGATE, 'Search', location.toString() + '#search-menu')
  }
})

document.addEventListener('colorschemechange', e => {
  analytics.logEvent(AnalyticsEvents.CONFIG_CHANGE, 'Color Scheme', e.detail.colorScheme)
})