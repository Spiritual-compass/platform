// SEO ENHANCEMENTS - Structured Data & Dynamic Meta Tags

class SEOManager {
  constructor() {
    this.baseUrl = 'https://spiritual-compass.com';
    this.init();
  }
  
  init() {
    // Add structured data to pages
    this.addStructuredData();
    
    // Enhance meta tags dynamically
    this.enhanceMetaTags();
    
    // Add breadcrumb data
    this.addBreadcrumbData();
    
    // Track page performance
    this.trackPagePerformance();
  }
  
  addStructuredData() {
    const currentPath = window.location.pathname;
    
    // Base Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": this.baseUrl + "/#organization",
      "name": "Spiritual Compass",
      "alternateName": ["Spiritual Direction", "Multi-faith Guidance"],
      "url": this.baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": this.baseUrl + "/images/compass-icon.svg",
        "width": "400",
        "height": "400"
      },
      "description": "A comprehensive platform for spiritual exploration across multiple religious and philosophical traditions, offering guidance, wisdom, and practices for seekers on their sacred journey.",
      "keywords": ["spirituality", "meditation", "wisdom", "interfaith", "spiritual guidance", "religious exploration", "mindfulness", "personal growth"],
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@spiritual-compass.com",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://spiritual-compass.com/about",
        "https://spiritual-compass.com/teachings"
      ]
    };
    
    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": this.baseUrl + "/#website",
      "url": this.baseUrl,
      "name": "Spiritual Compass",
      "description": "Find your sacred direction through multi-faith spiritual wisdom and practices",
      "publisher": {
        "@id": this.baseUrl + "/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": this.baseUrl + "/wisdom?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 6,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Spiritual Assessment",
            "description": "Discover your spiritual path across multiple traditions",
            "url": this.baseUrl + "/assessment"
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "name": "Daily Wisdom",
            "description": "Curated spiritual insights from various traditions",
            "url": this.baseUrl + "/wisdom"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Meditation Practices",
            "description": "Guided meditation and spiritual practices",
            "url": this.baseUrl + "/practices"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Sacred Teachings",
            "description": "Profound teachings from spiritual masters",
            "url": this.baseUrl + "/teachings"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "About Us",
            "description": "Our mission and approach to spiritual guidance",
            "url": this.baseUrl + "/about"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Contact",
            "description": "Get in touch with our spiritual guidance team",
            "url": this.baseUrl + "/contact"
          }
        ]
      }
    };
    
    // Page-specific schema based on current path
    let pageSchema = {};
    
    if (currentPath === '/' || currentPath === '/index.html') {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": this.baseUrl + "/#webpage",
        "url": this.baseUrl,
        "name": "Spiritual Compass - Find Your Sacred Direction",
        "description": "Discover your spiritual path across multiple traditions with our comprehensive spiritual assessment, daily wisdom, meditation practices, and sacred teachings from various faiths.",
        "isPartOf": {
          "@id": this.baseUrl + "/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Spiritual Guidance and Multi-faith Exploration"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Spiritual Tools and Resources",
          "description": "Comprehensive spiritual guidance tools including assessment, wisdom, practices, and teachings"
        }
      };
    }
    
    else if (currentPath.includes('/assessment')) {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": ["WebPage", "Quiz"],
        "@id": this.baseUrl + "/assessment#webpage",
        "url": this.baseUrl + "/assessment",
        "name": "Spiritual Assessment - Discover Your Path",
        "description": "Take our comprehensive spiritual assessment to discover which religious or spiritual tradition aligns most closely with your beliefs and values.",
        "isPartOf": {
          "@id": this.baseUrl + "/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Spiritual Path Assessment and Discovery"
        },
        "educationalLevel": "All levels",
        "timeRequired": "PT10M",
        "interactivityType": "active",
        "learningResourceType": "assessment tool"
      };
    }
    
    else if (currentPath.includes('/wisdom')) {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": this.baseUrl + "/wisdom#webpage",
        "url": this.baseUrl + "/wisdom",
        "name": "Daily Wisdom - Spiritual Insights",
        "description": "Discover curated spiritual wisdom from multiple traditions including Buddhism, Christianity, Islam, Hinduism, Judaism, and more.",
        "isPartOf": {
          "@id": this.baseUrl + "/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Daily Spiritual Wisdom and Quotes"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Spiritual Wisdom Collection",
          "description": "Curated quotes and insights from spiritual masters across traditions"
        }
      };
    }
    
    else if (currentPath.includes('/practices')) {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": this.baseUrl + "/practices#webpage", 
        "url": this.baseUrl + "/practices",
        "name": "Meditation & Spiritual Practices",
        "description": "Explore meditation techniques and spiritual practices from various traditions to deepen your spiritual journey.",
        "isPartOf": {
          "@id": this.baseUrl + "/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Meditation and Spiritual Practices"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Spiritual Practice Collection",
          "description": "Guided meditation and spiritual practices from multiple traditions"
        }
      };
    }
    
    else if (currentPath.includes('/teachings')) {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": this.baseUrl + "/teachings#webpage",
        "url": this.baseUrl + "/teachings", 
        "name": "Sacred Teachings - Spiritual Masters",
        "description": "Profound spiritual teachings and insights from masters across different religious and philosophical traditions.",
        "isPartOf": {
          "@id": this.baseUrl + "/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Sacred Teachings and Spiritual Wisdom"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Sacred Teachings Collection",
          "description": "Teachings from spiritual masters across traditions"
        }
      };
    }
    
    // Combine all schemas
    const combinedSchemas = {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, websiteSchema, pageSchema].filter(schema => Object.keys(schema).length > 0)
    };
    
    // Insert structured data into page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(combinedSchemas, null, 2);
    document.head.appendChild(script);
    
    console.log('📊 SEO: Structured data added for', currentPath);
  }
  
  enhanceMetaTags() {
    const currentPath = window.location.pathname;
    
    // Enhanced meta descriptions based on page
    const metaDescriptions = {
      '/': 'Discover your spiritual path with our comprehensive multi-faith platform. Explore wisdom from Buddhism, Christianity, Islam, Hinduism, Judaism and more. Take our spiritual assessment to find your sacred direction.',
      '/assessment': 'Take our free spiritual assessment to discover which religious or spiritual tradition aligns with your beliefs. Explore Christianity, Buddhism, Islam, Hinduism, Judaism, and secular spirituality.',
      '/wisdom': 'Daily spiritual wisdom and quotes from masters across all traditions. Find inspiration from Buddha, Jesus, Rumi, Gandhi, and other enlightened teachers. Updated daily with fresh insights.',
      '/practices': 'Learn meditation and spiritual practices from multiple traditions. Guided mindfulness, prayer techniques, breathing exercises, and contemplative practices for spiritual growth.',
      '/teachings': 'Profound spiritual teachings from masters across traditions. Explore the deepest wisdom of Christianity, Buddhism, Islam, Hinduism, Judaism, and mystical traditions.',
      '/about': 'Learn about our mission to provide authentic spiritual guidance across multiple religious and philosophical traditions. Discover our interfaith approach to spiritual exploration.'
    };
    
    // Enhanced keywords based on page
    const metaKeywords = {
      '/': 'spiritual compass, multi-faith guidance, spiritual assessment, religious exploration, interfaith spirituality, spiritual path, sacred direction, meditation, wisdom, spiritual growth',
      '/assessment': 'spiritual assessment, spiritual quiz, find your religion, spiritual path test, interfaith assessment, spiritual compatibility, religious quiz, spiritual direction',
      '/wisdom': 'daily wisdom, spiritual quotes, religious quotes, Buddha quotes, Jesus quotes, Rumi quotes, spiritual inspiration, interfaith wisdom, daily spirituality',
      '/practices': 'meditation practice, spiritual practices, mindfulness meditation, prayer techniques, contemplative practice, spiritual exercises, breathing techniques, interfaith meditation',
      '/teachings': 'spiritual teachings, religious teachings, sacred wisdom, spiritual masters, mystical teachings, interfaith teachings, spiritual philosophy, sacred texts',
      '/about': 'about spiritual compass, interfaith approach, spiritual guidance team, multi-faith spirituality, religious inclusivity, spiritual mission'
    };
    
    // Update meta description if it exists
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescriptions[currentPath]) {
      metaDescription.setAttribute('content', metaDescriptions[currentPath]);
    } else if (!metaDescription && metaDescriptions[currentPath]) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', metaDescriptions[currentPath]);
      document.head.appendChild(metaDescription);
    }
    
    // Add or update keywords meta
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (metaKeywordsTag && metaKeywords[currentPath]) {
      metaKeywordsTag.setAttribute('content', metaKeywords[currentPath]);
    } else if (!metaKeywordsTag && metaKeywords[currentPath]) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords');
      metaKeywordsTag.setAttribute('content', metaKeywords[currentPath]);
      document.head.appendChild(metaKeywordsTag);
    }
    
    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = this.baseUrl + currentPath;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    
    // Add hreflang for international SEO (English primary)
    let hreflangLink = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!hreflangLink) {
      hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', 'en');
      hreflangLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(hreflangLink);
    }
    
    // Add robots meta for indexing control
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      document.head.appendChild(robotsMeta);
    }
    
    // Add author meta
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      authorMeta.setAttribute('content', 'Spiritual Compass Team');
      document.head.appendChild(authorMeta);
    }
    
    console.log('📊 SEO: Enhanced meta tags for', currentPath);
  }
  
  addBreadcrumbData() {
    const currentPath = window.location.pathname;
    
    // Generate breadcrumb structure
    const pathSegments = currentPath.split('/').filter(segment => segment);
    const breadcrumbs = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": this.baseUrl
    }];
    
    let currentUrl = this.baseUrl;
    pathSegments.forEach((segment, index) => {
      currentUrl += '/' + segment;
      const displayName = this.getDisplayNameForSegment(segment);
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": displayName,
        "item": currentUrl
      });
    });
    
    if (breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
      document.head.appendChild(script);
      
      console.log('📊 SEO: Breadcrumb data added');
    }
  }
  
  getDisplayNameForSegment(segment) {
    const displayNames = {
      'assessment': 'Spiritual Assessment',
      'wisdom': 'Daily Wisdom',
      'practices': 'Meditation Practices',
      'teachings': 'Sacred Teachings',
      'about': 'About Us',
      'contact': 'Contact',
      'privacy-policy': 'Privacy Policy',
      'terms': 'Terms of Service'
    };
    
    return displayNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  }
  
  trackPagePerformance() {
    // Track Core Web Vitals for SEO
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('📊 SEO: LCP:', entry.startTime, 'ms');
            
            // Track in analytics if available
            if (window.gtag) {
              window.gtag('event', 'web_vital', {
                name: 'LCP',
                value: Math.round(entry.startTime),
                event_category: 'Performance'
              });
            }
          }
        }
      }).observe({entryTypes: ['largest-contentful-paint']});
      
      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fid = entry.processingStart - entry.startTime;
            console.log('📊 SEO: FID:', fid, 'ms');
            
            if (window.gtag) {
              window.gtag('event', 'web_vital', {
                name: 'FID',
                value: Math.round(fid),
                event_category: 'Performance'
              });
            }
          }
        }
      }).observe({entryTypes: ['first-input']});
      
      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        
        console.log('📊 SEO: CLS:', clsValue);
        
        if (window.gtag) {
          window.gtag('event', 'web_vital', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Performance'
          });
        }
      }).observe({entryTypes: ['layout-shift']});
    }
    
    // Track page load timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          const loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
          const domContentLoaded = navTiming.domContentLoadedEventEnd - navTiming.fetchStart;
          
          console.log('📊 SEO: Page Load Time:', loadTime, 'ms');
          console.log('📊 SEO: DOM Content Loaded:', domContentLoaded, 'ms');
          
          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: 'load',
              value: Math.round(loadTime)
            });
            
            window.gtag('event', 'timing_complete', {
              name: 'dom_content_loaded',
              value: Math.round(domContentLoaded)
            });
          }
        }
      }, 0);
    });
  }
  
  // Method to update page title dynamically for SPA-like behavior
  updatePageTitle(newTitle, newDescription = null) {
    document.title = newTitle;
    
    if (newDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', newDescription);
      }
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', newTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && newDescription) {
      ogDescription.setAttribute('content', newDescription);
    }
    
    console.log('📊 SEO: Title and meta tags updated');
  }
}

// Initialize SEO manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.seoManager = new SEOManager();
  
  // Expose methods globally for use by other scripts
  window.updatePageSEO = (title, description) => {
    window.seoManager.updatePageTitle(title, description);
  };
  
  console.log('📊 SEO Manager initialized');
});

// Add resource hints for performance
document.addEventListener('DOMContentLoaded', () => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
  
  // DNS prefetch for analytics (if enabled)
  const dnsPrefetchDomains = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com'
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
  
  console.log('📊 SEO: Resource hints added');
});

console.log('📊 SEO Enhancement module loaded');