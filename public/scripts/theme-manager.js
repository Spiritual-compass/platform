// UNIFIED THEME MANAGER - Works across all pages

class ThemeManager {
    constructor() {
        this.storageKey = 'spiritual-compass-theme';
        this.init();
    }
    
    init() {
        this.addToggleToNavigation();
        this.loadSavedTheme();
        this.addEventListeners();
    }
    
    addToggleToNavigation() {
        // Add dark mode toggle to existing navigation
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.dark-mode-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'dark-mode-toggle';
            toggle.setAttribute('aria-label', 'Toggle dark mode');
            toggle.innerHTML = '🌙';
            toggle.type = 'button';
            
            // Insert before the last nav link or at the end
            navLinks.appendChild(toggle);
        }
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
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
        const toggle = document.querySelector('.dark-mode-toggle');
        
        // Apply theme
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (toggle) toggle.innerHTML = '☀️';
        } else {
            html.setAttribute('data-theme', 'light');  
            if (toggle) toggle.innerHTML = '🌙';
        }
        
        // Save preference
        localStorage.setItem(this.storageKey, theme);
        
        // Update toggle ARIA label
        if (toggle) {
            toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
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
                e.preventDefault();
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
            if (!localStorage.getItem(this.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });
} else {
    new ThemeManager();
}

// Prevent flash of unstyled content (FOUC) for dark mode
(function() {
    const theme = localStorage.getItem('spiritual-compass-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();