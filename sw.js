// Beyond1 Admin Service Worker v3 - cache buster
const CACHE_NAME = 'beyond1-admin-v3';

// On install - skip waiting immediately
self.addEventListener('install', event => {
  self.skipWaiting();
});

// On activate - delete ALL old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch - always go to network, no caching
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Only fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return fetch('/beyond1-admin.html');
      }
    })
  );
});
