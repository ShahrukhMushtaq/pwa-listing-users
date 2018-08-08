var staticCache = "app-cache-2";
var dynamicCache = "app-dyn-2";
var filesToAdd = [
    '/index.html',
    '/app.js',
    '/'
];
self.addEventListener('install', function (e) {
    console.log("Service Worker installed succesfully");
    e.waitUntil(
        caches.open(staticCache).then(function (cache) {
            console.log("Service Worker caches succesfully");
            return cache.addAll(filesToAdd);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== staticCache) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

self.addEventListener('fetch', function (e) {
    if (e.request.url.startsWith('https://api.github.com/users')) {
        caches.open(dynamicCache).then(function(cache){
            return fetch(e.request).then(function(res){
                cache.put(e.request , res.clone());
                return res;
            })
        })
    }
    else{
        e.respondWith(caches.match(e.request).then(function(res){
            return res || fetch(e.request);
        }));
    }
});