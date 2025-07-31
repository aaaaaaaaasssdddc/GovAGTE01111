// Service Worker for caching critical resources
const CACHE_NAME = 'correios-contrata-v1';
const CRITICAL_RESOURCES = [
    '/',
    '/static/css/custom.css',
    '/static/js/performance.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
];

// Install service worker and cache critical resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CRITICAL_RESOURCES.filter(url => !url.includes('cdn.tailwindcss.com')));
            })
            .catch(() => {
                // Fail silently if caching doesn't work
            })
    );
    self.skipWaiting();
});

// Activate service worker and clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Serve cached content when available
self.addEventListener('fetch', event => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests except critical ones
    if (!event.request.url.startsWith(self.location.origin) && 
        !CRITICAL_RESOURCES.includes(event.request.url)) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request).then(fetchResponse => {
                    // Cache successful responses
                    if (fetchResponse.status === 200) {
                        const responseClone = fetchResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return fetchResponse;
                });
            })
            .catch(() => {
                // Return a basic fallback for HTML requests
                if (event.request.headers.get('accept').includes('text/html')) {
                    return new Response(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Correios Contrata - Offline</title>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px;">
                            <h1 style="color: #1351B4;">Correios Contrata</h1>
                            <p>Conecte-se à internet para acessar o portal.</p>
                            <button onclick="location.reload()" style="
                                background: #1351B4;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">Tentar Novamente</button>
                        </body>
                        </html>
                    `, {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }
            })
    );
});