// Assessment Form Logic
class SpiritualAssessment {
    constructor() {
        this.currentGroup = 1;
        this.totalGroups = 4;
        this.form = document.getElementById('assessmentForm');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        
        this.init();
    }
    
    init() {
        this.updateProgress();
        this.bindEvents();
        this.validateCurrentGroup();
    }
    
    bindEvents() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.nextGroup());
        this.prevBtn.addEventListener('click', () => this.previousGroup());
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Input validation
        this.form.addEventListener('change', () => this.validateCurrentGroup());
        this.form.addEventListener('input', () => this.validateCurrentGroup());
        
        // Smooth scrolling to top on group change
        window.addEventListener('beforeunload', () => {
            if (this.hasUnsavedChanges()) {
                return 'You have unsaved changes. Are you sure you want to leave?';
            }
        });
    }
    
    nextGroup() {
        if (!this.validateCurrentGroup()) {
            this.showValidationErrors();
            return;
        }
        
        if (this.currentGroup < this.totalGroups) {
            this.hideGroup(this.currentGroup);
            this.currentGroup++;
            this.showGroup(this.currentGroup);
            this.updateProgress();
            this.updateButtons();
            this.scrollToTop();
        }
    }
    
    previousGroup() {
        if (this.currentGroup > 1) {
            this.hideGroup(this.currentGroup);
            this.currentGroup--;
            this.showGroup(this.currentGroup);
            this.updateProgress();
            this.updateButtons();
            this.scrollToTop();
        }
    }
    
    showGroup(groupNumber) {
        const group = document.querySelector(`[data-group="${groupNumber}"]`);
        if (group) {
            group.classList.add('active');
            // Mark completed groups
            if (groupNumber < this.currentGroup) {
                group.classList.add('completed');
            }
        }
    }
    
    hideGroup(groupNumber) {
        const group = document.querySelector(`[data-group="${groupNumber}"]`);
        if (group) {
            group.classList.remove('active');
        }
    }
    
    updateProgress() {
        const progress = (this.currentGroup / this.totalGroups) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Step ${this.currentGroup} of ${this.totalGroups}`;
    }
    
    updateButtons() {
        // Previous button
        this.prevBtn.style.display = this.currentGroup > 1 ? 'inline-flex' : 'none';
        
        // Next/Submit buttons
        if (this.currentGroup === this.totalGroups) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'inline-flex';
        } else {
            this.nextBtn.style.display = 'inline-flex';
            this.submitBtn.style.display = 'none';
        }
    }
    
    validateCurrentGroup() {
        const currentGroupElement = document.querySelector(`[data-group="${this.currentGroup}"]`);
        const questions = currentGroupElement.querySelectorAll('.question');
        let isValid = true;
        
        questions.forEach(question => {
            const isQuestionValid = this.validateQuestion(question);
            if (!isQuestionValid) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateQuestion(questionElement) {
        const radioInputs = questionElement.querySelectorAll('input[type="radio"]');
        const checkboxInputs = questionElement.querySelectorAll('input[type="checkbox"]');
        const textInputs = questionElement.querySelectorAll('input[type="text"], input[type="email"], textarea');
        
        let isValid = true;
        
        // Validate radio groups (at least one selected)
        if (radioInputs.length > 0) {
            const radioName = radioInputs[0].name;
            const isRadioSelected = document.querySelector(`input[name="${radioName}"]:checked`);
            if (!isRadioSelected) {
                isValid = false;
            }
        }
        
        // Validate required text inputs
        textInputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                }
            }
        });
        
        // Visual feedback
        if (isValid) {
            questionElement.classList.remove('error');
            questionElement.classList.add('completed');
        } else {
            questionElement.classList.remove('completed');
        }
        
        return isValid;
    }
    
    showValidationErrors() {
        const currentGroupElement = document.querySelector(`[data-group="${this.currentGroup}"]`);
        const questions = currentGroupElement.querySelectorAll('.question');
        
        questions.forEach(question => {
            if (!this.validateQuestion(question)) {
                question.classList.add('error');
                
                // Add validation message if not exists
                if (!question.querySelector('.validation-message')) {
                    const message = document.createElement('div');
                    message.className = 'validation-message';
                    message.textContent = 'Please answer this question to continue.';
                    question.appendChild(message);
                }
                
                // Scroll to first error
                if (!document.querySelector('.question.error:first-child')) {
                    question.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateCurrentGroup()) {
            this.showValidationErrors();
            return;
        }
        
        // Show loading state
        this.form.classList.add('submitting');
        this.submitBtn.textContent = 'Processing...';
        this.submitBtn.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            const responses = this.collectResponses(formData);
            
            // Add metadata
            formData.append('assessment-data', JSON.stringify(responses));
            formData.append('completed-at', new Date().toISOString());
            formData.append('user-agent', navigator.userAgent);
            
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                this.showSuccessMessage();
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            this.showErrorMessage();
        } finally {
            this.form.classList.remove('submitting');
            this.submitBtn.textContent = 'Get My Results';
            this.submitBtn.disabled = false;
        }
    }
    
    collectResponses(formData) {
        const responses = {};
        
        // Group responses by category
        for (let [key, value] of formData.entries()) {
            if (key === 'form-name') continue;
            
            if (responses[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(responses[key])) {
                    responses[key].push(value);
                } else {
                    responses[key] = [responses[key], value];
                }
            } else {
                responses[key] = value;
            }
        }
        
        return responses;
    }
    
    showSuccessMessage() {
        const successHTML = `
            <div class="success-message">
                <div class="success-content">
                    <div class="success-icon">🎉</div>
                    <h2>Thank You!</h2>
                    <p>Your spiritual assessment has been submitted successfully.</p>
                    <p>We'll send personalized recommendations to your email within 24 hours.</p>
                    <div class="success-actions">
                        <a href="/" class="btn btn-primary">Return Home</a>
                        <a href="/#wisdom" class="btn btn-secondary">Today's Wisdom</a>
                    </div>
                </div>
            </div>
        `;
        
        this.form.innerHTML = successHTML;
        this.scrollToTop();
    }
    
    showErrorMessage() {
        const errorHTML = `
            <div class="error-message">
                <div class="error-content">
                    <div class="error-icon">⚠️</div>
                    <h3>Something went wrong</h3>
                    <p>We couldn't submit your assessment right now. Please try again or contact us at guidance@spiritual-compass.com</p>
                    <button type="button" class="btn btn-primary" onclick="location.reload()">Try Again</button>
                </div>
            </div>
        `;
        
        const currentGroupElement = document.querySelector(`[data-group="${this.currentGroup}"]`);
        currentGroupElement.innerHTML = errorHTML;
    }
    
    hasUnsavedChanges() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        return Array.from(inputs).some(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                return input.checked;
            }
            return input.value.trim() !== '';
        });
    }
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Additional CSS for success/error messages
const additionalStyles = `
.success-message,
.error-message {
    padding: var(--space-2xl);
    text-align: center;
}

.success-content,
.error-content {
    max-width: 500px;
    margin: 0 auto;
}

.success-icon,
.error-icon {
    font-size: 4rem;
    margin-bottom: var(--space-lg);
}

.success-content h2,
.error-content h3 {
    color: var(--text-primary);
    margin-bottom: var(--space-md);
}

.success-content p,
.error-content p {
    margin-bottom: var(--space-md);
    font-size: 1.125rem;
}

.success-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
    margin-top: var(--space-xl);
}

@media (max-width: 768px) {
    .success-actions {
        flex-direction: column;
    }
    
    .success-actions .btn {
        width: 100%;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpiritualAssessment();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});