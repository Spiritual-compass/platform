/* ==========================================================================
   Enhanced Animations & Visual Polish
   Smooth reveal animations and interaction enhancements
   ========================================================================== */

class EnhancedAnimations {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        this.staggerElements = document.querySelectorAll('.stagger-in');
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                             document.documentElement.getAttribute('data-motion') === 'reduced';
        
        this.init();
    }
    
    init() {
        // Set up intersection observer for reveal animations
        this.setupRevealAnimations();
        
        // Set up staggered animations
        this.setupStaggeredAnimations();
        
        // Add page loaded class for transitions
        this.setupPageTransitions();
        
        // Enhanced focus management
        this.setupFocusEnhancements();
        
        // Add scroll-based effects
        this.setupScrollEffects();
    }
    
    setupRevealAnimations() {
        if (this.isReducedMotion) {
            // For reduced motion, just show elements immediately
            this.revealElements.forEach(el => {
                el.classList.add('visible');
            });
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        this.revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
    
    setupStaggeredAnimations() {
        if (this.isReducedMotion) {
            this.staggerElements.forEach(el => {
                el.classList.add('animate');
            });
            return;
        }
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        this.staggerElements.forEach(el => {
            // Add stagger class to children
            Array.from(el.children).forEach(child => {
                child.classList.add('stagger-in');
            });
            staggerObserver.observe(el);
        });
    }
    
    setupPageTransitions() {
        // Add page loaded class after content is ready
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            
            // Trigger initial animations
            setTimeout(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.classList.add('animate-in');
                }
            }, 200);
        });
    }
    
    setupFocusEnhancements() {
        // Add custom focus handling for better UX
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', (e) => {
                e.target.setAttribute('data-focused', 'true');
            });
            
            element.addEventListener('blur', (e) => {
                e.target.removeAttribute('data-focused');
            });
        });
    }
    
    setupScrollEffects() {
        if (this.isReducedMotion) return;
        
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax effect on hero
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Utility method to trigger custom animations
    animateElement(element, animation = 'fadeInUp', duration = 600) {
        if (this.isReducedMotion) return;
        
        element.style.animation = `${animation} ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
    
    // Method to handle dynamic content loading
    handleDynamicContent(container) {
        const newElements = container.querySelectorAll('.reveal');
        newElements.forEach(el => {
            if (!this.isReducedMotion) {
                el.classList.add('visible');
            }
        });
    }
}

// Initialize enhanced animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animations = new EnhancedAnimations();
    
    // Make it available globally for other scripts
    window.EnhancedAnimations = animations;
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    [data-focused="true"] {
        position: relative;
        z-index: 10;
    }
`;

document.head.appendChild(style);