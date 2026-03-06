/**
 * Cookie Consent Management System
 * GDPR-compliant cookie consent banner and settings modal
 * Manages user preferences for different cookie categories
 */

class CookieConsent {
    constructor() {
        this.COOKIE_NAME = 'spiritual_compass_consent';
        this.EXPIRY_DAYS = 365;
        this.categories = {
            essential: {
                id: 'essential',
                name: 'Essential Cookies',
                icon: '🔧',
                description: 'Required for basic website functionality and security.',
                required: true,
                details: ['Session management', 'Security features', 'Basic site functionality'],
                expires: 'Session'
            },
            preferences: {
                id: 'preferences',
                name: 'Preference Cookies',
                icon: '🎨',
                description: 'Remember your choices and settings for a better experience.',
                required: false,
                details: ['Dark mode preference', 'Language settings', 'Accessibility preferences'],
                expires: '1 year'
            },
            analytics: {
                id: 'analytics',
                name: 'Analytics Cookies',
                icon: '📊',
                description: 'Help us understand how you use our website to improve it.',
                required: false,
                details: ['Page views and user behavior', 'Performance monitoring', 'Error tracking'],
                expires: '26 months'
            }
        };
        
        this.preferences = this.loadPreferences();
        this.init();
    }

    /**
     * Initialize the cookie consent system
     */
    init() {
        // Check if user has already made a choice
        if (!this.hasConsented()) {
            this.showBanner();
        }
        
        // Apply stored preferences
        this.applyPreferences();
        
        // Create modal
        this.createModal();
    }

    /**
     * Check if user has already given consent
     */
    hasConsented() {
        const cookie = this.getCookie(this.COOKIE_NAME);
        return cookie !== null;
    }

    /**
     * Load user preferences from cookie or localStorage
     */
    loadPreferences() {
        const cookie = this.getCookie(this.COOKIE_NAME);
        
        if (cookie) {
            try {
                return JSON.parse(cookie);
            } catch (e) {
                console.error('Error parsing cookie consent preferences:', e);
            }
        }

        // Return default preferences
        return {
            essential: true,  // Always required
            preferences: false,
            analytics: false,
            timestamp: new Date().getTime()
        };
    }

    /**
     * Save preferences to cookie and localStorage
     */
    savePreferences(prefs) {
        this.preferences = {
            ...prefs,
            timestamp: new Date().getTime()
        };

        // Save to cookie
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.EXPIRY_DAYS);
        
        this.setCookie(
            this.COOKIE_NAME,
            JSON.stringify(this.preferences),
            expiryDate
        );

        // Also save to localStorage for backup
        try {
            localStorage.setItem(this.COOKIE_NAME, JSON.stringify(this.preferences));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }

