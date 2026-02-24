/* ==========================================================================
   Accessibility Manager
   Comprehensive accessibility features for spiritual seekers
   ========================================================================== */

class AccessibilityManager {
    constructor(app) {
        this.app = app;
        this.panel = null;
        this.settings = app.settings.accessibility || {};
        this.voiceNavigation = null;
        this.keyboardNavigation = null;
        
        this.init();
    }
    
    init() {
        this.setupAccessibilityPanel();
        this.setupVoiceNavigation();
        this.setupKeyboardEnhancements();
        this.setupScreenReaderEnhancements();
        this.setupColorBlindSupport();
        this.applyStoredSettings();
        
        console.log('♿ Accessibility Manager initialized');
    }
    
    setupAccessibilityPanel() {
        this.panel = document.getElementById('accessibility-panel');
        if (!this.panel) return;
        
        // Setup panel toggle buttons
        const toggleButtons = document.querySelectorAll('.accessibility-toggle, .accessibility-toggle-footer');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleAccessibilityPanel());
            
            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccessibilityPanel();
                }
            });
        });
        
        // Setup close button
        const closeButton = this.panel.querySelector('.accessibility-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeAccessibilityPanel());
        }
        
        // Setup accessibility controls
        const controls = this.panel.querySelectorAll('.accessibility-control');
        controls.forEach(control => {
            const setting = control.dataset.setting;
            control.addEventListener('click', () => this.toggleSetting(setting, control));
            
            // Keyboard support
            control.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSetting(setting, control);
                }
            });
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.panel.getAttribute('aria-hidden') === 'false' && 
                !this.panel.contains(e.target) && 
                !e.target.closest('.accessibility-toggle')) {
                this.closeAccessibilityPanel();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.panel.getAttribute('aria-hidden') === 'false') {
                this.closeAccessibilityPanel();
            }
        });
    }
    
    toggleAccessibilityPanel() {
        const isHidden = this.panel.getAttribute('aria-hidden') === 'true';
        
        if (isHidden) {
            this.openAccessibilityPanel();
        } else {
            this.closeAccessibilityPanel();
        }
    }
    
    openAccessibilityPanel() {
        this.panel.setAttribute('aria-hidden', 'false');
        
        // Update button states
        const toggleButtons = document.querySelectorAll('.accessibility-toggle, .accessibility-toggle-footer');
        toggleButtons.forEach(button => {
            button.setAttribute('aria-expanded', 'true');
        });
        
        // Focus the first control
        const firstControl = this.panel.querySelector('.accessibility-control');
        if (firstControl) {
            setTimeout(() => firstControl.focus(), 100);
        }
        
        // Trap focus within panel
        this.trapFocus(this.panel);
        
        this.app.announceToScreenReader('Accessibility settings panel opened');
    }
    
    closeAccessibilityPanel() {
        this.panel.setAttribute('aria-hidden', 'true');
        
        // Update button states
        const toggleButtons = document.querySelectorAll('.accessibility-toggle, .accessibility-toggle-footer');
        toggleButtons.forEach(button => {
            button.setAttribute('aria-expanded', 'false');
        });
        
        // Return focus to trigger button
        const activeToggle = document.querySelector('.accessibility-toggle');
        if (activeToggle) {
            activeToggle.focus();
        }
        
        this.app.announceToScreenReader('Accessibility settings panel closed');
    }
    
    toggleSetting(settingName, controlElement) {
        const currentState = controlElement.getAttribute('aria-pressed') === 'true';
        const newState = !currentState;
        
        // Update control state
        controlElement.setAttribute('aria-pressed', newState.toString());
        
        // Apply the setting
        this.applySetting(settingName, newState);
        
        // Save to storage
        this.app.updateSetting('accessibility', settingName, newState);
        
        // Provide feedback
        const settingLabel = controlElement.querySelector('.control-text').textContent;
        const status = newState ? 'enabled' : 'disabled';
        this.app.announceToScreenReader(`${settingLabel} ${status}`);
        
        console.log(`♿ Accessibility setting ${settingName}: ${status}`);
    }
    
    applySetting(settingName, enabled) {
        switch (settingName) {
            case 'high-contrast':
                if (enabled) {
                    document.documentElement.setAttribute('data-accessibility', 'high-contrast');
                } else {
                    document.documentElement.removeAttribute('data-accessibility');
                }
                break;
                
            case 'large-text':
                if (enabled) {
                    document.documentElement.setAttribute('data-accessibility', 'large-text');
                } else {
                    document.documentElement.removeAttribute('data-accessibility');
                }
                break;
                
            case 'dyslexia-font':
                if (enabled) {
                    document.documentElement.setAttribute('data-accessibility', 'dyslexia-font');
                    this.loadDyslexiaFont();
                } else {
                    document.documentElement.removeAttribute('data-accessibility');
                }
                break;
                
            case 'reduce-motion':
                if (enabled) {
                    document.documentElement.setAttribute('data-accessibility', 'reduce-motion');
                    document.documentElement.setAttribute('data-motion', 'reduced');
                } else {
                    document.documentElement.removeAttribute('data-accessibility');
                    document.documentElement.removeAttribute('data-motion');
                }
                break;
                
            case 'focus-mode':
                if (enabled) {
                    document.documentElement.setAttribute('data-accessibility', 'focus-mode');
                } else {
                    document.documentElement.removeAttribute('data-accessibility');
                }
                break;
        }
        
        // Notify other modules of accessibility changes
        this.app.emit('accessibilityChange', { setting: settingName, enabled });
    }
    
    loadDyslexiaFont() {
        // Load OpenDyslexic font if not already loaded
        const existingFont = document.getElementById('dyslexia-font');
        if (existingFont) return;
        
        const fontLink = document.createElement('link');
        fontLink.id = 'dyslexia-font';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic@master/web/OpenDyslexic.css';
        document.head.appendChild(fontLink);
    }
    
    setupVoiceNavigation() {
        // Check for Web Speech API support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('Voice navigation not supported in this browser');
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.voiceNavigation = new SpeechRecognition();
        
        this.voiceNavigation.continuous = false;
        this.voiceNavigation.interimResults = false;
        this.voiceNavigation.lang = 'en-US';
        
        this.voiceNavigation.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            this.handleVoiceCommand(command);
        };
        
        this.voiceNavigation.onerror = (event) => {
            console.warn('Voice recognition error:', event.error);
        };
        
        // Add voice activation button (could be added to accessibility panel)
        this.addVoiceActivationButton();
    }
    
    addVoiceActivationButton() {
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-activation';
        voiceButton.innerHTML = '🎤 Voice Commands';
        voiceButton.style.cssText = `
            position: fixed;
            bottom: var(--space-20);
            right: var(--space-4);
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: var(--radius-full);
            padding: var(--space-3) var(--space-4);
            font-size: var(--text-sm);
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: var(--z-popover);
            display: none;
        `;
        
        voiceButton.addEventListener('click', () => {
            if (this.voiceNavigation) {
                this.voiceNavigation.start();
                this.app.announceToScreenReader('Voice navigation activated. Say a command like "open compass" or "read wisdom"');
            }
        });
        
        document.body.appendChild(voiceButton);
        
        // Show voice button in accessibility mode
        document.addEventListener('spiritualCompass:accessibilityChange', (e) => {
            if (e.detail.enabled) {
                voiceButton.style.display = 'block';
            }
        });
    }
    
    handleVoiceCommand(command) {
        console.log('Voice command:', command);
        
        if (command.includes('compass') || command.includes('explore')) {
            const compassSection = document.getElementById('compass');
            if (compassSection) {
                compassSection.scrollIntoView({ behavior: 'smooth' });
                this.app.announceToScreenReader('Navigated to compass explorer');
            }
        } else if (command.includes('wisdom') || command.includes('quote')) {
            const wisdomSection = document.getElementById('wisdom');
            if (wisdomSection) {
                wisdomSection.scrollIntoView({ behavior: 'smooth' });
                this.app.announceToScreenReader('Navigated to wisdom section');
            }
        } else if (command.includes('meditate') || command.includes('meditation')) {
            const meditationModule = this.app.getModule('meditation');
            if (meditationModule) {
                meditationModule.openMeditationModal();
            }
        } else if (command.includes('settings') || command.includes('accessibility')) {
            this.openAccessibilityPanel();
        } else {
            this.app.announceToScreenReader('Command not recognized. Try "open compass", "read wisdom", "start meditation", or "open settings"');
        }
    }
    
    setupKeyboardEnhancements() {
        // Enhanced focus management
        this.setupFocusManagement();
        
        // Roving tabindex for complex widgets
        this.setupRovingTabindex();
        
        // Custom keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    setupFocusManagement() {
        // Enhanced focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Add CSS for keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 3px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupRovingTabindex() {
        // Implement roving tabindex for compass segments
        const compassWheel = document.querySelector('.compass-wheel');
        if (!compassWheel) return;
        
        const segments = compassWheel.querySelectorAll('.tradition-segment');
        if (segments.length === 0) return;
        
        let currentIndex = 0;
        
        segments.forEach((segment, index) => {
            segment.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            segment.addEventListener('keydown', (e) => {
                let newIndex = currentIndex;
                
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        newIndex = (currentIndex + 1) % segments.length;
                        break;
                        
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        newIndex = (currentIndex - 1 + segments.length) % segments.length;
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        newIndex = 0;
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        newIndex = segments.length - 1;
                        break;
                        
                    default:
                        return;
                }
                
                // Update tabindex and focus
                segments[currentIndex].setAttribute('tabindex', '-1');
                segments[newIndex].setAttribute('tabindex', '0');
                segments[newIndex].focus();
                currentIndex = newIndex;
            });
        });
    }
    
    setupKeyboardShortcuts() {
        const shortcuts = [
            { key: 'k', ctrl: true, action: 'Focus Compass', handler: () => this.focusCompass() },
            { key: 'm', ctrl: true, action: 'Open Meditation', handler: () => this.openMeditation() },
            { key: 'w', ctrl: true, action: 'New Wisdom', handler: () => this.getNewWisdom() },
            { key: ',', ctrl: true, action: 'Accessibility Settings', handler: () => this.toggleAccessibilityPanel() },
            { key: '?', ctrl: false, action: 'Show Shortcuts', handler: () => this.showKeyboardShortcuts() }
        ];
        
        document.addEventListener('keydown', (e) => {
            shortcuts.forEach(shortcut => {
                if (e.key === shortcut.key && 
                    (shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !e.ctrlKey && !e.metaKey) &&
                    !e.shiftKey && !e.altKey) {
                    
                    // Don't interfere with form inputs
                    if (e.target.matches('input, textarea, select')) return;
                    
                    e.preventDefault();
                    shortcut.handler();
                }
            });
        });
    }
    
    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'keyboard-shortcuts-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'shortcuts-title');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-modal);
        `;
        
        modal.innerHTML = `
            <div style="background: var(--background); border-radius: var(--radius-2xl); padding: var(--space-8); max-width: 500px; width: 90%;">
                <h2 id="shortcuts-title" style="margin-bottom: var(--space-6);">Keyboard Shortcuts</h2>
                <div style="margin-bottom: var(--space-6);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>Ctrl</kbd> + <kbd>K</kbd></span>
                        <span>Focus Compass</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>Ctrl</kbd> + <kbd>M</kbd></span>
                        <span>Open Meditation</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>Ctrl</kbd> + <kbd>W</kbd></span>
                        <span>New Wisdom</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>Ctrl</kbd> + <kbd>,</kbd></span>
                        <span>Accessibility Settings</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>?</kbd></span>
                        <span>Show This Help</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                        <span><kbd>Esc</kbd></span>
                        <span>Close Modals</span>
                    </div>
                </div>
                <button onclick="this.closest('.keyboard-shortcuts-modal').remove()" style="background: var(--primary-color); color: white; border: none; padding: var(--space-3) var(--space-6); border-radius: var(--radius-lg); cursor: pointer;">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus the close button
        const closeButton = modal.querySelector('button');
        closeButton.focus();
        
        // Close on ESC
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
                document.removeEventListener('keydown', handleKeydown);
            }
        }, 10000);
    }
    
    setupScreenReaderEnhancements() {
        // Live regions for dynamic content
        this.createLiveRegions();
        
        // Enhanced ARIA labels
        this.enhanceAriaLabels();
        
        // Progress announcements
        this.setupProgressAnnouncements();
    }
    
    createLiveRegions() {
        // Create live regions for announcements
        const politeRegion = document.createElement('div');
        politeRegion.setAttribute('aria-live', 'polite');
        politeRegion.setAttribute('aria-atomic', 'true');
        politeRegion.className = 'sr-live-region';
        politeRegion.id = 'polite-announcements';
        
        const assertiveRegion = document.createElement('div');
        assertiveRegion.setAttribute('aria-live', 'assertive');
        assertiveRegion.setAttribute('aria-atomic', 'true');
        assertiveRegion.className = 'sr-live-region';
        assertiveRegion.id = 'assertive-announcements';
        
        document.body.appendChild(politeRegion);
        document.body.appendChild(assertiveRegion);
    }
    
    enhanceAriaLabels() {
        // Add descriptive labels to interactive elements
        const compassSegments = document.querySelectorAll('.tradition-segment');
        compassSegments.forEach(segment => {
            const tradition = segment.dataset.tradition;
            const name = segment.querySelector('.tradition-name')?.textContent || tradition;
            segment.setAttribute('aria-label', `Explore ${name} spiritual tradition`);
        });
        
        // Enhance mood options
        const moodOptions = document.querySelectorAll('.mood-option');
        moodOptions.forEach(option => {
            const mood = option.dataset.mood;
            const label = option.querySelector('.mood-label')?.textContent || mood;
            option.setAttribute('aria-label', `Select ${label} mood for personalized wisdom`);
        });
    }
    
    setupProgressAnnouncements() {
        // Announce loading states
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    
                    if (target.classList.contains('loading')) {
                        this.announceToLiveRegion('Loading content...', 'polite');
                    } else if (mutation.oldValue?.includes('loading') && !target.classList.contains('loading')) {
                        this.announceToLiveRegion('Content loaded', 'polite');
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeOldValue: true,
            subtree: true
        });
    }
    
    setupColorBlindSupport() {
        // Add pattern-based indicators for color-blind users
        const addColorBlindSupport = () => {
            document.documentElement.setAttribute('data-colorblind-support', 'true');
            
            // Add texture/pattern overlays to color-coded elements
            const style = document.createElement('style');
            style.textContent = `
                [data-colorblind-support="true"] .tradition-segment::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    border-radius: 0 var(--radius-xl) 0 0;
                }
                
                [data-colorblind-support="true"] .buddhism::after {
                    background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
                }
                
                [data-colorblind-support="true"] .christianity::after {
                    background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
                }
                
                [data-colorblind-support="true"] .islam::after {
                    background-image: repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
                }
                
                /* Add patterns for other traditions... */
            `;
            document.head.appendChild(style);
        };
        
        // Auto-detect color vision deficiency (experimental)
        // For now, add a manual toggle in accessibility panel
        if (this.settings.colorBlindSupport) {
            addColorBlindSupport();
        }
    }
    
    applyStoredSettings() {
        // Apply all stored accessibility settings
        Object.entries(this.settings).forEach(([setting, enabled]) => {
            if (enabled) {
                this.applySetting(setting, true);
                
                // Update control state in panel
                const control = this.panel?.querySelector(`[data-setting="${setting}"]`);
                if (control) {
                    control.setAttribute('aria-pressed', 'true');
                }
            }
        });
    }
    
    // Focus management utilities
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };
        
        element.addEventListener('keydown', handleTabKey);
        
        // Remove trap when element is hidden
        const observer = new MutationObserver(() => {
            if (element.getAttribute('aria-hidden') === 'true') {
                element.removeEventListener('keydown', handleTabKey);
                observer.disconnect();
            }
        });
        
        observer.observe(element, { attributes: true });
    }
    
    announceToLiveRegion(message, priority = 'polite') {
        const region = document.getElementById(priority === 'assertive' ? 'assertive-announcements' : 'polite-announcements');
        if (region) {
            region.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                region.textContent = '';
            }, 1000);
        }
    }
    
    // Module interface methods
    closeModal() {
        this.closeAccessibilityPanel();
    }
    
    onSettingChange(category, key, value) {
        if (category === 'accessibility') {
            this.settings[key] = value;
        }
    }
    
    // Shortcuts called by main app
    focusCompass() {
        const compass = document.querySelector('.compass-main');
        if (compass) {
            compass.scrollIntoView({ behavior: 'smooth' });
            const firstSegment = compass.querySelector('.tradition-segment');
            if (firstSegment) {
                setTimeout(() => firstSegment.focus(), 500);
            }
        }
    }
    
    openMeditation() {
        const meditationModule = this.app.getModule('meditation');
        if (meditationModule) {
            meditationModule.openMeditationModal();
        }
    }
    
    getNewWisdom() {
        const wisdomModule = this.app.getModule('wisdom');
        if (wisdomModule) {
            wisdomModule.getNewWisdom();
        }
    }
}

// Make available globally
window.AccessibilityManager = AccessibilityManager;