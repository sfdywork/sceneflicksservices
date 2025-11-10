const CACHE_NAME = 'sceneflicks-cache-v1';
const urlsToCache = [
  '/sceneflicksservices/index.html',
  '/sceneflicksservices/pages/about.html',
  '/sceneflicksservices/pages/clints.html',
  '/sceneflicksservices/pages/contacts.html',
  '/sceneflicksservices/pages/gallery.html',
  '/sceneflicksservices/pages/services.html',
  '/sceneflicksservices/assets/js/main.js',
  '/sceneflicksservices/assets/js/components-loader.js',
  '/sceneflicksservices/assets/css/about.css',
  '/sceneflicksservices/assets/css/clients.css',
  '/sceneflicksservices/assets/css/contact.css',
  '/sceneflicksservices/assets/css/gallery.css',
  '/sceneflicksservices/assets/css/services.css',
  '/sceneflicksservices/assets/css/style.css',
  '/sceneflicksservices/assets/images/logo/sceneflickslogo.png'
  // Add more files you want cached
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
