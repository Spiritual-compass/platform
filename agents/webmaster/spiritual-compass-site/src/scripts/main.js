/* ==========================================================================
   Spiritual Compass - Main JavaScript
   Coordinating all interactive features for spiritual seeking
   ========================================================================== */

class SpiritualCompass {
    constructor() {
        this.initialized = false;
        this.modules = {};
        this.settings = this.loadSettings();
        this.serviceWorker = null;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleOnline = this.handleOnline.bind(this);
        this.handleOffline = this.handleOffline.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }
    
    async init() {
        if (this.initialized) return;
        
        try {
            console.log('🧭 Initializing Spiritual Compass Platform...');
            
            // Apply saved settings
            this.applySettings();
            
            // Initialize core modules
            await this.initializeModules();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize service worker for offline functionality
            this.initializeServiceWorker();
            
            // Set up analytics (privacy-focused)
            this.initializeAnalytics();
            
            this.initialized = true;
            console.log('✨ Spiritual Compass Platform initialized successfully');
            
            // Announce to screen readers
            this.announceToScreenReader('Spiritual Compass platform loaded and ready for exploration');
            
        } catch (error) {
            console.error('Failed to initialize Spiritual Compass:', error);
            this.handleInitializationError(error);
        }
    }
    
    async initializeModules() {
        const moduleConfig = {
            accessibility: { file: 'accessibility.js', class: 'AccessibilityManager' },
            compass: { file: 'compass.js', class: 'CompassExplorer' },
            wisdom: { file: 'wisdom.js', class: 'WisdomEngine' },
            meditation: { file: 'meditation.js', class: 'MeditationGuide' }
        };
        
        const modulePromises = Object.entries(moduleConfig).map(async ([name, config]) => {
            try {
                // Module classes are expected to be available globally or imported
                const ModuleClass = window[config.class];
                if (ModuleClass) {
                    this.modules[name] = new ModuleClass(this);
                    console.log(`📿 Loaded ${name} module`);
                } else {
                    console.warn(`Module ${config.class} not found, feature may be limited`);
                }
            } catch (error) {
                console.error(`Failed to load ${name} module:`, error);
            }
        });
        
        await Promise.allSettled(modulePromises);
    }
    
    setupEventListeners() {
        // Page lifecycle events
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        window.addEventListener('online', this.handleOnline);
        window.addEventListener('offline', this.handleOffline);
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Smooth scrolling for internal links
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Keyboard navigation enhancements
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Form enhancements
        this.enhanceForms();
        
        // Intersection observer for animations
        this.setupScrollAnimations();
    }
    
