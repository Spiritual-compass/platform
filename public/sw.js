// Service Worker for Spiritual Compass
// Provides offline functionality and performance improvements
// Version: 1.0.0 - March 1, 2026

const CACHE_NAME = 'spiritual-compass-v1.0.0';
const STATIC_CACHE = 'spiritual-compass-static-v1';
const DYNAMIC_CACHE = 'spiritual-compass-dynamic-v1';

// Define what to cache
const STATIC_ASSETS = [
  // Core pages
  '/',
  '/index.html',
  '/wisdom/',
  '/practices/',
  '/assessment/',
  '/traditions/',
  '/teachings/',
  '/about/',
  '/feedback/',
  '/contact/',
  
  // CSS files
  '/styles/main.css',
  '/styles/responsive.css',
  '/styles/accessibility.css',
  '/styles/forms.css',
  '/styles/components.css',
  '/styles/navigation.css',
  '/styles/footer.css',
  '/styles/wisdom.css',
  '/styles/practices.css',
  '/styles/assessment.css',
  '/styles/traditions.css',
  '/styles/teachings.css',
  '/styles/about.css',
  '/styles/feedback.css',
  '/styles/contact.css',
  '/styles/dark-mode.css',
  '/styles/interactive-compass.css',
  '/styles/cookie-consent.css',
  
  // JavaScript files
  '/scripts/main.js',
  '/scripts/navigation.js',
  '/scripts/forms.js',
  '/scripts/wisdom.js',
  '/scripts/practices.js',
  '/scripts/assessment.js',
  '/scripts/traditions.js',
  '/scripts/teachings.js',
  '/scripts/dark-mode.js',
  '/scripts/interactive-compass.js',
  '/scripts/cookie-consent.js',
  '/scripts/analytics.js',
  '/scripts/seo-enhancements.js',
  '/scripts/image-optimization.js',
  
  // Essential images
  '/images/logo.png',
  '/images/compass-bg.jpg',
  '/images/meditation-bg.jpg',
  '/images/wisdom-bg.jpg',
  '/images/compass-rose.svg',
  
  // Fonts (Google Fonts will be cached separately)
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap',
  
  // Offline fallback page
  '/offline.html'
];

// Network-first resources (dynamic content)
const NETWORK_FIRST_ROUTES = [
  '/feedback/',
  '/contact/',
  '/assessment/'
];

// Cache-first resources (static assets)
const CACHE_FIRST_ROUTES = [
  '/images/',
  '/styles/',
  '/scripts/',
  '/fonts/'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(err => {
        console.error('Service Worker: Error caching static assets', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old caches
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve cached content or fetch from network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip Google Analytics and other external tracking
  if (url.hostname.includes('google-analytics.com') || 
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('doubleclick.net')) {
    return;
  }
  
  event.respondWith(
    handleFetchRequest(request)
  );
});

// Main fetch handler with different strategies
async function handleFetchRequest(request) {
  const url = new URL(request.url);
  const isOriginRequest = url.origin === location.origin;
  
  try {
    // Strategy 1: Cache First (for static assets)
    if (isCacheFirstRoute(url.pathname)) {
      return await cacheFirstStrategy(request);
    }
    
    // Strategy 2: Network First (for dynamic content)
    if (isNetworkFirstRoute(url.pathname)) {
      return await networkFirstStrategy(request);
    }
    
    // Strategy 3: Stale While Revalidate (for pages)
    if (isOriginRequest) {
      return await staleWhileRevalidateStrategy(request);
    }
    
    // Strategy 4: Network Only (for external resources)
    return await fetch(request);
    
  } catch (error) {
    console.error('Service Worker: Fetch failed', error);
    return await getOfflineFallback(request);
  }
}

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    updateCacheInBackground(request);
    return cachedResponse;
  }
  
  // Not in cache, fetch and cache
  const networkResponse = await fetch(request);
  await addToCache(STATIC_CACHE, request, networkResponse.clone());
  
  return networkResponse;
}

