const CACHE_NAME = "app-cache-v2";

// Install
self.addEventListener("install", (event) => {
  console.log("SW geïnstalleerd");
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("SW geactiveerd");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// Fetch (altijd nieuwste versie)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
