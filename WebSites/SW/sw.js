const version = 'v2';

self.addEventListener('install', function (event) {
    console.log('SW %s Installed at', version, new Date().toLocaleDateString());
    //self.skipWaiting();

    event.waitUntil(
        caches.open(version)
            .then(function (cache) {
                return cache.addAll([
                    '/Content/bootstrap.css',
                    '/Content/Site.cs'
                ]);
            }));


});

self.addEventListener('activate', function (event) {
    console.log('SW %s Activated at', version, new Date().toLocaleDateString());

    //2. Delete older version of cache
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.filter(function (key) {
                    return key !== version;
                }).map(function (key) {
                    return caches.delete(key);
                }));
            }));
});

self.addEventListener('fetch', function (event) {

    //1
    /*
    if (!navigator.onLine) {
        event.respondWith(
            new Response('<h1> Offline :( </h1>', { headers: { 'Content-Type': 'text/html' } })
        );
    } else {
        console.log(event.request.url);
        // This will make sure request goto SW and it will make the server request.
        event.respondWith(fetch(event.request));
    }
    */

    //2
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                if (res) {
                    return res;
                }

                if (!navigator.onLine) {
                    return caches.match(new Request(''));
                }

                return fetch(event.request);
            }));
});