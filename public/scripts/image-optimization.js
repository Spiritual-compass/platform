// IMAGE OPTIMIZATION - Responsive Images, Lazy Loading, Format Detection

class ImageOptimizer {
  constructor() {
    this.supportsWebP = null;
    this.init();
  }
  
  init() {
    // Check WebP support
    this.checkWebPSupport();
    
    // Set up lazy loading for images
    this.setupLazyLoading();
    
    // Optimize existing images
    this.optimizeExistingImages();
    
    // Add responsive image support
    this.addResponsiveImageSupport();
    
    // Track image performance
    this.trackImagePerformance();
    
    console.log('🖼️ Image Optimizer initialized');
  }
  
  // Check if browser supports WebP format
  checkWebPSupport() {
    const webp = new Image();
    webp.onload = webp.onerror = () => {
      this.supportsWebP = webp.height === 2;
      console.log('🖼️ WebP support:', this.supportsWebP);
    };
    webp.src = 'data:image/webp;base64,UklGRjoIAABXRUJQVlA4IC4IAADwAQCdASoBIAAIALEJaACdLoAA3AAA/uUAAA==';
  }
  
  // Set up native lazy loading with IntersectionObserver fallback
  setupLazyLoading() {
    // Use native lazy loading if available
    const images = document.querySelectorAll('img:not([loading])');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load image
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            
            // Add loaded class for fade-in effect
            img.classList.add('lazy-loaded');
            
            // Stop observing
            observer.unobserve(img);
            
            console.log('🖼️ Lazy loaded image:', img.src);
          }
        });
      }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      });
      
      // Observe all images with lazy loading
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback: load all images immediately
      document.querySelectorAll('img[data-src]').forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    }
  }
  
  // Optimize existing images on the page
  optimizeExistingImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add decoding attribute for better performance
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }
      
      // Add loading attribute for lazy loading
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      
      // Ensure images have alt text for accessibility
      if (!img.hasAttribute('alt')) {
        img.alt = this.generateAltText(img);
      }
      
      // Add intrinsic size hints if available
      if (img.naturalWidth && img.naturalHeight) {
        img.setAttribute('width', img.naturalWidth);
        img.setAttribute('height', img.naturalHeight);
      }
      
      // Add CSS for responsive images
      if (!img.style.maxWidth) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
      
      // Track image dimensions
      img.addEventListener('load', () => {
        console.log(`🖼️ Image loaded: ${img.src} (${img.naturalWidth}x${img.naturalHeight}px)`);
      });
    });
  }
  
  // Generate meaningful alt text for images
  generateAltText(img) {
    const filename = img.src.split('/').pop().split('.')[0];
    const parent = img.closest('figure, picture, div[class*="image"]');
    const caption = parent?.querySelector('figcaption, .caption')?.textContent;
    
    if (caption) return caption.trim();
    
    // Generate from filename
    return filename
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/[0-9]+/g, ''); // Remove numbers
  }
  
  // Add responsive image support with picture elements
  addResponsiveImageSupport() {
    const responsiveImages = document.querySelectorAll('img[data-responsive]');
    
    responsiveImages.forEach(img => {
      const src = img.src;
      const alt = img.alt;
      
      // Create picture element
      const picture = document.createElement('picture');
      
      // Create WebP source if browser supports it
      if (this.supportsWebP) {
        const webpSource = document.createElement('source');
        webpSource.srcset = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
      }
      
      // Create responsive sources for different screen sizes
      const sizes = ['1200w', '768w', '480w'];
      const formats = ['jpg', 'jpeg', 'png'];
      
      sizes.forEach(size => {
        const source = document.createElement('source');
        const baseUrl = src.substring(0, src.lastIndexOf('.'));
        const ext = src.substring(src.lastIndexOf('.') + 1);
        
        if (formats.includes(ext.toLowerCase())) {
          source.srcset = `${baseUrl}-${size}.${ext}`;
          source.media = `(max-width: ${size})`;
          picture.appendChild(source);
        }
      });
      
      // Create fallback img element
      const fallbackImg = document.createElement('img');
      fallbackImg.src = src;
      fallbackImg.alt = alt;
      fallbackImg.loading = 'lazy';
      fallbackImg.decoding = 'async';
      picture.appendChild(fallbackImg);
      
      // Replace original image with picture element
      img.replaceWith(picture);
    });
  }
  
  // Track image performance metrics
  trackImagePerformance() {
    if ('PerformanceObserver' in window) {
      try {
        // Track largest image that appears in Largest Contentful Paint
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.element && entry.element.tagName === 'IMG') {
              console.log('🖼️ LCP Image:', {
                url: entry.element.src,
                renderTime: entry.renderTime,
                loadTime: entry.loadTime,
                size: `${entry.naturalWidth}x${entry.naturalHeight}px`
              });
              
              // Track in analytics if available
              if (window.gtag) {
                window.gtag('event', 'image_performance', {
                  image_url: entry.element.src,
                  render_time: entry.renderTime,
                  load_time: entry.loadTime
                });
              }
            }
          }
        });
        
        observer.observe({entryTypes: ['largest-contentful-paint']});
      } catch (e) {
        console.log('🖼️ Performance monitoring not fully supported');
      }
    }
    
    // Track image loading errors
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        console.warn('🖼️ Image failed to load:', e.target.src);
        
        // Apply error state
        e.target.classList.add('image-error');
        e.target.title = 'Failed to load image';
        
        // Track in analytics
        if (window.gtag) {
          window.gtag('event', 'exception', {
            description: 'Image load failed: ' + e.target.src
          });
        }
      }
    }, true);
    
    // Monitor total image load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const images = document.querySelectorAll('img');
        let totalLoadTime = 0;
        let loadedCount = 0;
        
        images.forEach(img => {
          if (img.complete) {
            loadedCount++;
            const resource = performance.getEntriesByName(img.src)[0];
            if (resource) {
              totalLoadTime += resource.duration;
            }
          }
        });
        
        const avgLoadTime = loadedCount > 0 ? totalLoadTime / loadedCount : 0;
        console.log('🖼️ Image Performance Summary:', {
          totalImages: images.length,
          loadedImages: loadedCount,
          avgLoadTime: avgLoadTime.toFixed(2) + 'ms',
          totalLoadTime: totalLoadTime.toFixed(2) + 'ms'
        });
        
        // Track in analytics
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'image_load',
            value: Math.round(totalLoadTime)
          });
        }
      }, 0);
    });
  }
  
  // Create optimized image markup
  createOptimizedImage(src, alt, options = {}) {
    const {
      responsive = true,
      lazy = true,
      sizes = '100vw',
      className = ''
    } = options;
    
    if (responsive) {
      const picture = document.createElement('picture');
      
      // WebP source
      if (this.supportsWebP) {
        const webpSource = document.createElement('source');
        webpSource.srcset = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
      }
      
      // Fallback img
      const img = document.createElement('img');
      img.src = lazy ? '' : src;
      img.dataset.src = lazy ? src : img.src;
      img.alt = alt;
      img.sizes = sizes;
      img.className = className;
      img.loading = lazy ? 'lazy' : 'eager';
      img.decoding = 'async';
      
      picture.appendChild(img);
      return picture;
    } else {
      const img = document.createElement('img');
      img.src = lazy ? '' : src;
      img.dataset.src = lazy ? src : img.src;
      img.alt = alt;
      img.className = className;
      img.loading = lazy ? 'lazy' : 'eager';
      img.decoding = 'async';
      return img;
    }
  }
  
  // Get optimized image URL based on browser capabilities
  getOptimizedImageUrl(imagePath, width = null) {
    // Check if WebP is supported
    const ext = this.supportsWebP ? 'webp' : imagePath.split('.').pop();
    
    // Build optimized URL
    let optimizedUrl = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.' + ext);
    
    // Add width for responsive images
    if (width) {
      optimizedUrl = imagePath.replace(/\.(jpg|jpeg|png)$/i, `-${width}w.${ext}`);
    }
    
    return optimizedUrl;
  }
  
  // Preload critical images
  preloadCriticalImages(imagePaths = []) {
    imagePaths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
      
      console.log('🖼️ Preloaded critical image:', path);
    });
  }
}

