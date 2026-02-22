// Main site JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Form submissions (Netlify)
    const forms = document.querySelectorAll('form[netlify]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage(this);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage(this);
            })
            .finally(() => {
                button.textContent = originalText;
                button.disabled = false;
            });
        });
    });
    
    // Import expanded wisdom quotes
    // Note: In production, this would be loaded via import or script tag
    // For now, we'll load it dynamically
    let wisdomQuotes = [];
    
    // Load expanded quotes if available
    if (typeof expandedWisdomQuotes !== 'undefined') {
        wisdomQuotes = expandedWisdomQuotes;
    } else {
        // Fallback to basic quotes if expanded collection not loaded
        wisdomQuotes = [
            {
                quote: "Peace comes from within. Do not seek it without.",
                author: "Buddha",
                tradition: "Buddhism",
                theme: "Peace"
            },
            {
                quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
                author: "Apostle Peter",
                tradition: "Christianity",
                theme: "Love"
            },
            {
                quote: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
                author: "Prophet Muhammad",
                tradition: "Islam",
                theme: "Compassion"
            },
            {
                quote: "Who is wise? One who learns from every person.",
                author: "Ben Zoma",
                tradition: "Judaism",
                theme: "Wisdom"
            },
            {
                quote: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
                author: "Lord Krishna",
                tradition: "Hinduism",
                theme: "Purpose"
            },
            {
                quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
                author: "Cicero",
                tradition: "Secular",
                theme: "Gratitude"
            }
        ];
    }
    
    // Rotate wisdom quote every 24 hours or on page load
    function updateWisdomQuote() {
        const wisdomCard = document.querySelector('.wisdom-quote');
        if (wisdomCard) {
            const today = new Date().getDate();
            const quoteIndex = today % wisdomQuotes.length;
            const todaysWisdom = wisdomQuotes[quoteIndex];
            
            const blockquote = wisdomCard.querySelector('blockquote');
            const cite = wisdomCard.querySelector('cite');
            const traditionLabel = document.querySelector('.tradition-label');
            const themeLabel = document.querySelector('.theme-label');
            
            if (blockquote) blockquote.textContent = `"${todaysWisdom.quote}"`;
            if (cite) cite.textContent = `— ${todaysWisdom.author}`;
            if (traditionLabel) traditionLabel.textContent = todaysWisdom.tradition;
            if (themeLabel) themeLabel.textContent = todaysWisdom.theme;
        }
    }
    
    updateWisdomQuote();
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .community-card, .wisdom-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed later)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Easter egg - compass needle follows mouse
    const compassNeedle = document.querySelector('.compass-needle');
    if (compassNeedle) {
        let mouseX = 0, mouseY = 0;
        let compassX = 0, compassY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            const compass = compassNeedle.closest('.compass-visual');
            if (compass) {
                const rect = compass.getBoundingClientRect();
                compassX = rect.left + rect.width / 2;
                compassY = rect.top + rect.height / 2;
                
                const angle = Math.atan2(mouseY - compassY, mouseX - compassX);
                const degrees = (angle * 180 / Math.PI) + 90;
                
                compassNeedle.style.transform = `translate(-50%, -50%) rotate(${degrees}deg)`;
            }
        });
    }
});

// Utility functions
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <h3>Thank you!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
    `;
    
    form.style.display = 'none';
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successDiv.remove();
    }, 5000);
}

function showErrorMessage(form) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <h3>Oops!</h3>
            <p>Something went wrong. Please try again or contact us directly.</p>
        </div>
    `;
    
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Additional CSS for form feedback
const formFeedbackCSS = `
.form-success,
.form-error {
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    margin-top: var(--space-md);
    text-align: center;
}

.form-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid var(--peace-green);
    color: var(--peace-green);
}

.form-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    color: #ef4444;
}

.success-icon,
.error-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
    display: block;
}

.success-content h3,
.error-content h3 {
    margin-bottom: var(--space-sm);
}

.nav.scrolled {
    background-color: rgba(249, 250, 251, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow-md);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: slideUp 0.6s ease-out;
}

@media (prefers-reduced-motion: reduce) {
    .animate-in {
        animation: none;
    }
    
    html {
        scroll-behavior: auto;
    }
}
`;

// Inject form feedback CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = formFeedbackCSS;
document.head.appendChild(styleSheet);