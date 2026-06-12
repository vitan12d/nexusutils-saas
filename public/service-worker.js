// Service Worker configuration for Koora Goal Alert Push Notifications

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen to push notifications from Firebase / OneSignal push triggers
self.addEventListener('push', (event) => {
  let payload = {
    title: 'GOAL! Live Matches Alert',
    body: 'An unexpected goal was just scored. Click to view live commentary!',
    icon: '/assets/icon.png',
    data: { url: '/' }
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: payload.icon || '/assets/icon.png',
    badge: '/assets/icon.png',
    vibrate: [200, 100, 200],
    data: payload.data || { url: '/' },
    actions: [
      { action: 'view', title: '🔴 Watch Live Score' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// React on push notification touch click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
