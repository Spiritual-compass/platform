// Dark Mode Toggle Functionality

class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        this.createToggleButton();
        this.loadSavedTheme();
        this.addEventListeners();
    }

    createToggleButton() {
        // Check if toggle already exists
        if (document.querySelector('.dark-mode-toggle')) {
            return;
        }

        // Create the toggle button
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = '🌙'; // Default moon icon

        // Add to navigation
        const nav = document.querySelector('nav');
        if (nav) {
            // Try to add to an existing container in nav
            const navContainer = nav.querySelector('.container, .nav-container') || nav;
            navContainer.style.position = 'relative';
            
            // Position the button
            toggle.style.position = 'absolute';
            toggle.style.right = '20px';
            toggle.style.top = '50%';
            toggle.style.transform = 'translateY(-50%)';
            toggle.style.zIndex = '1000';
            
            navContainer.appendChild(toggle);
        }
    }

    loadSavedTheme() {
        // Check for saved theme preference or default to system preference
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
            if (toggle) toggle.innerHTML = '☀️'; // Sun icon for dark mode
        } else {
            html.setAttribute('data-theme', 'light');
            body.setAttribute('data-theme', 'light');
            if (toggle) toggle.innerHTML = '🌙'; // Moon icon for light mode
        }
        
        // Save preference
        localStorage.setItem('spiritual-compass-theme', theme);
        
        // Update CSS custom properties for any elements that need it
        this.updateCustomProperties(theme);
    }

    updateCustomProperties(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--theme', 'dark');
        } else {
            root.style.setProperty('--theme', 'light');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    addEventListeners() {
        // Toggle button click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('dark-mode-toggle')) {
                this.toggleTheme();
            }
        });

        // Keyboard shortcut: Ctrl/Cmd + Shift + D
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('spiritual-compass-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Update theme when page loads/refreshes
        document.addEventListener('DOMContentLoaded', () => {
            this.loadSavedTheme();
        });
    }
}

// Initialize dark mode when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DarkModeManager();
    });
} else {
    new DarkModeManager();
}