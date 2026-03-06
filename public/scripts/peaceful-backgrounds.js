// PEACEFUL BACKGROUNDS DYNAMIC SYSTEM
// Rotates backgrounds based on time, season, and user interaction

class PeacefulBackgrounds {
    constructor() {
        this.init();
    }

    init() {
        this.addTimeBasedClasses();
        this.addSeasonalClasses();
        this.enableBackgroundRotation();
        this.optimizeForDevice();
        
        // Add gentle scroll parallax effect
        this.initScrollEffects();
    }

    addTimeBasedClasses() {
        const now = new Date();
        const hour = now.getHours();
        const body = document.body;

        // Remove existing time classes
        body.classList.remove('time-dawn', 'time-morning', 'time-afternoon', 'time-evening', 'time-night');

        // Add appropriate time class
        if (hour >= 5 && hour < 7) {
            body.classList.add('time-dawn');
        } else if (hour >= 7 && hour < 12) {
            body.classList.add('time-morning');
        } else if (hour >= 12 && hour < 17) {
            body.classList.add('time-afternoon');
        } else if (hour >= 17 && hour < 20) {
            body.classList.add('time-evening');
        } else {
            body.classList.add('time-night');
        }
    }

    addSeasonalClasses() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        const day = now.getDate();
        const body = document.body;

        // Remove existing season classes
        body.classList.remove('season-spring', 'season-summer', 'season-autumn', 'season-winter');

        // Northern Hemisphere seasons (approximate)
        if ((month === 3 && day >= 20) || (month >= 4 && month <= 5) || (month === 6 && day < 20)) {
            body.classList.add('season-spring');
        } else if ((month === 6 && day >= 20) || (month >= 7 && month <= 8) || (month === 9 && day < 22)) {
            body.classList.add('season-summer');
        } else if ((month === 9 && day >= 22) || (month >= 10 && month <= 11) || (month === 12 && day < 21)) {
            body.classList.add('season-autumn');
        } else {
            body.classList.add('season-winter');
        }
    }

    enableBackgroundRotation() {
        // Subtle background rotation every 10 minutes for variety
        setInterval(() => {
            this.rotateBackgrounds();
        }, 10 * 60 * 1000); // 10 minutes
    }

    rotateBackgrounds() {
        const sections = ['#about', '#assessment', '#wisdom', '#practices', '#teachings'];
        const backgrounds = ['peaceful-bg-mountain', 'peaceful-bg-forest', 'peaceful-bg-ocean', 'peaceful-bg-meadow', 'peaceful-bg-sunrise'];
        
        sections.forEach((selector, index) => {
            const section = document.querySelector(selector);
            if (section) {
                // Remove existing peaceful background classes
                backgrounds.forEach(bg => section.classList.remove(bg));
                
                // Add new background (rotating through available options)
                const newBgIndex = (index + Math.floor(Date.now() / (10 * 60 * 1000))) % backgrounds.length;
                section.classList.add(backgrounds[newBgIndex], 'peaceful-bg');
            }
        });
    }

    optimizeForDevice() {
        // Detect device capabilities and adjust accordingly
        const isLowPowerDevice = this.isLowPowerDevice();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isLowPowerDevice || prefersReducedMotion) {
            // Simplify backgrounds for performance
            document.body.classList.add('simplified-backgrounds');
            
            // Use simpler gradients instead of complex SVGs
            const style = document.createElement('style');
            style.textContent = `
                .simplified-backgrounds .hero {
                    background: linear-gradient(135deg, #87CEEB 0%, #FFE4B5 50%, #F0E68C 100%) !important;
                }
                .simplified-backgrounds #about {
                    background: linear-gradient(135deg, #4682B4 0%, #87CEEB 100%) !important;
                }
                .simplified-backgrounds #assessment {
                    background: linear-gradient(135deg, #98FB98 0%, #F0FFF0 100%) !important;
                }
                .simplified-backgrounds #wisdom {
                    background: linear-gradient(135deg, #228B22 0%, #90EE90 100%) !important;
                }
                .simplified-backgrounds #practices {
                    background: linear-gradient(135deg, #4682B4 0%, #E0F6FF 100%) !important;
                }
                .simplified-backgrounds #teachings {
                    background: linear-gradient(135deg, #FFD700 0%, #FFF8DC 100%) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    isLowPowerDevice() {
        // Simple heuristics for low-power device detection
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlowConnection = connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const isLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        return isSlowConnection || isLowMemory || isLowCores;
    }

    initScrollEffects() {
        // Gentle parallax effect for hero background
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            let ticking = false;
            
            const updateParallax = () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                
                if (hero) {
                    const speed = scrolled * 0.3;
                    hero.style.backgroundPosition = `center ${speed}px`;
                }
                
                ticking = false;
            };

            const requestParallaxUpdate = () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        }
    }

    // Public method to manually trigger background refresh
    refresh() {
        this.addTimeBasedClasses();
        this.addSeasonalClasses();
        this.rotateBackgrounds();
    }

    // Method to set specific peaceful mood
    setPeacefulMood(mood) {
        const moodBackgrounds = {
            'contemplative': 'peaceful-bg-mountain',
            'joyful': 'peaceful-bg-meadow',
            'serene': 'peaceful-bg-ocean',
            'grounded': 'peaceful-bg-forest',
            'hopeful': 'peaceful-bg-sunrise'
        };

        const background = moodBackgrounds[mood];
        if (background) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                // Remove other peaceful backgrounds
                Object.values(moodBackgrounds).forEach(bg => section.classList.remove(bg));
                // Add the mood-specific background
                section.classList.add(background, 'peaceful-bg');
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const peacefulBg = new PeacefulBackgrounds();
    
    // Make it globally accessible for testing/debugging
    window.peacefulBackgrounds = peacefulBg;
    
    // Update backgrounds every hour to stay current with time
    setInterval(() => {
        peacefulBg.addTimeBasedClasses();
    }, 60 * 60 * 1000); // 1 hour
});

// Expose utility function to manually set peaceful mood
window.setPeacefulMood = (mood) => {
    if (window.peacefulBackgrounds) {
        window.peacefulBackgrounds.setPeacefulMood(mood);
    }
};