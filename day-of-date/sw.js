const cacheName = 'DOD-v1';
const staticAssets = [
  '/img/build.svg',
  '/img/calendar.ico',
  '/img/calendar.png',
  '/img/hero-img.svg',
  '/index.html',
  '/css/bootstrap.min.css',
  '/js/bootstrap.bundle.min.js',
  '/js/day-of-date.js'
];

addEventListener('install', e => {
  e.waitUntil(
      caches.open(cacheName).then(cache => {
          return cache.addAll(staticAssets);
      })
  );
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async() => {
  
      const cache = await caches.open(cacheName);
  
      try {
          const cachedResponse = await cache.match(event.request);
          if(cachedResponse) {
              console.log('cachedResponse: ', event.request.url);
              return cachedResponse;
          }
  
          const fetchResponse = await fetch(event.request);
          if(fetchResponse) {
              console.log('fetchResponse: ', event.request.url);
              await cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
          }
      }   catch (error) {
          console.log('Fetch failed: ', error);
          return cachedResponse;
      }
    })());
  });

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
