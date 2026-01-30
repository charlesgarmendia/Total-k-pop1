// sw.js MEJORADO
const CACHE_VERSION = 'kpop-master-v1.1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  // Agrega aquí otros assets estáticos
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request).then(fetchResponse => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request.url, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});








