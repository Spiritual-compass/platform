/* 🧭 INTERACTIVE COMPASS WIDGET CONTROLLER */

class InteractiveCompass {
    constructor() {
        this.traditions = {
            north: {
                name: 'Buddhism',
                icon: '🏯',
                description: 'The path of awakening and enlightenment',
                link: '/paths#buddhism'
            },
            northeast: {
                name: 'Taoism',
                icon: '☯️',
                description: 'Harmony with the natural flow of life',
                link: '/paths#taoism'
            },
            east: {
                name: 'Hinduism',
                icon: '🕉️',
                description: 'The sacred knowledge of eternal truth',
                link: '/paths#hinduism'
            },
            southeast: {
                name: 'Animism',
                icon: '🌿',
                description: 'Connection with the spirit of nature',
                link: '/paths#animism'
            },
            south: {
                name: 'Christianity',
                icon: '✝️',
                description: 'Love, faith, and spiritual redemption',
                link: '/paths#christianity'
            },
            southwest: {
                name: 'Indigenous',
                icon: '🪶',
                description: 'Sacred wisdom of ancestral traditions',
                link: '/paths#indigenous'
            },
            west: {
                name: 'Islam',
                icon: '☪️',
                description: 'Submission to the divine will',
                link: '/paths#islam'
            },
            northwest: {
                name: 'Judaism',
                icon: '✡️',
                description: 'Covenant and spiritual heritage',
                link: '/paths#judaism'
            }
        };

        this.init();
    }

    init() {
        // Check if widget container exists
        const container = document.getElementById('compass-widget-container');
        if (!container) {
            console.log('InteractiveCompass: Container not found, will initialize when ready');
            return;
        }

        this.container = container;
        this.render();
        this.bindEvents();
    }

    render() {
        const htmlContent = `
            <div class="compass-widget">
                <h2 class="compass-title">Spiritual Compass</h2>
                <p class="compass-subtitle">Click on a direction to explore different spiritual traditions</p>
                
                <div class="compass-container" id="compass-main">
                    <svg class="compass-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                        <!-- Outer circle -->
                        <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(255, 215, 0, 0.3)" stroke-width="2"/>
                        <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255, 215, 0, 0.15)" stroke-width="1"/>
                        
                        <!-- Direction lines and markers -->
                        <g id="direction-markers">
                            <!-- North -->
                            <line x1="150" y1="30" x2="150" y2="50" stroke="rgba(255, 215, 0, 0.5)" stroke-width="2"/>
                            <text x="150" y="20" class="direction-label">N</text>
                            
                            <!-- East -->
                            <line x1="270" y1="150" x2="250" y2="150" stroke="rgba(255, 215, 0, 0.5)" stroke-width="2"/>
                            <text x="280" y="155" class="direction-label">E</text>
                            
                            <!-- South -->
                            <line x1="150" y1="270" x2="150" y2="250" stroke="rgba(255, 215, 0, 0.5)" stroke-width="2"/>
                            <text x="150" y="290" class="direction-label">S</text>
                            
                            <!-- West -->
                            <line x1="30" y1="150" x2="50" y2="150" stroke="rgba(255, 215, 0, 0.5)" stroke-width="2"/>
                            <text x="20" y="155" class="direction-label">W</text>
                        </g>
                        
                        <!-- Cardinal direction sectors (clickable) -->
                        <g id="compass-sectors">
                            <!-- North (Buddhism) -->
                            <path d="M 150 150 L 150 30 A 120 120 0 0 1 185 35.86 Z" class="tradition-sector" data-direction="north"/>
                            
                            <!-- Northeast (Taoism) -->
                            <path d="M 150 150 L 185 35.86 A 120 120 0 0 1 215 50 Z" class="tradition-sector" data-direction="northeast"/>
                            
                            <!-- East (Hinduism) -->
                            <path d="M 150 150 L 215 50 A 120 120 0 0 1 270 150 Z" class="tradition-sector" data-direction="east"/>
                            
                            <!-- Southeast (Animism) -->
                            <path d="M 150 150 L 270 150 A 120 120 0 0 1 215 250 Z" class="tradition-sector" data-direction="southeast"/>
                            
                            <!-- South (Christianity) -->
                            <path d="M 150 150 L 215 250 A 120 120 0 0 1 150 270 Z" class="tradition-sector" data-direction="south"/>
                            
                            <!-- Southwest (Indigenous) -->
                            <path d="M 150 150 L 150 270 A 120 120 0 0 1 85 250 Z" class="tradition-sector" data-direction="southwest"/>
                            
                            <!-- West (Islam) -->
                            <path d="M 150 150 L 85 250 A 120 120 0 0 1 30 150 Z" class="tradition-sector" data-direction="west"/>
                            
                            <!-- Northwest (Judaism) -->
                            <path d="M 150 150 L 30 150 A 120 120 0 0 1 85 50 Z" class="tradition-sector" data-direction="northwest"/>
                        </g>
                        
                        <!-- Central circle -->
                        <circle cx="150" cy="150" r="20" fill="var(--accent-gold, #ffd700)" opacity="0.8"/>
                        <circle cx="150" cy="150" r="15" fill="rgba(255, 255, 255, 0.3)"/>
                        
                        <!-- Compass rose -->
                        <g class="compass-rose">
                            <!-- Star pattern -->
                            <path d="M 150 120 L 153 135 L 150 150 L 147 135 Z" fill="var(--accent-purple, #a855f7)" opacity="0.8"/>
                        </g>
                    </svg>
                </div>
                
                <div class="compass-hints" id="compass-hints">
                    <!-- Hints will be populated by JavaScript -->
                </div>
                
                <div class="compass-result" id="compass-result">
                    <div class="compass-result-title" id="compass-result-title"></div>
                    <div class="compass-result-description" id="compass-result-description"></div>
                    <a class="compass-result-action" id="compass-result-action" href="#">
                        Explore <span>→</span>
                    </a>
                </div>
            </div>
        `;

        this.container.innerHTML = htmlContent;
        this.renderHints();
    }

