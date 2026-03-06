/* ==========================================================================
   Peaceful Background Rotation System
   Manages beautiful, inspiring background imagery rotation
   ========================================================================== */

class PeacefulBackgroundManager {
  constructor() {
    this.backgrounds = {
      sunrise: [
        'sunset-golden',
        'mountain-dawn', 
        'sacred-garden'
      ],
      morning: [
        'forest-morning',
        'mountain-mist',
        'sacred-garden'
      ],
      afternoon: [
        'sunset-ocean',
        'mountain-snow',
        'forest-autumn'
      ],
      evening: [
        'sunset-purple',
        'forest-twilight',
        'desert-serenity'
      ],
      night: [
        'celestial-peace',
        'mountain-mist',
        'forest-twilight'
      ]
    };
    
    this.seasonalBackgrounds = {
      spring: ['sacred-garden', 'forest-morning', 'mountain-dawn'],
      summer: ['sunset-ocean', 'sunset-golden', 'mountain-snow'],
      autumn: ['forest-autumn', 'sunset-purple', 'desert-serenity'],
      winter: ['mountain-snow', 'celestial-peace', 'mountain-mist']
    };
    
    this.currentBackground = null;
    this.lastRotation = 0;
    this.rotationInterval = 15 * 60 * 1000; // 15 minutes
    
    this.init();
  }
  
