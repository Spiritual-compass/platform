// Mobile Navigation Fix
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) {
        console.log('Creating mobile nav elements...');
        
        // Create hamburger menu if it doesn't exist
        const nav = document.querySelector('nav');
        if (nav) {
            const container = nav.querySelector('.nav-container, .container') || nav;
            
            // Create hamburger button if not exists
            if (!navToggle) {
                const hamburger = document.createElement('button');
                hamburger.className = 'nav-toggle';
                hamburger.innerHTML = '<span></span><span></span><span></span>';
                hamburger.setAttribute('aria-label', 'Toggle navigation');
                container.appendChild(hamburger);
            }
        }
    }
    
    // Add click functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-toggle') || e.target.parentElement?.classList.contains('nav-toggle')) {
            e.preventDefault();
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
                
                // Animate hamburger
                const toggle = document.querySelector('.nav-toggle');
                if (toggle) {
                    toggle.classList.toggle('active');
                }
            }
        }
        
        // Close menu when clicking nav links on mobile
        if (e.target.classList.contains('nav-link')) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const toggle = document.querySelector('.nav-toggle');
                if (toggle) {
                    toggle.classList.remove('active');
                }
            }
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const toggle = document.querySelector('.nav-toggle');
            if (navLinks) navLinks.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        }
    });
    
    // Enhanced Dark Mode Manager with fixed positioning
    if (typeof DarkModeManager === 'undefined') {
        window.DarkModeManager = class DarkModeManager {
            constructor() {
                this.init();
            }

            init() {
                this.createToggleButton();
                this.loadSavedTheme();
                this.addEventListeners();
            }

            createToggleButton() {
                // Remove any existing toggle
                const existing = document.querySelector('.dark-mode-toggle');
                if (existing) existing.remove();

                // Create new toggle button
                const toggle = document.createElement('button');
                toggle.className = 'dark-mode-toggle';
                toggle.setAttribute('aria-label', 'Toggle dark mode');
                toggle.innerHTML = '🌙';

                // Add to body (fixed positioning)
                document.body.appendChild(toggle);
            }

            loadSavedTheme() {
                const savedTheme = localStorage.getItem('spiritual-compass-theme');
                const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (savedTheme) {
                    this.setTheme(savedTheme);
                } else if (systemDarkMode) {
                    this.setTheme('dark');
                } else {
                    this.setTheme('light');
                }
            }

            setTheme(theme) {
                const html = document.documentElement;
                const body = document.body;
                const toggle = document.querySelector('.dark-mode-toggle');
                
                if (theme === 'dark') {
                    html.setAttribute('data-theme', 'dark');
                    body.setAttribute('data-theme', 'dark');
                    if (toggle) toggle.innerHTML = '☀️';
                } else {
                    html.setAttribute('data-theme', 'light');
                    body.setAttribute('data-theme', 'light');
                    if (toggle) toggle.innerHTML = '🌙';
                }
                
                localStorage.setItem('spiritual-compass-theme', theme);
            }

            toggleTheme() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            }

            addEventListeners() {
                document.addEventListener('click', (e) => {
                    if (e.target.classList.contains('dark-mode-toggle')) {
                        this.toggleTheme();
                    }
                });

                document.addEventListener('keydown', (e) => {
                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                        e.preventDefault();
                        this.toggleTheme();
                    }
                });
            }
        };
        
        // Initialize dark mode
        new window.DarkModeManager();
    }
});