// src/serviceWorkerRegistration.js

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js') // Make sure /sw.js is at public root
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((err) => {
          console.error('SW registration failed:', err);
        });
    });
  } else {
    console.log('Service Worker or Push not supported in this browser.');
  }
}