/* ==========================================================================
   Authentication System - Spiritual Compass
   User signup, login, password recovery
   ========================================================================== */

class AuthenticationSystem {
    constructor() {
        this.initialized = false;
        this.userSession = this.loadUserSession();
        this.formValidators = {};
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.initialized) return;
        
        console.log('🔐 Initializing Authentication System');
        
        // Setup event listeners
        this.setupFormHandlers();
        this.setupModalHandlers();
        this.setupPasswordToggle();
        this.setupFormValidation();
        
        // Check if user is already logged in
        if (this.userSession && this.userSession.token) {
            this.redirectToMember();
        }
        
        this.initialized = true;
    }

    // ===== Form Handlers =====
    setupFormHandlers() {
        const signInForm = document.getElementById('signin-form');
        const signUpForm = document.getElementById('signup-form');
        const forgotForm = document.getElementById('forgot-form');

        if (signInForm) {
            signInForm.addEventListener('submit', (e) => this.handleSignIn(e));
        }
        
        if (signUpForm) {
            signUpForm.addEventListener('submit', (e) => this.handleSignUp(e));
        }
        
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }
    }

    setupModalHandlers() {
        // Handle modal opening/closing
        const signupLinks = document.querySelectorAll('.signup-link');
        const forgotLinks = document.querySelectorAll('.forgot-link');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        const overlays = document.querySelectorAll('.modal-overlay');

        signupLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('signup-modal');
            });
        });

        forgotLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAllModals();
                this.openModal('forgot-password-modal');
            });
        });

        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAllModals();
            });
        });

        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => this.closeAllModals());
        });

        // Handle hash navigation
        window.addEventListener('hashchange', () => this.handleHashNavigation());
        this.handleHashNavigation();
    }

    setupPasswordToggle() {
        const toggleButtons = document.querySelectorAll('.password-toggle');
        
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const field = btn.closest('.password-field');
                const input = field.querySelector('input[type="password"], input[type="text"]');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.setAttribute('aria-label', 'Hide password');
                    btn.title = 'Hide password';
                } else {
                    input.type = 'password';
                    btn.setAttribute('aria-label', 'Show password');
                    btn.title = 'Show password';
                }
            });
        });
    }

    setupFormValidation() {
        // Real-time validation
        const inputs = document.querySelectorAll('.form-input, .form-select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                // Clear error on input
                const errorElement = document.getElementById(`${input.id}-error`);
                if (errorElement && input.value) {
                    errorElement.textContent = '';
                    input.classList.remove('error');
                }
            });
        });

        // Password strength indicator
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.updatePasswordStrength(passwordInput));
        }
    }

    // ===== Form Submission Handlers =====
    async handleSignIn(e) {
        e.preventDefault();
        
        const form = e.target;
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value;
        
        // Validate
        if (!this.validateEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            return;
        }
        
        if (!password || password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            // Simulate API call (in production, this would be a real backend call)
            const response = await this.simulateAuth('signin', { email, password });
            
            if (response.success) {
                // Save user session
                this.saveUserSession(response.user, response.token);
                
                // Show success message
                this.showToast('Welcome back! Redirecting to your dashboard...', 'success');
                
                // Redirect after brief delay
                setTimeout(() => {
                    window.location.href = '/member/dashboard.html';
                }, 1500);
            } else {
                this.showError('signin', response.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            this.showError('signin', 'An error occurred. Please try again.');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    async handleSignUp(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate all fields
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const terms = formData.get('terms');

        let hasErrors = false;

        if (!name || name.length < 2) {
            this.showError('signup-name', 'Please enter your full name');
            hasErrors = true;
        }

        if (!this.validateEmail(email)) {
            this.showError('signup-email', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!password || password.length < 8) {
            this.showError('signup-password', 'Password must be at least 8 characters');
            hasErrors = true;
        }

        if (!terms) {
            this.showToast('You must agree to the Terms & Privacy Policy', 'warning');
            hasErrors = true;
        }

        if (hasErrors) return;

        // Show loading state
        this.setFormLoading(form, true);

        try {
            const response = await this.simulateAuth('signup', {
                name,
                email,
                password,
                spiritual_path: formData.get('spiritual_path'),
                newsletter: formData.get('newsletter') ? true : false
            });

            if (response.success) {
                // Save user session
                this.saveUserSession(response.user, response.token);
                
                // Show success message
                this.showToast('Account created successfully! Redirecting...', 'success');
                
                // Close modal and redirect
                this.closeAllModals();
                setTimeout(() => {
                    window.location.href = '/member/welcome.html';
                }, 1500);
            } else {
                this.showToast(response.message || 'Could not create account', 'error');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            this.showToast('An error occurred. Please try again.', 'error');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        
        const form = e.target;
        const email = form.querySelector('#forgot-email').value.trim();

        if (!this.validateEmail(email)) {
            this.showError('forgot-email', 'Please enter a valid email address');
            return;
        }

        this.setFormLoading(form, true);

        try {
            const response = await this.simulateAuth('forgot-password', { email });

            if (response.success) {
                this.showToast('Password reset link sent to ' + email, 'success');
                form.reset();
                
                setTimeout(() => {
                    this.closeAllModals();
                }, 2000);
            } else {
                this.showError('forgot-email', 'Email not found');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            this.showToast('An error occurred. Please try again.', 'error');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    // ===== Validation Methods =====
    validateField(input) {
        const name = input.name;
        let isValid = true;
        let errorMessage = '';

        if (input.name === 'email') {
            if (!this.validateEmail(input.value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        } else if (input.name === 'password') {
            if (input.value.length < 6) {
                errorMessage = 'Password must be at least 6 characters';
                isValid = false;
            }
        } else if (input.name === 'name') {
            if (input.value.trim().length < 2) {
                errorMessage = 'Please enter your full name';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showError(input.id, errorMessage);
        } else {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
            input.classList.remove('error');
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updatePasswordStrength(input) {
        const password = input.value;
        const strengthDiv = document.getElementById('password-strength');
        
        if (!strengthDiv) return;

        let strength = 0;
        let strengthLabel = '';
        let strengthClass = '';

        // Check password strength
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // Determine label and class
        if (password.length === 0) {
            strengthDiv.innerHTML = '';
        } else if (strength <= 1) {
            strengthLabel = '😬 Weak';
            strengthClass = 'strength-weak';
        } else if (strength <= 2) {
            strengthLabel = '😐 Fair';
            strengthClass = 'strength-fair';
        } else if (strength <= 3) {
            strengthLabel = '😊 Good';
            strengthClass = 'strength-good';
        } else {
            strengthLabel = '🔒 Strong';
            strengthClass = 'strength-strong';
        }

        if (strengthLabel) {
            strengthDiv.innerHTML = `<span class="${strengthClass}">${strengthLabel}</span>`;
        }
    }

    // ===== Modal Management =====
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input, select, textarea, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    handleHashNavigation() {
        const hash = window.location.hash;
        
        if (hash === '#signup') {
            this.openModal('signup-modal');
        } else if (hash === '#forgot-password') {
            this.openModal('forgot-password-modal');
        } else if (hash === '#signin') {
            this.closeAllModals();
        }
    }

    // ===== Utility Methods =====
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
        }
    }

    setFormLoading(form, isLoading) {
        const button = form.querySelector('button[type="submit"]');
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');

        if (isLoading) {
            button.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            button.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    showToast(message, type = 'info') {
        // Check if toast container exists, create if not
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.setAttribute('role', 'region');
            toastContainer.setAttribute('aria-live', 'polite');
            toastContainer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(toastContainer);
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                #toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 2000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 400px;
                }
                
                .toast {
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    animation: slideIn 0.3s ease-out;
                    word-wrap: break-word;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .toast-success {
                    background: #10b981;
                    color: white;
                }
                
                .toast-error {
                    background: #ef4444;
                    color: white;
                }
                
                .toast-warning {
                    background: #f59e0b;
                    color: white;
                }
                
                .toast-info {
                    background: #3b82f6;
                    color: white;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'status');
        
        const icon = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        }[type] || '•';
        
        toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ===== Session Management =====
    saveUserSession(user, token) {
        const session = {
            user,
            token,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('spiritual_compass_session', JSON.stringify(session));
        
        // Set session expiry (24 hours)
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('spiritual_compass_session_expiry', expiryTime);
    }

    loadUserSession() {
        const session = localStorage.getItem('spiritual_compass_session');
        const expiry = localStorage.getItem('spiritual_compass_session_expiry');

        if (!session || !expiry) return null;

        // Check if session has expired
        if (new Date().getTime() > parseInt(expiry)) {
            this.clearUserSession();
            return null;
        }

        return JSON.parse(session);
    }

    clearUserSession() {
        localStorage.removeItem('spiritual_compass_session');
        localStorage.removeItem('spiritual_compass_session_expiry');
    }

    redirectToMember() {
        // If user is logged in and on auth page, redirect to member area
        if (window.location.pathname === '/auth.html') {
            window.location.href = '/member/dashboard.html';
        }
    }

    // ===== Simulated Authentication (Replace with real API calls) =====
    async simulateAuth(action, data) {
        // This simulates an API call. In production, connect to your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                if (action === 'signin') {
                    // Simulate successful login
                    resolve({
                        success: true,
                        user: {
                            id: Math.random().toString(36).substr(2, 9),
                            email: data.email,
                            name: 'Spiritual Seeker'
                        },
                        token: 'mock_token_' + Math.random().toString(36).substr(2, 20)
                    });
                } else if (action === 'signup') {
                    resolve({
                        success: true,
                        user: {
                            id: Math.random().toString(36).substr(2, 9),
                            email: data.email,
                            name: data.name,
                            spiritual_path: data.spiritual_path,
                            created_at: new Date().toISOString()
                        },
                        token: 'mock_token_' + Math.random().toString(36).substr(2, 20)
                    });
                } else if (action === 'forgot-password') {
                    resolve({
                        success: true,
                        message: 'Reset link sent'
                    });
                }
            }, 1000);
        });
    }
}

// Initialize authentication system when script loads
const auth = new AuthenticationSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthenticationSystem;
}