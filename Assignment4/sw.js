//self.importScripts('main.js');

// Files to cache
var cacheName = 'Assignment3';
var filesToCache = [
  '/TransportApp/Assignment3/index.html',
  '/TransportApp/Assignment3/main.js',
  '/TransportApp/Assignment3/bulma.mini.css',
  '/TransportApp/Assignment3/images/',
  '/TransportApp/Assignment3/images/Train.jpeg',
  '/TransportApp/Assignment3/icons/',
  '/TransportApp/Assignment3/icons/back.png',
  '/TransportApp/Assignment3/icons/blo.png',
  '/TransportApp/Assignment3/icons/bus.png',
  '/TransportApp/Assignment3/icons/car.jpeg',
  '/TransportApp/Assignment3/icons/favourites.png',
  '/TransportApp/Assignment3/icons/home.png',
  '/TransportApp/Assignment3/icons/loading.png',
  '/TransportApp/Assignment3/icons/map.png',
  '/TransportApp/Assignment3/icons/menu.png',
  '/TransportApp/Assignment3/icons/taxi.jpeg',
  '/TransportApp/Assignment3/icons/train.png',
  '/TransportApp/Assignment3/icons/work.png',
];

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});