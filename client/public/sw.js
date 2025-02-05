// public/sw.js

// Listen for the 'push' event
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    // Show a notification
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icons/icon-192.png',
      })
    );
  }
});

// Optional: Listen for notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // e.g., open your homepage
  );
});