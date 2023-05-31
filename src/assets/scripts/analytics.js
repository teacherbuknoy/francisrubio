const { installAnalytics } = require('./library/analytics')

const analytics = installAnalytics('/.netlify/functions/analytics')
console.log(analytics)
analytics.logEvent('Site visit')