    renderHints() {
        const hintsContainer = document.getElementById('compass-hints');
        if (!hintsContainer) return;

        const directions = ['north', 'east', 'south', 'west'];
        
        hintsContainer.innerHTML = directions.map(direction => {
            const tradition = this.traditions[direction];
            return `
                <button class="compass-hint" data-direction="${direction}" aria-label="Explore ${tradition.name}">
                    <span class="compass-hint-icon">${tradition.icon}</span>
                    <p class="compass-hint-label">${tradition.name}</p>
                </button>
            `;
        }).join('');
    }

    bindEvents() {
        // Bind sector clicks
        document.querySelectorAll('.tradition-sector').forEach(sector => {
            sector.addEventListener('click', (e) => {
                e.preventDefault();
                const direction = sector.getAttribute('data-direction');
                this.showTradition(direction);
            });

            // Add hover effect
            sector.addEventListener('mouseenter', () => {
                sector.classList.add('active');
            });

            sector.addEventListener('mouseleave', () => {
                sector.classList.remove('active');
            });
        });

        // Bind hint button clicks
        document.querySelectorAll('.compass-hint').forEach(hint => {
            hint.addEventListener('click', (e) => {
                e.preventDefault();
                const direction = hint.getAttribute('data-direction');
                this.showTradition(direction);
            });
        });

        // Bind compass container click
        const compassContainer = document.getElementById('compass-main');
        if (compassContainer) {
            compassContainer.addEventListener('click', () => {
                // Spin animation
                const rose = compassContainer.querySelector('.compass-rose');
                if (rose) {
                    rose.style.animation = 'none';
                    setTimeout(() => {
                        rose.style.animation = 'gentleFloat 8s ease-in-out infinite';
                    }, 10);
                }
            });
        }
    }

    showTradition(direction) {
        const tradition = this.traditions[direction];
        if (!tradition) return;

        // Update active states
        document.querySelectorAll('.compass-hint').forEach(hint => {
            if (hint.getAttribute('data-direction') === direction) {
                hint.classList.add('active');
            } else {
                hint.classList.remove('active');
            }
        });

        // Show result
        const resultElement = document.getElementById('compass-result');
        const titleElement = document.getElementById('compass-result-title');
        const descriptionElement = document.getElementById('compass-result-description');
        const actionElement = document.getElementById('compass-result-action');

        if (resultElement && titleElement && descriptionElement && actionElement) {
            titleElement.textContent = tradition.name;
            descriptionElement.textContent = tradition.description;
            actionElement.href = tradition.link;
            actionElement.textContent = `Explore ${tradition.name} →`;
            
            resultElement.classList.add('show');

            // Rotate compass needle to point to direction
            this.rotateCompass(direction);
        }
    }

    rotateCompass(direction) {
        const rose = document.querySelector('.compass-rose');
        if (!rose) return;

        const angles = {
            north: 0,
            northeast: 45,
            east: 90,
            southeast: 135,
            south: 180,
            southwest: 225,
            west: 270,
            northwest: 315
        };

        const angle = angles[direction] || 0;
        rose.style.transform = `rotate(${angle}deg)`;
    }

    // Public method to navigate to a tradition
    navigateTo(direction) {
        const tradition = this.traditions[direction];
        if (tradition) {
            this.showTradition(direction);
            // Optional: navigate after a delay
            setTimeout(() => {
                window.location.href = tradition.link;
            }, 500);
        }
    }

    // Get all available traditions
    getTraditions() {
        return this.traditions;
    }

    // Check if compass is initialized
    isInitialized() {
        return !!this.container;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.compassWidget = new InteractiveCompass();
    });
} else {
    window.compassWidget = new InteractiveCompass();
}

// Watch for container being added to DOM if not present initially
const observerForCompass = new MutationObserver(() => {
    if (!window.compassWidget || !window.compassWidget.isInitialized()) {
        const container = document.getElementById('compass-widget-container');
        if (container && (!window.compassWidget || !window.compassWidget.container)) {
            if (!window.compassWidget) {
                window.compassWidget = new InteractiveCompass();
            } else {
                window.compassWidget.init();
            }
            observerForCompass.disconnect();
        }
    }
});

observerForCompass.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Export for use in other scripts
window.InteractiveCompass = InteractiveCompass;