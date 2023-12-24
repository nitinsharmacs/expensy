const CACHE_NAME = 'CASHFLOW';

self.addEventListener('install', (e) => {
  console.log('Installing Service Worker');
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(['/']).then(() => self.skipWaiting()))
  );
});

self.addEventListener('activate', (e) => {
  console.log('Activating Service Worker');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const req = e.request.clone();

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        const cacheRes = res.clone();

        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, cacheRes));

        return res;
      })
      .catch(() =>
        caches.match(e.request).then((response) => {
          if (response) {
            return response;
          }
        })
      )
  );
});
