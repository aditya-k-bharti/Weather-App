/* ============================================================
   Weather App — Service Worker (Phase D: PWA)
   Caches app shell for offline use; passes API calls through.
   ============================================================ */

const CACHE = 'weather-app-v1';
const SHELL = [
  './',
  './index.html',
  './Weather.css',
  './Weather.js',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
  'https://cdn.tailwindcss.com'
];

// Install: pre-cache shell assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: shell from cache, API from network with cache fallback
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Always go network-first for weather APIs
  if (url.includes('open-meteo.com') || url.includes('nominatim.openstreetmap.org') || url.includes('api.anthropic.com')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Cache successful GET API responses
          if (res.ok && e.request.method === 'GET') {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request)) // fallback to cached API response
    );
    return;
  }

  // Shell: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});