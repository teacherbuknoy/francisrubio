/** @type {NotificationManager} */
const notifications = window.notifications

notifications.addEventListener('shown', ({ title, message, type, timeoutMS }) => {
  posthog.capture('Notification shown', { title, message, type, timeoutMS })
  console.info('Notification shown', { title, message, type, timeoutMS })
})