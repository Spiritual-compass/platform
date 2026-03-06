// ANALYTICS TRACKING - GDPR Compliant Google Analytics 4

class AnalyticsManager {
  constructor() {
    this.gaTrackingId = 'G-XXXXXXXXXX'; // Will need actual GA4 tracking ID
    this.isAnalyticsEnabled = false;
    this.init();
  }
  
  init() {
    // Wait for cookie consent before initializing analytics
    this.checkCookieConsent();
    
    // Listen for consent changes
    document.addEventListener('cookieConsentChanged', (e) => {
      if (e.detail.analytics) {
        this.enableAnalytics();
      } else {
        this.disableAnalytics();
      }
    });
  }
  
  checkCookieConsent() {
    // Check if user has consented to analytics cookies
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const consentData = JSON.parse(consent);
      if (consentData.analytics) {
        this.enableAnalytics();
      }
    }
  }
  
  enableAnalytics() {
    if (this.isAnalyticsEnabled) return;
    
    // Load Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}`;
    document.head.appendChild(script1);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', this.gaTrackingId, {
      anonymize_ip: true,
      cookie_flags: 'secure;samesite=strict',
      page_title: document.title,
      page_location: window.location.href
    });
    
    // Make gtag globally available
    window.gtag = gtag;
    
    this.isAnalyticsEnabled = true;
    
    // Track initial page view
    this.trackPageView();
    
    // Set up automatic tracking
    this.setupAutoTracking();
    
    console.log('📊 Analytics enabled with consent');
  }
  
  disableAnalytics() {
    if (!this.isAnalyticsEnabled) return;
    
    // Disable Google Analytics tracking
    window['ga-disable-' + this.gaTrackingId] = true;
    
    this.isAnalyticsEnabled = false;
    console.log('📊 Analytics disabled');
  }
  
  trackPageView(page = null) {
    if (!this.isAnalyticsEnabled || !window.gtag) return;
    
    const pageData = {
      page_title: document.title,
      page_location: page || window.location.href,
      page_path: page || window.location.pathname
    };
    
    window.gtag('config', this.gaTrackingId, pageData);
    window.gtag('event', 'page_view', pageData);
    
    console.log('📊 Page view tracked:', pageData.page_path);
  }
  
  trackEvent(eventName, parameters = {}) {
    if (!this.isAnalyticsEnabled || !window.gtag) return;
    
    // Add default parameters
    const eventData = {
      page_path: window.location.pathname,
      page_title: document.title,
      timestamp: Date.now(),
      ...parameters
    };
    
    window.gtag('event', eventName, eventData);
    console.log('📊 Event tracked:', eventName, eventData);
  }
  
  setupAutoTracking() {
    // Track meditation exercise interactions
    document.addEventListener('click', (e) => {
      if (e.target.matches('.practice-card .btn')) {
        const practiceCard = e.target.closest('.practice-card');
        const practiceTitle = practiceCard.querySelector('h3')?.textContent || 'Unknown';
        
        this.trackEvent('meditation_exercise_start', {
          exercise_name: practiceTitle.trim(),
          exercise_category: 'meditation'
        });
      }
      
      // Track assessment button
      if (e.target.matches('.btn[href*="assessment"]') || e.target.textContent.includes('Assessment')) {
        this.trackEvent('assessment_start', {
          source_page: window.location.pathname
        });
      }
      
      // Track external links
      if (e.target.matches('a[href^="http"]') && !e.target.href.includes('spiritual-compass.com')) {
        this.trackEvent('external_link_click', {
          link_url: e.target.href,
          link_text: e.target.textContent.trim()
        });
      }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        this.trackEvent('scroll_depth', {
          scroll_percentage: scrollPercent,
          page_path: window.location.pathname
        });
      }
    });
    
    // Track time on page (send event when user leaves)
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        this.trackEvent('page_engagement', {
          engagement_time: timeSpent,
          page_path: window.location.pathname,
          scroll_depth: maxScrollDepth
        });
      }
    };
    
    window.addEventListener('beforeunload', trackTimeOnPage);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage();
        startTime = Date.now(); // Reset timer when page becomes visible again
      }
    });
    
    // Track form interactions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      const formName = form.getAttribute('name') || form.className || 'unknown_form';
      
      this.trackEvent('form_submit', {
        form_name: formName,
        page_path: window.location.pathname
      });
    });
    
    // Track dark mode toggle usage
    document.addEventListener('click', (e) => {
      if (e.target.matches('.dark-mode-toggle')) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.trackEvent('dark_mode_toggle', {
          new_theme: newTheme,
          page_path: window.location.pathname
        });
      }
    });
    
    // Track mobile menu usage
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-toggle') || e.target.closest('.nav-toggle')) {
        this.trackEvent('mobile_menu_toggle', {
          page_path: window.location.pathname
        });
      }
    });
  }
  
  // Custom tracking methods for specific features
  trackMeditationComplete(exerciseName, duration) {
    this.trackEvent('meditation_exercise_complete', {
      exercise_name: exerciseName,
      exercise_duration: duration,
      exercise_category: 'meditation'
    });
  }
  
  trackAssessmentComplete(result) {
    this.trackEvent('assessment_complete', {
      result_tradition: result.tradition,
      result_confidence: result.confidence,
      questions_answered: result.totalQuestions
    });
  }
  
  trackWisdomInteraction(wisdom) {
    this.trackEvent('wisdom_interaction', {
      wisdom_source: wisdom.source,
      wisdom_tradition: wisdom.tradition,
      interaction_type: 'view'
    });
  }
}

// Enhanced cookie consent integration
document.addEventListener('DOMContentLoaded', () => {
  window.analyticsManager = new AnalyticsManager();
  
  // Expose tracking methods globally for use by other scripts
  window.trackEvent = (eventName, parameters) => {
    window.analyticsManager.trackEvent(eventName, parameters);
  };
  
  window.trackPageView = (page) => {
    window.analyticsManager.trackPageView(page);
  };
});

// Update cookie consent system to support analytics
document.addEventListener('DOMContentLoaded', () => {
  // Add analytics option to cookie consent if it exists
  const existingCookieScript = document.querySelector('script[src*="cookie-consent"]');
  if (existingCookieScript) {
    // Enhance existing cookie consent with analytics category
    const consentEvent = new CustomEvent('enhanceCookieConsent', {
      detail: {
        category: 'analytics',
        name: 'Analytics & Performance',
        description: 'Help us understand how visitors interact with our website to improve your experience.'
      }
    });
    document.dispatchEvent(consentEvent);
  }
});

// Page visibility tracking for better engagement metrics
document.addEventListener('visibilitychange', () => {
  if (window.analyticsManager && window.analyticsManager.isAnalyticsEnabled) {
    window.analyticsManager.trackEvent('page_visibility_change', {
      visibility_state: document.visibilityState,
      page_path: window.location.pathname
    });
  }
});

console.log('📊 Analytics manager initialized');