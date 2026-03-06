// UNIFIED FUNCTIONALITY - Dark Mode + Mobile Navigation
// Clean, conflict-free implementation

class UnifiedSiteManager {
  constructor() {
    this.themeStorageKey = 'spiritual-compass-theme';
    this.init();
  }

  init() {
    this.setupDarkModeToggle();
    this.setupMobileNavigation();
    this.loadSavedTheme();
    this.preventFOUC();
  }

  // ===== DARK MODE FUNCTIONALITY =====
  
  setupDarkModeToggle() {
    // Remove any existing toggle to prevent duplicates
    const existing = document.querySelector('.dark-mode-toggle');
    if (existing) {
      existing.remove();
    }

    // Add toggle to nav-links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      const toggle = document.createElement('button');
      toggle.className = 'dark-mode-toggle';
      toggle.setAttribute('aria-label', 'Toggle dark mode');
      toggle.innerHTML = '🌙';
      toggle.type = 'button';
      
      navLinks.appendChild(toggle);
      
      // Event listener
      toggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  loadSavedTheme() {
    const saved = localStorage.getItem(this.themeStorageKey);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = saved || (systemDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  setTheme(theme) {
    const html = document.documentElement;
    const toggle = document.querySelector('.dark-mode-toggle');
    
    html.setAttribute('data-theme', theme);
    localStorage.setItem(this.themeStorageKey, theme);
    
    if (toggle) {
      toggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // Prevent flash of unstyled content
  preventFOUC() {
    const saved = localStorage.getItem(this.themeStorageKey);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved === 'dark' || (!saved && systemDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // ===== MOBILE NAVIGATION FUNCTIONALITY =====
  
  setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) {
      console.warn('Mobile navigation elements not found');
      return;
    }

    // Toggle menu
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    // Close menu when clicking links
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    const isOpen = navLinks.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    navToggle.classList.add('active');
    navLinks.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // ===== KEYBOARD SHORTCUTS =====
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + D for dark mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleTheme();
      }
      
      // Escape to close mobile menu
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }
}

// Initialize when DOM is ready
function initializeSite() {
  new UnifiedSiteManager();
}

// Handle different loading states
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}

// Immediate FOUC prevention (runs before DOM ready)
(function() {
  const theme = localStorage.getItem('spiritual-compass-theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'dark' || (!theme && systemDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();