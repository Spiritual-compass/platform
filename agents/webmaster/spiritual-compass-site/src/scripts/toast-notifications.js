/* ==========================================================================
   Premium Toast Notification System
   Elegant user feedback with accessibility support
   ========================================================================== */

class ToastNotifications {
    constructor() {
        this.toasts = [];
        this.container = null;
        this.createContainer();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'false');
        this.container.style.cssText = `
            position: fixed;
            top: var(--space-4);
            right: var(--space-4);
            z-index: var(--z-toast);
            pointer-events: none;
            max-width: 400px;
        `;
        
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', options = {}) {
        const toast = this.createToast(message, type, options);
        this.container.appendChild(toast);
        this.toasts.push(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto-hide after duration
        const duration = options.duration || (type === 'error' ? 6000 : 4000);
        setTimeout(() => {
            this.hide(toast);
        }, duration);
        
        // Announce to screen readers
        this.announceToScreenReader(message);
        
        return toast;
    }
    
    createToast(message, type, options) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toast.style.cssText = `
            margin-bottom: var(--space-2);
            pointer-events: auto;
        `;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" aria-label="Close notification">×</button>
            </div>
        `;
        
        // Add close functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hide(toast);
        });
        
        return toast;
    }
    
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        return icons[type] || icons.info;
    }
    
    hide(toast) {
        toast.classList.remove('show');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
                this.toasts = this.toasts.filter(t => t !== toast);
            }
        }, 300);
    }
    
    hideAll() {
        this.toasts.forEach(toast => {
            this.hide(toast);
        });
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Convenience methods
    success(message, options) {
        return this.show(message, 'success', options);
    }
    
    error(message, options) {
        return this.show(message, 'error', options);
    }
    
    warning(message, options) {
        return this.show(message, 'warning', options);
    }
    
    info(message, options) {
        return this.show(message, 'info', options);
    }
}

// Create global instance
window.Toast = new ToastNotifications();

// Example usage for testing (can be removed in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Test notifications on localhost
    setTimeout(() => {
        window.Toast.info('Welcome to the enhanced Spiritual Compass experience! ✨');
    }, 2000);
}