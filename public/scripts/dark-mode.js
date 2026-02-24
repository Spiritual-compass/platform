/* 🌙 DARK MODE CONTROLLER - Spiritual Compass */

class DarkModeController {
    constructor() {
        this.init();
    }

    init() {
        this.createToggleButton();
        this.loadSavedTheme();
        this.bindEvents();
    }

    // Create the toggle button and add it to navigation
    createToggleButton() {
        const nav = document.querySelector('.nav-container');
        if (!nav) return;

        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        toggleButton.setAttribute('title', 'Switch between light and dark modes');
        
        // Add to navigation (before mobile toggle if it exists)
        const mobileToggle = nav.querySelector('.nav-toggle');
        if (mobileToggle) {
            nav.insertBefore(toggleButton, mobileToggle);
        } else {
            nav.appendChild(toggleButton);
        }

        this.toggleButton = toggleButton;
    }

    // Load saved theme or detect system preference
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('spiritual-compass-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = 'light';
        
        if (savedTheme) {
            theme = savedTheme;
        } else if (systemPrefersDark) {
            theme = 'dark';
        }
        
        this.setTheme(theme, false);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem('spiritual-compass-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light', true);
                }
            });
    }

    // Bind event listeners
    bindEvents() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Keyboard shortcut: Ctrl/Cmd + Shift + D
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // Toggle between light and dark themes
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    // Set the theme
    setTheme(theme, animate = true) {
        const root = document.documentElement;
        
        // Add transition class for smooth animation
        if (animate) {
            root.classList.add('theme-transitioning');
            setTimeout(() => {
                root.classList.remove('theme-transitioning');
            }, 300);
        }

        // Set theme
        root.setAttribute('data-theme', theme);
        
        // Save preference
        localStorage.setItem('spiritual-compass-theme', theme);
        
        // Update toggle button accessibility
        if (this.toggleButton) {
            const isDark = theme === 'dark';
            this.toggleButton.setAttribute('aria-pressed', isDark.toString());
            this.toggleButton.setAttribute('title', 
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }

        // Announce to screen readers
        this.announceThemeChange(theme);
        
        // Update any charts or visualizations that need theme-aware colors
        this.updateVisualizationsForTheme(theme);
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme, previousTheme: theme === 'dark' ? 'light' : 'dark' }
        }));
    }

    // Announce theme change to screen readers
    announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Switched to ${theme} mode`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Update visualizations for theme change
    updateVisualizationsForTheme(theme) {
        // Update any charts, graphs, or interactive elements
        // This will be useful when we add the interactive compass widget
        
        // Example: Update CSS custom properties for dynamic content
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--dynamic-accent', '#a855f7');
            document.documentElement.style.setProperty('--dynamic-text', '#e6edf3');
        } else {
            document.documentElement.style.setProperty('--dynamic-accent', '#6366f1');
            document.documentElement.style.setProperty('--dynamic-text', '#1f2937');
        }
    }

    // Get current theme
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    // Public method to check if dark mode is active
    isDarkMode() {
        return this.getCurrentTheme() === 'dark';
    }
}

// Enhanced theme transition styles
const themeTransitionStyles = `
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *::before,
    .theme-transitioning *::after {
        transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, 
                   box-shadow 0.3s ease, text-shadow 0.3s ease !important;
    }
`;

// Add transition styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionStyles;
document.head.appendChild(styleSheet);

// Initialize dark mode controller when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeController = new DarkModeController();
    });
} else {
    window.darkModeController = new DarkModeController();
}

// Export for use in other scripts
window.DarkModeController = DarkModeController;