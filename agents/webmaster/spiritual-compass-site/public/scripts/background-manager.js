/* ==========================================================================
   Peaceful Background Manager - Spiritual Compass
   Dynamically rotate beautiful backgrounds throughout the day
   ========================================================================== */

class BackgroundManager {
    constructor() {
        this.initialized = false;
        this.currentBackgrounds = {};
        this.backgroundSchedule = this.createSchedule();
        this.rotationIntervals = new Map();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.initialized) return;
        
        console.log('🌅 Initializing Peaceful Background Manager');
        
        // Apply backgrounds on page load
        this.applyBackgrounds();
        
        // Update backgrounds based on time of day
        this.updateBackgroundsForTimeOfDay();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
        
        // Listen for theme changes
        this.setupThemeListener();
        
        this.initialized = true;
    }

    // ===== Background Schedule System =====
    createSchedule() {
        return {
            // Morning: sunrise theme (5 AM - 12 PM)
            morning: {
                hero: 'bg-sunrise',
                meditation: 'bg-peace',
                wisdom: 'bg-spring',
                paths: 'bg-sunrise',
                compass: 'bg-sacred'
            },
            
            // Afternoon: full energy (12 PM - 5 PM)
            afternoon: {
                hero: 'bg-peace',
                meditation: 'bg-ocean',
                wisdom: 'bg-forest',
                paths: 'bg-mountain',
                compass: 'bg-peace'
            },
            
            // Evening: sunset theme (5 PM - 8 PM)
            evening: {
                hero: 'bg-sunset',
                meditation: 'bg-peace',
                wisdom: 'bg-sunset',
                paths: 'bg-autumn',
                compass: 'bg-sacred'
            },
            
            // Night: peaceful and contemplative (8 PM - 5 AM)
            night: {
                hero: 'bg-night',
                meditation: 'bg-peace',
                wisdom: 'bg-night',
                paths: 'bg-night',
                compass: 'bg-peace'
            }
        };
    }

    // ===== Time-Based Background Selection =====
    getTimeOfDay() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 17) {
            return 'afternoon';
        } else if (hour >= 17 && hour < 20) {
            return 'evening';
        } else {
            return 'night';
        }
    }

    getSeasonalTheme() {
        const month = new Date().getMonth();
        
        if (month >= 2 && month <= 4) {
            return 'spring';
        } else if (month >= 5 && month <= 7) {
            return 'summer';
        } else if (month >= 8 && month <= 10) {
            return 'autumn';
        } else {
            return 'winter';
        }
    }

    getBackgroundForSection(section) {
        const timeOfDay = this.getTimeOfDay();
        const schedule = this.backgroundSchedule[timeOfDay];
        
        return schedule[section] || 'bg-peace';
    }

    // ===== Apply Backgrounds =====
    applyBackgrounds() {
        const sections = {
            'hero': document.querySelector('.hero'),
            'meditation': document.querySelector('.section.meditation-section, [data-bg-section="meditation"]'),
            'wisdom': document.querySelector('.section.wisdom-section, [data-bg-section="wisdom"]'),
            'paths': document.querySelector('.section.paths-section, [data-bg-section="paths"]'),
            'compass': document.querySelector('.compass-section, [data-bg-section="compass"]')
        };

        Object.entries(sections).forEach(([sectionName, element]) => {
            if (element && !element.dataset.bgApplied) {
                const bgClass = this.getBackgroundForSection(sectionName);
                this.applyBackground(element, bgClass, sectionName);
                element.dataset.bgApplied = 'true';
            }
        });
    }

    applyBackground(element, bgClass, sectionName) {
        if (!element) return;

        // Remove previous background classes
        element.classList.forEach(cls => {
            if (cls.startsWith('bg-')) {
                element.classList.remove(cls);
            }
        });

        // Add transition class for smooth change
        element.classList.add('bg-transition-fade');
        
        // Add new background class
        element.classList.add(bgClass);
        
        // Store current background
        this.currentBackgrounds[sectionName] = bgClass;

        // Remove transition class after animation
        setTimeout(() => {
            element.classList.remove('bg-transition-fade');
        }, 1000);

        console.log(`🎨 Applied ${bgClass} to ${sectionName} section`);
    }

    // ===== Periodic Updates =====
    updateBackgroundsForTimeOfDay() {
        // Update every hour when time changes
        const now = new Date();
        const nextHour = new Date(now.getTime() + (60 - now.getMinutes()) * 60000);
        const timeUntilNextHour = nextHour - now;

        setTimeout(() => {
            this.applyBackgrounds();
            
            // Continue updating every hour
            this.rotationIntervals.set('hourly', setInterval(() => {
                this.applyBackgrounds();
            }, 60 * 60 * 1000));
        }, timeUntilNextHour);
    }

    setupPeriodicUpdates() {
        // Gentle animation update every 5 seconds
        this.rotationIntervals.set('animation', setInterval(() => {
            this.updateAnimationState();
        }, 5000));

        // Update backgrounds if theme changes
        this.rotationIntervals.set('theme-check', setInterval(() => {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const currentTheme = localStorage.getItem('spiritual_compass_theme');
            
            if (prefersDark !== (currentTheme === 'dark')) {
                this.applyBackgrounds();
            }
        }, 30000));
    }

    updateAnimationState() {
        // Could be used to trigger animation updates
        // For now, just ensure animations are still running
    }

    // ===== Theme Support =====
    setupThemeListener() {
        // Listen for system theme changes
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', () => {
            this.applyBackgrounds();
        });

        // Listen for user theme toggle (if implemented)
        document.addEventListener('theme-changed', () => {
            this.applyBackgrounds();
        });
    }

    // ===== Manual Background Control =====
    setBackground(sectionName, bgClass) {
        const section = this.findSection(sectionName);
        if (section) {
            this.applyBackground(section, bgClass, sectionName);
        }
    }

    findSection(sectionName) {
        const selectors = {
            'hero': '.hero',
            'meditation': '.section.meditation-section, [data-bg-section="meditation"]',
            'wisdom': '.section.wisdom-section, [data-bg-section="wisdom"]',
            'paths': '.section.paths-section, [data-bg-section="paths"]',
            'compass': '.compass-section, [data-bg-section="compass"]'
        };

        return document.querySelector(selectors[sectionName] || '');
    }

    // ===== Get Available Backgrounds =====
    getAvailableBackgrounds() {
        return {
            'sunrise': 'Warm sunrise colors - inspiring and energizing',
            'sunset': 'Peaceful sunset hues - calming and reflective',
            'forest': 'Natural forest greens - grounding and peaceful',
            'ocean': 'Blue ocean waves - serene and flowing',
            'mountain': 'Mountain landscape - stable and timeless',
            'peace': 'Soft spiritual purples - meditative and calm',
            'sacred': 'Divine golds and deep blues - spiritual and reverent',
            'autumn': 'Warm autumn tones - transformative and letting go',
            'spring': 'Soft pastels - renewal and new beginnings',
            'winter': 'Cool crystalline blues - clarity and stillness',
            'night': 'Night sky with stars - vast and contemplative'
        };
    }

    // ===== Background Statistics =====
    getBackgroundStats() {
        return {
            current_time: new Date().toLocaleTimeString(),
            time_of_day: this.getTimeOfDay(),
            season: this.getSeasonalTheme(),
            active_backgrounds: this.currentBackgrounds,
            total_sections: Object.keys(this.currentBackgrounds).length
        };
    }

    // ===== Cleanup =====
    destroy() {
        this.rotationIntervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.rotationIntervals.clear();
        this.initialized = false;
    }
}

// Initialize background manager
const backgroundManager = new BackgroundManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundManager;
}