        // Dispatch custom event
        const event = new CustomEvent('cookieConsentChanged', {
            detail: this.preferences
        });
        window.dispatchEvent(event);
    }

    /**
     * Apply preferences - load analytics, etc. based on user consent
     */
    applyPreferences() {
        // Load Google Analytics if analytics cookies are allowed
        if (this.preferences.analytics) {
            this.loadAnalytics();
        }

        // Load other third-party scripts as needed
        if (this.preferences.preferences) {
            // Preferences cookies already handled by individual scripts
        }
    }

    /**
     * Load Google Analytics (example)
     */
    loadAnalytics() {
        // Check if already loaded
        if (window.ga) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
            'anonymize_ip': true
        });
    }

    /**
     * Create the cookie consent banner HTML
     */
    createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Cookie consent');
        
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-text">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-message">
                        <h4>We respect your privacy</h4>
                        <p>We use cookies to enhance your experience, remember your preferences, and understand how you use our site. 
                           <a href="/privacy-policy">Learn more</a> about our cookie practices.</p>
                    </div>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn cookie-btn-settings" id="cookie-settings" aria-label="Cookie settings">
                        <span>⚙️</span>
                        <span>Settings</span>
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="cookie-accept" aria-label="Accept all cookies">
                        <span>✓</span>
                        <span>Accept All</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        
        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            this.acceptAll();
        });

        document.getElementById('cookie-settings').addEventListener('click', () => {
            this.showModal();
        });

        return banner;
    }

    /**
     * Show the banner
     */
    showBanner() {
        let banner = document.querySelector('.cookie-banner');
        if (!banner) {
            banner = this.createBanner();
        }
        
        // Trigger animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    /**
     * Hide the banner
     */
    hideBanner() {
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    }

    /**
     * Create the cookie settings modal
     */
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.id = 'cookie-settings-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'cookie-modal-title');

        let categoriesHTML = '';
        for (const [key, category] of Object.entries(this.categories)) {
            const isChecked = this.preferences[key] ? 'checked' : '';
            const isDisabled = category.required ? 'disabled' : '';
            
            categoriesHTML += `
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <label class="cookie-category-title">
                            <span>${category.icon}</span>
                            <span>${category.name}</span>
                        </label>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-${key}" ${isChecked} ${isDisabled} aria-label="${category.name}">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-category-description">${category.description}</p>
                    <div class="cookie-details">
                        <strong>Details:</strong>
                        <ul>
                            ${category.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                        <p><em>Expires: ${category.expires}</em></p>
                    </div>
                </div>
            `;
        }

        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2 class="cookie-modal-title" id="cookie-modal-title">
                        <span>🍪</span>
                        <span>Cookie Preferences</span>
                    </h2>
                    <button class="cookie-modal-close" id="modal-close" aria-label="Close cookie preferences">✕</button>
                </div>

                <div class="cookie-categories">
                    ${categoriesHTML}
                </div>

                <div class="cookie-modal-actions">
                    <button class="cookie-modal-btn cookie-modal-btn-secondary" id="modal-decline" aria-label="Accept only essential cookies">
                        <span>Decline</span>
                    </button>
                    <button class="cookie-modal-btn cookie-modal-btn-primary" id="modal-save" aria-label="Save cookie preferences">
                        <span>✓</span>
                        <span>Save Preferences</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        document.getElementById('modal-close').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modal-decline').addEventListener('click', () => {
            this.declineAll();
        });

        document.getElementById('modal-save').addEventListener('click', () => {
            this.saveFromModal();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal();
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.hideModal();
            }
        });
    }

    /**
     * Show the settings modal
     */
    showModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus on close button for accessibility
            setTimeout(() => {
                document.getElementById('modal-close').focus();
            }, 100);
        }
    }

    /**
     * Hide the settings modal
     */
    hideModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    /**
     * Save preferences from modal
     */
    saveFromModal() {
        const preferences = {
            essential: true // Always true
        };

        for (const [key, category] of Object.entries(this.categories)) {
            if (key !== 'essential') {
                const checkbox = document.getElementById(`cookie-${key}`);
                preferences[key] = checkbox.checked;
            }
        }

        this.savePreferences(preferences);
        this.applyPreferences();
        this.hideModal();
        this.hideBanner();
        
        // Show confirmation
        this.showConfirmation('✓ Cookie preferences saved');
    }

    /**
     * Accept all cookies
     */
    acceptAll() {
        const preferences = {
            essential: true,
            preferences: true,
            analytics: true
        };

        this.savePreferences(preferences);
        this.applyPreferences();
        this.hideBanner();
        
        // Show confirmation
        this.showConfirmation('✓ All cookies accepted');
    }

    /**
     * Decline non-essential cookies
     */
    declineAll() {
        const preferences = {
            essential: true,
            preferences: false,
            analytics: false
        };

        this.savePreferences(preferences);
        this.applyPreferences();
        this.hideModal();
        this.hideBanner();
        
        // Show confirmation
        this.showConfirmation('✓ Preferences updated - only essential cookies enabled');
    }

    /**
     * Show confirmation message
     */
    showConfirmation(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'cookie-confirmation';
        confirmation.textContent = message;
        confirmation.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #d4af37, #f6d55c);
            color: #2d3748;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            font-weight: 500;
            animation: slideUp 0.3s ease forwards;
        `;

        document.body.appendChild(confirmation);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            confirmation.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => {
                confirmation.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Get a cookie by name
     */
    getCookie(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        
        return null;
    }

    /**
     * Set a cookie
     */
    setCookie(name, value, expiryDate) {
        const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
        document.cookie = cookieString;
    }

    /**
     * Delete a cookie
     */
    deleteCookie(name) {
        this.setCookie(name, '', new Date(0));
    }

    /**
     * Check if a specific cookie category is allowed
     */
    isAllowed(category) {
        return this.preferences[category] || category === 'essential';
    }

    /**
     * Update preferences for a specific category
     */
    updateCategory(category, allowed) {
        if (category === 'essential') {
            console.warn('Cannot change essential cookies preference');
            return;
        }

        this.preferences[category] = allowed;
        this.savePreferences(this.preferences);
        this.applyPreferences();
    }

    /**
     * Reset all preferences to default
     */
    reset() {
        this.deleteCookie(this.COOKIE_NAME);
        try {
            localStorage.removeItem(this.COOKIE_NAME);
        } catch (e) {
            console.warn('Could not remove from localStorage:', e);
        }
        
        this.preferences = this.loadPreferences();
        this.showBanner();
    }
}

// Initialize on document ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cookieConsent = new CookieConsent();
    });
} else {
    window.cookieConsent = new CookieConsent();
}