  init() {
    console.log('🌅 Initializing Peaceful Background System');
    
    // Set initial background
    this.rotateBackground();
    
    // Set up automatic rotation
    setInterval(() => this.rotateBackground(), this.rotationInterval);
    
    // Rotate on page focus (if away for a while)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && Date.now() - this.lastRotation > this.rotationInterval) {
        this.rotateBackground();
      }
    });
    
    // Add floating light elements
    this.addFloatingLights();
    
    // Apply breathing animation to background elements
    this.applyBreathingAnimation();
    
    console.log('✨ Peaceful backgrounds active');
  }
  
  getCurrentTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 8) return 'sunrise';
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }
  
  getCurrentSeason() {
    const month = new Date().getMonth();
    
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }
  
  selectBackground() {
    const timeOfDay = this.getCurrentTimeOfDay();
    const season = this.getCurrentSeason();
    
    // Combine time-of-day and seasonal backgrounds
    const timeBackgrounds = this.backgrounds[timeOfDay] || this.backgrounds.morning;
    const seasonBackgrounds = this.seasonalBackgrounds[season] || this.seasonalBackgrounds.spring;
    
    // Prefer seasonal backgrounds that match time of day
    const preferredBackgrounds = timeBackgrounds.filter(bg => seasonBackgrounds.includes(bg));
    
    let availableBackgrounds;
    if (preferredBackgrounds.length > 0) {
      availableBackgrounds = preferredBackgrounds;
    } else {
      // Fallback to time-of-day appropriate backgrounds
      availableBackgrounds = timeBackgrounds;
    }
    
    // Don't repeat the same background twice in a row
    let selectedBackground;
    do {
      selectedBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
    } while (selectedBackground === this.currentBackground && availableBackgrounds.length > 1);
    
    return selectedBackground;
  }
  
  rotateBackground() {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;
    
    const newBackground = this.selectBackground();
    
    // Smooth transition
    heroElement.style.transition = 'all 3s ease-in-out';
    
    // Remove previous background classes
    if (this.currentBackground) {
      heroElement.classList.remove(this.currentBackground);
    }
    
    // Add new background
    heroElement.classList.add(newBackground);
    heroElement.classList.add('breathing-bg');
    
    this.currentBackground = newBackground;
    this.lastRotation = Date.now();
    
    console.log(`🌄 Background rotated to: ${newBackground} (${this.getCurrentTimeOfDay()}, ${this.getCurrentSeason()})`);
    
    // Add peaceful transition effect
    this.addTransitionEffect();
  }
  
  addFloatingLights() {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;
    
    // Add 3-5 floating light elements
    const lightCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < lightCount; i++) {
      const light = document.createElement('div');
      light.className = 'floating-light';
      
      // Random positioning
      light.style.left = Math.random() * 100 + '%';
      light.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      light.style.animationDelay = -(Math.random() * 10) + 's';
      light.style.animationDuration = (6 + Math.random() * 4) + 's';
      
      heroElement.appendChild(light);
    }
  }
  
  applyBreathingAnimation() {
    // Apply gentle breathing animation to main content sections
    const sections = document.querySelectorAll('.wisdom-section, .paths-section, .teachers-section');
    sections.forEach(section => {
      section.style.animation = 'breathe 12s ease-in-out infinite';
      section.style.animationDelay = Math.random() * 4 + 's';
    });
  }
  
  addTransitionEffect() {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;
    
    // Create a subtle shimmer effect during transition
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%
      );
      animation: shimmer 2s ease-out;
      z-index: 1;
      pointer-events: none;
    `;
    
    heroElement.appendChild(shimmer);
    
    // Remove shimmer after animation
    setTimeout(() => {
      if (shimmer.parentNode) {
        shimmer.parentNode.removeChild(shimmer);
      }
    }, 2000);
  }
  
  // Manual background change (for user preference)
  setBackground(backgroundName) {
    const heroElement = document.querySelector('.hero');
    if (!heroElement || !this.isValidBackground(backgroundName)) return;
    
    if (this.currentBackground) {
      heroElement.classList.remove(this.currentBackground);
    }
    
    heroElement.classList.add(backgroundName);
    this.currentBackground = backgroundName;
    this.lastRotation = Date.now();
    
    console.log(`🎨 Background manually set to: ${backgroundName}`);
  }
  
  isValidBackground(backgroundName) {
    const allBackgrounds = [
      ...this.backgrounds.sunrise,
      ...this.backgrounds.morning,
      ...this.backgrounds.afternoon,
      ...this.backgrounds.evening,
      ...this.backgrounds.night
    ];
    return allBackgrounds.includes(backgroundName);
  }
  
  // Get current background info for debugging
  getCurrentInfo() {
    return {
      currentBackground: this.currentBackground,
      timeOfDay: this.getCurrentTimeOfDay(),
      season: this.getCurrentSeason(),
      lastRotation: new Date(this.lastRotation).toLocaleString(),
      nextRotation: new Date(this.lastRotation + this.rotationInterval).toLocaleString()
    };
  }
}

// Peaceful background quotes that change with backgrounds
const PeacefulQuotes = {
  'sunset-golden': "\"The sunset reminds us that endings can be beautiful too.\"",
  'sunset-purple': "\"In the twilight of the mind, wisdom finds its voice.\"",
  'sunset-ocean': "\"The ocean and sky meet in peaceful unity.\"",
  'mountain-dawn': "\"Mountains teach us that patience builds strength.\"",
  'mountain-mist': "\"In the mist, we learn to trust our inner compass.\"",
  'mountain-snow': "\"Snow-capped peaks reflect the purity of our highest aspirations.\"",
  'forest-morning': "\"The forest whispers ancient wisdom to those who listen.\"",
  'forest-twilight': "\"Dusk in the forest reveals the magic in quiet moments.\"",
  'forest-autumn': "\"Autumn teaches us the beauty of letting go.\"",
  'sacred-garden': "\"In sacred spaces, the soul finds its rest.\"",
  'celestial-peace': "\"Under starlight, we remember our connection to the infinite.\"",
  'desert-serenity': "\"The desert shows us that peace is found in simplicity.\""
};

// Initialize peaceful background system
let peacefulBackgroundManager;

document.addEventListener('DOMContentLoaded', () => {
  peacefulBackgroundManager = new PeacefulBackgroundManager();
  
  // Add background quote system
  const setupBackgroundQuotes = () => {
    const interval = setInterval(() => {
      const currentBg = peacefulBackgroundManager?.currentBackground;
      if (currentBg && PeacefulQuotes[currentBg]) {
        const quoteElement = document.querySelector('.wisdom-quote');
        if (quoteElement) {
          // Smoothly update quote to match background
          quoteElement.style.transition = 'opacity 1s ease-in-out';
          quoteElement.style.opacity = '0';
          
          setTimeout(() => {
            quoteElement.textContent = PeacefulQuotes[currentBg];
            quoteElement.style.opacity = '1';
          }, 1000);
        }
      }
    }, 30000); // Check every 30 seconds
    
    return interval;
  };
  
  // Start quote rotation after a short delay
  setTimeout(setupBackgroundQuotes, 5000);
});

// Export for debugging in console
if (typeof window !== 'undefined') {
  window.PeacefulBackgroundManager = PeacefulBackgroundManager;
  window.getPeacefulBackgroundInfo = () => {
    return peacefulBackgroundManager?.getCurrentInfo() || 'Background manager not initialized';
  };
}