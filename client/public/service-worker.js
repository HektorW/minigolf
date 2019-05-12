self.addEventListener('push', onPush)
self.addEventListener('notificationclick', onNotificationClick)

function onPush(event) {
  event.waitUntil(
    (async () => {
      const match = await event.data.json()

      const { title, notificationOptions } = buildMatchNotification(match)

      return self.registration.showNotification(title, notificationOptions)
    })()
  )
}

function onNotificationClick(event) {
  const { notification } = event
  const notificationData = notification.data

  notification.close()

  const openUrlPromise = self.clients.openWindow('/')

  event.waitUntil(openUrlPromise)
}

function buildMatchNotification(match) {
  const { teamA, teamB } = match

  const title = `${teamA.name} [${teamA.score}] - ${teamB.name} [${
    teamB.score
  }]`

  const notificationOptions = {
    icon: '/images/logo.jpg',
    badge: '/images/soccer-ball-variant.png'
  }

  return { title, notificationOptions }
}
