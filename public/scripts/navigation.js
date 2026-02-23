/* SPIRITUAL COMPASS - ENHANCED NAVIGATION */

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    // Create mobile menu toggle if it doesn't exist
    if (!navToggle) {
        createMobileToggle();
    }
    
    function createMobileToggle() {
        const navContainer = document.querySelector('.nav-container');
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        toggle.setAttribute('aria-expanded', 'false');
        
        // Create hamburger icon
        toggle.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        // Create overlay for mobile menu
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        navContainer.appendChild(toggle);
        
        // Add event listeners
        toggle.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    function toggleMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        const isOpen = toggle.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        links.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('nav-open');
        
        // Animate menu items
        const linkItems = links.querySelectorAll('.nav-link');
        linkItems.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('animate-in');
        });
    }
    
    function closeMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('nav-open');
        
        // Reset animations
        const linkItems = links.querySelectorAll('.nav-link');
        linkItems.forEach(link => {
            link.classList.remove('animate-in');
            link.style.animationDelay = '';
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Enhanced smooth scrolling with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Add scroll-based navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightCurrentSection() {
        const scrollY = window.pageYOffset;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => link.classList.remove('current'));
                if (correspondingLink) {
                    correspondingLink.classList.add('current');
                }
            }
        });
    }
    
    // Throttled scroll listener for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightCurrentSection, 10);
    });
    
    // Initialize on load
    highlightCurrentSection();
});