// CSS for lazy loaded images
const style = document.createElement('style');
style.textContent = `
  /* Lazy loading styles */
  img[loading="lazy"] {
    transition: opacity 0.3s ease-in-out;
  }
  
  img[data-src] {
    opacity: 0;
  }
  
  img.lazy-loaded {
    opacity: 1;
  }
  
  /* Error state styles */
  img.image-error {
    opacity: 0.5;
    filter: grayscale(1);
    border: 2px solid #dc3545;
    border-radius: 4px;
  }
  
  /* Responsive image container */
  picture {
    display: block;
  }
  
  picture img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  /* Prevent layout shift from images */
  img {
    max-width: 100%;
    height: auto;
  }
`;
document.head.appendChild(style);

// Initialize image optimizer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
  });
} else {
  window.imageOptimizer = new ImageOptimizer();
}

// Expose methods globally for use by other scripts
window.createOptimizedImage = (src, alt, options) => {
  return window.imageOptimizer.createOptimizedImage(src, alt, options);
};

window.preloadCriticalImages = (paths) => {
  window.imageOptimizer.preloadCriticalImages(paths);
};

window.getOptimizedImageUrl = (path, width) => {
  return window.imageOptimizer.getOptimizedImageUrl(path, width);
};

console.log('🖼️ Image Optimization module loaded');