// Network First Strategy - for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      await addToCache(DYNAMIC_CACHE, request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy - for pages
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  // Always try to update cache in background
  const networkResponsePromise = fetch(request)
    .then(response => {
      if (response.status === 200) {
        addToCache(DYNAMIC_CACHE, request, response.clone());
      }
      return response;
    })
    .catch(err => {
      console.warn('Service Worker: Network update failed', err);
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return await networkResponsePromise;
}

// Helper function to add items to cache
async function addToCache(cacheName, request, response) {
  if (response.status === 200) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  }
}

// Update cache in background
function updateCacheInBackground(request) {
  fetch(request)
    .then(response => {
      if (response.status === 200) {
        addToCache(STATIC_CACHE, request, response.clone());
      }
    })
    .catch(err => {
      // Silently fail - we already have cached version
    });
}

// Route classification helpers
function isCacheFirstRoute(pathname) {
  return CACHE_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

function isNetworkFirstRoute(pathname) {
  return NETWORK_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

// Offline fallback
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Try to get cached version first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // For navigation requests, serve offline page
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
  }
  
  // For images, return placeholder
  if (request.destination === 'image') {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" text-anchor="middle" fill="#666" font-family="Arial">Image not available offline</text></svg>',
      { 
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
  
  // Generic offline response
  return new Response(
    'You are offline. Please check your internet connection.',
    { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    }
  );
}

// Background sync for form submissions (when supported)
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-form-submit') {
    event.waitUntil(
      processBackgroundSync()
    );
  }
});

// Process background form submissions
async function processBackgroundSync() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingFormSubmissions();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch(form.url, {
          method: 'POST',
          headers: form.headers,
          body: form.body
        });
        
        if (response.ok) {
          // Remove from pending queue
          await removePendingFormSubmission(form.id);
          console.log('Service Worker: Background form submission successful');
        }
        
      } catch (error) {
        console.warn('Service Worker: Background form submission failed', error);
        // Keep in queue for next sync attempt
      }
    }
    
  } catch (error) {
    console.error('Service Worker: Background sync error', error);
  }
}

// IndexedDB operations for offline form storage
async function getPendingFormSubmissions() {
  // Simplified - would implement IndexedDB operations
  return [];
}

async function removePendingFormSubmission(id) {
  // Simplified - would implement IndexedDB operations
  return true;
}

// Push notification handler
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  
  const options = {
    body: data.body || 'New spiritual insight available',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Now'
      },
      {
        action: 'later',
        title: 'Remind Later'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Spiritual Compass',
      options
    )
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  const action = event.action;
  const url = event.notification.data.url || '/';
  
  if (action === 'explore') {
    event.waitUntil(
      clients.openWindow(url)
    );
  } else if (action === 'later') {
    // Schedule reminder (would integrate with notification API)
    console.log('Service Worker: Reminder scheduled');
  } else {
    // Default action
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Cache size management
self.addEventListener('message', event => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'GET_CACHE_SIZE':
        getCacheSize().then(size => {
          event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
        });
        break;
        
      case 'CLEAR_CACHE':
        clearCache().then(success => {
          event.ports[0].postMessage({ type: 'CACHE_CLEARED', success });
        });
        break;
        
      case 'UPDATE_CACHE':
        updateCache().then(success => {
          event.ports[0].postMessage({ type: 'CACHE_UPDATED', success });
        });
        break;
    }
  }
});

// Get cache size
async function getCacheSize() {
  let totalSize = 0;
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Clear all caches
async function clearCache() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    return true;
  } catch (error) {
    console.error('Service Worker: Error clearing cache', error);
    return false;
  }
}

// Force cache update
async function updateCache() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(STATIC_ASSETS);
    return true;
  } catch (error) {
    console.error('Service Worker: Error updating cache', error);
    return false;
  }
}

console.log('Service Worker: Script loaded successfully');