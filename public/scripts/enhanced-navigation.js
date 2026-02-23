// ENHANCED NAVIGATION & SMOOTH UX FEATURES

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');
    const pageContainer = document.querySelector('.page-container');
    
    // Initialize page animations
    setTimeout(() => {
        if (pageContainer) {
            pageContainer.style.animation = 'pageLoadFade 0.8s ease-out forwards';
        }
    }, 100);

    // Scroll-based navigation effects
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavigation() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop effect
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update scroll progress
        if (scrollProgress) {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (currentScrollY / documentHeight) * 100;
            scrollProgress.style.setProperty('--scroll-progress', `${Math.min(scrollPercentage, 100)}%`);
            scrollProgress.querySelector('::before').style.width = `${Math.min(scrollPercentage, 100)}%`;
        }
        
        // Show/hide back to top button
        if (backToTop) {
            if (currentScrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    // Throttled scroll handler
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    }

    // Update scroll progress bar width directly
    function updateScrollProgress() {
        if (scrollProgress) {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (window.scrollY / documentHeight) * 100;
            const progressBar = scrollProgress.querySelector('::before') || scrollProgress;
            if (scrollProgress.querySelector('::before')) {
                scrollProgress.querySelector('::before').style.width = `${Math.min(scrollPercentage, 100)}%`;
            } else {
                // Create the progress bar if it doesn't exist
                scrollProgress.style.background = `linear-gradient(90deg, var(--primary) ${Math.min(scrollPercentage, 100)}%, rgba(74, 144, 164, 0.1) ${Math.min(scrollPercentage, 100)}%)`;
            }
        }
    }

    // Mobile navigation toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Update ARIA attributes
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Close mobile nav when clicking nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth scrolling for anchor links
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinkItems.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active section highlighting
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150; // Offset for fixed nav
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Intersection Observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards for animation
    const animatedElements = document.querySelectorAll('.about-card, .wisdom-card, .community-card');
    animatedElements.forEach(element => {
        cardObserver.observe(element);
    });

    // Button loading states
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.type === 'submit') {
            button.addEventListener('click', function() {
                this.classList.add('loading');
                // Remove loading state after 2 seconds (or when form submission completes)
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            });
        }
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile nav
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Alt + T focuses search/main CTA
        if (e.altKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            const mainCTA = document.querySelector('.btn-primary');
            if (mainCTA) {
                mainCTA.focus();
            }
        }
    });

    // Progressive enhancement for form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Add loading animation to parent group on focus
            input.addEventListener('focus', function() {
                const group = this.closest('.form-group');
                if (group) {
                    group.classList.add('focused');
                }
            });
            
            input.addEventListener('blur', function() {
                const group = this.closest('.form-group');
                if (group) {
                    group.classList.remove('focused');
                }
            });
        });
    });

    // Add scroll progress CSS dynamically since ::before can't be manipulated
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            width: 0%;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    window.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', function() {
        // Close mobile nav on resize
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Initial calls
    updateNavigation();
    updateActiveSection();
    updateScrollProgress();

    // Preload critical resources
    const criticalImages = ['/images/compass-og.jpg', '/images/compass-icon.svg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    console.log('🧭 Spiritual Compass - Enhanced navigation loaded successfully');
});