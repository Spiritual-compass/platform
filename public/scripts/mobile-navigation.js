/* ==========================================================================
   Enhanced Mobile Navigation
   Smooth mobile menu interactions with accessibility support
   ========================================================================== */

class MobileNavigation {
    constructor() {
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-links');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        if (this.mobileToggle && this.navMenu) {
            this.init();
        }
    }
    
    init() {
        // Set up event listeners
        this.mobileToggle.addEventListener('click', this.toggleMenu.bind(this));
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
                this.mobileToggle.focus();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Trap focus in mobile menu when open
        this.navMenu.addEventListener('keydown', this.handleMenuKeydown.bind(this));
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.navMenu.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item
        setTimeout(() => {
            const firstLink = this.navMenu.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 150);
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.navMenu.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
    }
    
    handleMenuKeydown(e) {
        if (!this.isOpen) return;
        
        const focusableElements = this.navMenu.querySelectorAll('.nav-link');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
});