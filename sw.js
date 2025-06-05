/**
 * Wazambi Fleet Tracker PRO - Advanced Service Worker
 * Version: 1.0.0
 * Engineered for maximum performance on Render free tier
 * Features:
 * - Intelligent resource caching
 * - Dynamic cache management
 * - Network request optimization
 * - Background sync
 * - Offline support
 * - Resource prefetching
 * - Smart cache invalidation
 */

const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `wazambi-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `wazambi-dynamic-${CACHE_VERSION}`;
const IMMUTABLE_CACHE = `wazambi-immutable-${CACHE_VERSION}`;
const API_CACHE = `wazambi-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `wazambi-images-${CACHE_VERSION}`;
const MODEL_CACHE = `wazambi-3d-${CACHE_VERSION}`;

// Cache time limits
const CACHE_TIMES = {
    short: 60 * 60, // 1 hour
    medium: 24 * 60 * 60, // 1 day
    long: 7 * 24 * 60 * 60, // 1 week
    eternal: 365 * 24 * 60 * 60 // 1 year
};

// Resources to precache
const PRECACHE_RESOURCES = {
    essential: [
        '/',
        '/index.html',
        '/main.css',
        '/main.js',
        '/images/wazambi.png',
        '/images/brand-logo-1.png',
        '/images/brand-logo-2.png',
        '/images/brand-logo-3.png',
        '/images/brand-logo-4.png'
    ],
    fonts: [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css'
    ],
    scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollToPlugin.min.js',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    ],
    styles: [
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    ]
};

// Advanced caching strategies
const CACHING_STRATEGIES = {
    networkFirst: async (request, cacheName, timeout = 3000) => {
        // Don't cache POST requests or partial responses
        if (request.method === 'POST' || request.headers.get('range')) {
            return fetch(request);
        }

        try {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), timeout)
            );
            const networkPromise = fetch(request.clone());
            
            try {
                const networkResponse = await Promise.race([networkPromise, timeoutPromise]);
                // Only cache successful responses
                if (networkResponse.ok) {
                    const cache = await caches.open(cacheName);
                    cache.put(request, networkResponse.clone());
                }
                return networkResponse;
            } catch (error) {
                const cachedResponse = await caches.match(request);
                return cachedResponse || Promise.reject('No cached data found');
            }
        } catch (error) {
            return caches.match('/offline.html');
        }
    },

    cacheFirst: async (request, cacheName) => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Validate cache freshness
            const headers = cachedResponse.headers;
            const cacheTime = headers.get('sw-cache-time');
            if (cacheTime && !isCacheStale(cacheTime, CACHE_TIMES.medium)) {
                return cachedResponse;
            }
        }

        try {
            const networkResponse = await fetch(request.clone());
            const cache = await caches.open(cacheName);
            
            // Add cache timestamp
            const response = new Response(networkResponse.body, {
                headers: {
                    ...networkResponse.headers,
                    'sw-cache-time': Date.now().toString()
                }
            });
            
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            return cachedResponse || Promise.reject('Network error');
        }
    },

    staleWhileRevalidate: async (request, cacheName) => {
        const cachedResponse = await caches.match(request);
        
        const networkPromise = fetch(request.clone()).then(async (networkResponse) => {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        });

        return cachedResponse || networkPromise;
    }
};

// Resource type detection
const getResourceType = (request) => {
    const url = new URL(request.url);
    
    if (request.destination === 'image') return 'image';
    if (url.pathname.endsWith('.js')) return 'script';
    if (url.pathname.endsWith('.css')) return 'style';
    if (url.pathname.endsWith('.woff2') || url.pathname.endsWith('.woff')) return 'font';
    if (url.pathname.includes('api')) return 'api';
    if (url.pathname.includes('three')) return 'three';
    
    return 'other';
};

// Cache management
const manageCache = async (cacheName, maxItems = 100) => {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        const itemsToDelete = keys.length - maxItems;
        const oldestKeys = keys.slice(0, itemsToDelete);
        await Promise.all(oldestKeys.map(key => cache.delete(key)));
    }
};

// Intelligent request routing
const routeRequest = async (request) => {
    const resourceType = getResourceType(request);
    
    switch (resourceType) {
        case 'image':
            return CACHING_STRATEGIES.cacheFirst(request, IMAGE_CACHE);
        case 'script':
            return CACHING_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE);
        case 'style':
            return CACHING_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE);
        case 'font':
            return CACHING_STRATEGIES.cacheFirst(request, IMMUTABLE_CACHE);
        case 'api':
            return CACHING_STRATEGIES.networkFirst(request, API_CACHE);
        case 'three':
            return CACHING_STRATEGIES.staleWhileRevalidate(request, MODEL_CACHE);
        default:
            return CACHING_STRATEGIES.networkFirst(request, DYNAMIC_CACHE);
    }
};

// Background sync for offline actions
const registerSync = async () => {
    try {
        await self.registration.sync.register('offline-sync');
    } catch (error) {
        console.error('Background sync registration failed:', error);
    }
};

// Resource prefetching
const prefetchResources = async () => {
    const cache = await caches.open(STATIC_CACHE);
    
    // Prefetch essential resources
    await Promise.all([
        ...PRECACHE_RESOURCES.essential,
        ...PRECACHE_RESOURCES.fonts,
        ...PRECACHE_RESOURCES.scripts,
        ...PRECACHE_RESOURCES.styles
    ].map(url => 
        cache.add(url).catch(error => 
            console.warn(`Failed to cache: ${url}`, error)
        )
    ));
};

// Cache cleanup
const cleanupCaches = async () => {
    const keys = await caches.keys();
    const validCaches = [
        STATIC_CACHE, 
        DYNAMIC_CACHE, 
        IMMUTABLE_CACHE, 
        API_CACHE, 
        IMAGE_CACHE,
        MODEL_CACHE
    ];
    
    return Promise.all(
        keys.map(key => {
            if (!validCaches.includes(key)) {
                return caches.delete(key);
            }
        })
    );
};

// Helper functions
const isCacheStale = (cacheTime, maxAge) => {
    return Date.now() - parseInt(cacheTime) > maxAge * 1000;
};

// Service Worker Event Handlers
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            prefetchResources(),
            self.skipWaiting()
        ])
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            cleanupCaches(),
            self.clients.claim()
        ])
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(routeRequest(event.request));
});

self.addEventListener('sync', event => {
    if (event.tag === 'offline-sync') {
        event.waitUntil(syncOfflineData());
    }
});

// Performance monitoring
const performanceMetrics = {
    cacheHits: 0,
    cacheMisses: 0,
    averageResponseTime: 0,
    totalRequests: 0
};

// Periodic cache maintenance
setInterval(() => {
    Promise.all([
        manageCache(DYNAMIC_CACHE),
        manageCache(IMAGE_CACHE),
        manageCache(API_CACHE)
    ]);
}, 24 * 60 * 60 * 1000); // Run daily

// Export performance metrics
self.addEventListener('message', event => {
    if (event.data === 'getMetrics') {
        event.ports[0].postMessage(performanceMetrics);
    }
}); 