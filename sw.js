const CACHE_NAME = "app-cache-v2";

// Install → nieuwe service worker meteen activeren
self.addEventListener("install", (event) => {
  console.log("Service Worker geïnstalleerd");
  self.skipWaiting();
});

// Activate → oude cache verwijderen
self.addEventListener("activate", (event) => {
  console.log("Service Worker geactiveerd");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Oude cache verwijderd:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch → altijd eerst netwerk, fallback naar cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
