// Incrementa este número (v1.1, v1.26, etc.) cada vez que hagas un cambio en el HTML/CSS
const CACHE_NAME = 'total-kpop-v1.1';
const assets = [
  '/',
  '/index.html',
  // Añade aquí otros archivos locales como iconos si los tienes
];

// Instalación: Limpia el caché viejo automáticamente
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activación: Borra versiones antiguas de caché para liberar espacio
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia: Network First (Prioriza internet para ver noticias nuevas)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});