    handleNavigation(event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: this.settings.accessibility?.reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });
            
            // Update focus for accessibility
            targetElement.focus({ preventScroll: true });
            
            // Update URL without triggering navigation
            history.replaceState(null, '', `#${targetId}`);
        }
    }
    
    handleKeyboardNavigation(event) {
        // Enhanced keyboard shortcuts for accessibility
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'k':
                    event.preventDefault();
                    if (this.modules.compass) {
                        this.modules.compass.focusCompass();
                    }
                    break;
                    
                case 'm':
                    event.preventDefault();
                    if (this.modules.meditation) {
                        this.modules.meditation.openMeditationModal();
                    }
                    break;
                    
                case 'w':
                    event.preventDefault();
                    if (this.modules.wisdom) {
                        this.modules.wisdom.getNewWisdom();
                    }
                    break;
                    
                case ',':
                    event.preventDefault();
                    if (this.modules.accessibility) {
                        this.modules.accessibility.toggleAccessibilityPanel();
                    }
                    break;
            }
        }
        
        // Escape key handling
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
    }
    
    enhanceForms() {
        // Enhanced form validation and user experience
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
            
            // Enhanced form submission
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
    }
    
    validateField(event) {
        const field = event.target;
        const fieldGroup = field.closest('.form-group');
        if (!fieldGroup) return;
        
        // Remove existing error messages
        const existingError = fieldGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type and attributes
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--error-color);
                font-size: var(--text-xs);
                margin-top: var(--space-1);
            `;
            errorElement.textContent = errorMessage;
            fieldGroup.appendChild(errorElement);
            
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', field.id + '-error');
            errorElement.id = field.id + '-error';
        } else {
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }
        
        return isValid;
    }
    
    clearFieldError(event) {
        const field = event.target;
        const fieldGroup = field.closest('.form-group');
        if (!fieldGroup) return;
        
        const errorElement = fieldGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }
    }
    
    async handleFormSubmit(event) {
        const form = event.target;
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            const mockEvent = { target: input };
            const fieldValid = this.validateField(mockEvent);
            if (!fieldValid) isFormValid = false;
        });
        
        if (!isFormValid) {
            event.preventDefault();
            this.announceToScreenReader('Form has errors. Please review and correct the highlighted fields.');
            return;
        }
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Reset button after timeout (Netlify forms handle the actual submission)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }
    }
    
    setupScrollAnimations() {
        if (this.settings.accessibility?.reduceMotion) {
            return; // Skip animations if user prefers reduced motion
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        const animateElements = document.querySelectorAll(
            '.about-card, .community-card, .wisdom-card, .tradition-panel'
        );
        
        animateElements.forEach(el => {
            el.style.cssText = `
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease-out;
            `;
            observer.observe(el);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause intensive operations
            Object.values(this.modules).forEach(module => {
                if (module.pause) module.pause();
            });
        } else {
            // Page is visible - resume operations
            Object.values(this.modules).forEach(module => {
                if (module.resume) module.resume();
            });
        }
    }
    
    handleOnline() {
        console.log('🌐 Connection restored');
        this.announceToScreenReader('Internet connection restored');
        
        // Sync any offline data
        Object.values(this.modules).forEach(module => {
            if (module.syncOnline) module.syncOnline();
        });
    }
    
    handleOffline() {
        console.log('📱 Offline mode enabled');
        this.announceToScreenReader('Working offline - some features may be limited');
    }
    
    handleBeforeUnload(event) {
        // Save current state
        this.saveSettings();
        
        // Save any unsaved work
        Object.values(this.modules).forEach(module => {
            if (module.saveState) module.saveState();
        });
    }
    
    async initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                this.serviceWorker = registration;
                console.log('🔄 Service Worker registered for offline support');
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }
    }
    
    initializeAnalytics() {
        // Privacy-focused analytics - only track essential interactions
        // No personal data, respect Do Not Track
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
            console.log('🔒 Respecting Do Not Track preference');
            return;
        }
        
        // Simple, privacy-friendly event tracking
        this.trackEvent = (category, action, label) => {
            // This would integrate with a privacy-focused analytics service
            console.log('📊 Event:', { category, action, label });
        };
        
        // Track basic usage patterns (anonymized)
        this.trackEvent('Platform', 'Initialize', 'SpiritualCompass');
    }
    
    // Settings management
    loadSettings() {
        try {
            const saved = localStorage.getItem('spiritualCompass-settings');
            return saved ? JSON.parse(saved) : {
                accessibility: {},
                preferences: {},
                collections: {}
            };
        } catch {
            return {
                accessibility: {},
                preferences: {},
                collections: {}
            };
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('spiritualCompass-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Could not save settings:', error);
        }
    }
    
    updateSetting(category, key, value) {
        if (!this.settings[category]) {
            this.settings[category] = {};
        }
        this.settings[category][key] = value;
        this.saveSettings();
        
        // Apply the setting immediately
        this.applySettings();
        
        // Notify modules of setting change
        Object.values(this.modules).forEach(module => {
            if (module.onSettingChange) {
                module.onSettingChange(category, key, value);
            }
        });
    }
    
    applySettings() {
        const { accessibility } = this.settings;
        
        // Apply accessibility settings
        Object.entries(accessibility).forEach(([key, value]) => {
            if (value) {
                document.documentElement.setAttribute(`data-accessibility`, key);
            } else {
                document.documentElement.removeAttribute(`data-accessibility`);
            }
        });
        
        // Apply motion preferences
        if (accessibility.reduceMotion) {
            document.documentElement.setAttribute('data-motion', 'reduced');
        }
        
        // Apply theme preferences
        if (this.settings.preferences?.theme) {
            document.documentElement.setAttribute('data-theme', this.settings.preferences.theme);
        }
    }
    
    // Utility methods
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only-live';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    closeAllModals() {
        // Close any open modals/panels
        Object.values(this.modules).forEach(module => {
            if (module.closeModal) module.closeModal();
        });
        
        // Close accessibility panel
        const accessibilityPanel = document.getElementById('accessibility-panel');
        if (accessibilityPanel && accessibilityPanel.getAttribute('aria-hidden') === 'false') {
            accessibilityPanel.setAttribute('aria-hidden', 'true');
        }
    }
    
    handleInitializationError(error) {
        // Graceful degradation - basic functionality still works
        console.error('Spiritual Compass initialization failed, running in basic mode');
        
        // Show user-friendly error message
        const errorBanner = document.createElement('div');
        errorBanner.style.cssText = `
            background: var(--warning-color);
            color: white;
            padding: var(--space-4);
            text-align: center;
            position: fixed;
            top: 4rem;
            left: 0;
            right: 0;
            z-index: var(--z-toast);
        `;
        errorBanner.innerHTML = `
            <p><strong>Notice:</strong> Some interactive features may be limited. Please refresh the page or try again later.</p>
            <button onclick="this.parentElement.remove()" style="margin-left: var(--space-4); background: transparent; border: 1px solid white; color: white; padding: var(--space-1) var(--space-3); border-radius: var(--radius);">Dismiss</button>
        `;
        
        document.body.appendChild(errorBanner);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (errorBanner.parentElement) {
                errorBanner.remove();
            }
        }, 10000);
    }
    
    // Public API for modules to communicate
    getModule(name) {
        return this.modules[name];
    }
    
    emit(eventName, data) {
        const event = new CustomEvent(`spiritualCompass:${eventName}`, { detail: data });
        document.dispatchEvent(event);
    }
    
    on(eventName, handler) {
        document.addEventListener(`spiritualCompass:${eventName}`, handler);
    }
    
    // Utility for creating elements with attributes
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key.startsWith('data-') || key.startsWith('aria-') || ['id', 'class', 'role', 'tabindex'].includes(key)) {
                element.setAttribute(key, value);
            } else {
                element[key] = value;
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    }
}

// Initialize the platform
window.spiritualCompass = new SpiritualCompass();