/* SPIRITUAL COMPASS - PERFORMANCE OPTIMIZATIONS */

document.addEventListener('DOMContentLoaded', function() {
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Prefetch critical resources on hover
    const criticalLinks = document.querySelectorAll('a[href="/assessment/"], a[href="#assessment"]');
    
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.dataset.prefetched) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = '/assessment/';
                document.head.appendChild(prefetchLink);
                this.dataset.prefetched = 'true';
            }
        }, { once: true });
    });
    
    // Font loading optimization
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1rem Inter'),
            document.fonts.load('600 1rem Inter'),
            document.fonts.load('400 1rem Crimson Text')
        ]).then(function() {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Service worker registration for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
    
    // Optimize quote rotation for better performance
    let quoteRotationTimer;
    
    function optimizedQuoteRotation() {
        // Only run if page is visible
        if (!document.hidden) {
            updateWisdomQuote();
        }
    }
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(quoteRotationTimer);
        } else {
            // Resume quote rotation when page becomes visible
            quoteRotationTimer = setInterval(optimizedQuoteRotation, 6 * 60 * 60 * 1000); // 6 hours
        }
    });
    
    // Debounced scroll handling for better performance
    let ticking = false;
    
    function updateOnScroll() {
        // Batch DOM reads and writes
        requestAnimationFrame(function() {
            const scrollTop = window.pageYOffset;
            const nav = document.querySelector('.nav');
            
            // Only update if scroll position significantly changed
            if (scrollTop > 100 && !nav.classList.contains('scrolled')) {
                nav.classList.add('scrolled');
            } else if (scrollTop <= 100 && nav.classList.contains('scrolled')) {
                nav.classList.remove('scrolled');
            }
            
            ticking = false;
        });
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            ticking = true;
            updateOnScroll();
        }
    }, { passive: true });
    
    // Preload critical CSS
    const criticalCSS = [
        '/styles/assessment.css'
    ];
    
    criticalCSS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Optimize animations for reduced battery usage
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            if (battery.level < 0.2) {
                document.body.classList.add('low-battery');
            }
        });
    }
    
    // Memory cleanup on page unload
    window.addEventListener('beforeunload', function() {
        // Clean up any intervals or timeouts
        if (quoteRotationTimer) {
            clearInterval(quoteRotationTimer);
        }
        
        // Clean up observers
        if (imageObserver) {
            imageObserver.disconnect();
        }
    });
    
    // Progressive enhancement for modern browsers
    if (window.CSS && CSS.supports('backdrop-filter', 'blur(10px)')) {
        document.body.classList.add('supports-backdrop-filter');
    }
    
    if (window.CSS && CSS.supports('scroll-behavior', 'smooth')) {
        document.body.classList.add('supports-smooth-scroll');
    }
});