/* ENHANCED SPIRITUAL ASSESSMENT EXPERIENCE */

// Spiritual journey milestones
const spiritualMilestones = [
    { step: 1, message: "🌱 Beginning your spiritual exploration..." },
    { step: 3, message: "🌿 Discovering your core values..." },
    { step: 6, message: "🌸 Exploring different traditions..." },
    { step: 9, message: "🌳 Understanding your spiritual needs..." },
    { step: 12, message: "✨ Revealing your path preferences..." },
    { step: 15, message: "🧭 Your spiritual compass is ready!" }
];

class SpiritualJourneyProgress {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 15;
        this.initializeJourneyPath();
        this.addMilestoneTracking();
    }

    initializeJourneyPath() {
        const progressContainer = document.querySelector('.assessment-progress');
        if (!progressContainer) return;

        // Create spiritual journey path
        const journeyPath = document.createElement('div');
        journeyPath.className = 'spiritual-journey-path';
        
        const pathLine = document.createElement('div');
        pathLine.className = 'journey-path-line';
        
        const pathProgress = document.createElement('div');
        pathProgress.className = 'journey-path-progress';
        pathProgress.style.width = '0%';
        
        pathLine.appendChild(pathProgress);
        journeyPath.appendChild(pathLine);

        // Create journey steps (showing key milestones)
        const milestoneSteps = [1, 3, 6, 9, 12, 15];
        const stepEmojis = ['🌱', '🌿', '🌸', '🌳', '✨', '🧭'];
        
        milestoneSteps.forEach((stepNum, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'journey-step upcoming';
            stepElement.setAttribute('data-step', stepNum);
            stepElement.textContent = stepEmojis[index];
            stepElement.setAttribute('aria-label', `Step ${stepNum} of ${this.totalSteps}`);
            journeyPath.appendChild(stepElement);
        });

        // Insert journey path before existing progress bar
        const existingProgress = progressContainer.querySelector('.progress-bar');
        progressContainer.insertBefore(journeyPath, existingProgress);

        // Add milestone text element
        const milestoneText = document.createElement('div');
        milestoneText.className = 'progress-milestone';
        milestoneText.id = 'progressMilestone';
        progressContainer.appendChild(milestoneText);
    }

    updateProgress(currentQuestion) {
        this.currentStep = currentQuestion;
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progressPercent = ((currentQuestion - 1) / this.totalSteps) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }

        // Update journey path
        const pathProgress = document.querySelector('.journey-path-progress');
        if (pathProgress) {
            pathProgress.style.width = `${progressPercent}%`;
        }

        // Update journey steps
        const steps = document.querySelectorAll('.journey-step');
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum < currentQuestion) {
                step.className = 'journey-step completed';
            } else if (stepNum === currentQuestion) {
                step.className = 'journey-step current';
            } else {
                step.className = 'journey-step upcoming';
            }
        });

        // Show milestone messages
        this.showMilestone(currentQuestion);

        // Update progress text
        const progressText = document.getElementById('currentQuestion');
        if (progressText) {
            progressText.textContent = currentQuestion;
        }
    }

    showMilestone(currentQuestion) {
        const milestone = spiritualMilestones.find(m => m.step === currentQuestion);
        const milestoneElement = document.getElementById('progressMilestone');
        
        if (milestone && milestoneElement) {
            milestoneElement.textContent = milestone.message;
            milestoneElement.style.opacity = '0';
            milestoneElement.style.animation = 'none';
            
            // Trigger reflow and animate
            setTimeout(() => {
                milestoneElement.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }, 100);
            
            // Hide after 3 seconds
            setTimeout(() => {
                milestoneElement.style.opacity = '0';
            }, 3000);
        }
    }

    addMilestoneTracking() {
        // Enhanced answer selection with animations
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option')) {
                this.handleAnswerSelection(e.target);
            }
        });

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('answer-option')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleAnswerSelection(e.target);
                }
            }
        });
    }

    handleAnswerSelection(answerElement) {
        // Remove previous selections
        const allAnswers = document.querySelectorAll('.answer-option');
        allAnswers.forEach(answer => answer.classList.remove('selected'));
        
        // Add selection to clicked answer
        answerElement.classList.add('selected');
        
        // Add subtle celebration animation for significant milestones
        const currentQ = this.currentStep;
        if ([3, 6, 9, 12, 15].includes(currentQ)) {
            this.addCelebrationEffect(answerElement);
        }
        
        // Auto-advance after selection (with delay)
        setTimeout(() => {
            this.advanceToNextQuestion();
        }, 800);
    }

    addCelebrationEffect(element) {
        // Create sparkle effect
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleEffect 1s ease-out forwards;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }

    advanceToNextQuestion() {
        // This would integrate with existing assessment logic
        // For now, just update progress if next question exists
        if (this.currentStep < this.totalSteps) {
            this.updateProgress(this.currentStep + 1);
            
            // Add slide-in animation to new question
            const assessmentCard = document.querySelector('.assessment-card');
            if (assessmentCard) {
                assessmentCard.classList.add('slide-in');
                setTimeout(() => {
                    assessmentCard.classList.remove('slide-in');
                }, 600);
            }
        } else {
            this.showCompletionAnimation();
        }
    }

    showCompletionAnimation() {
        const assessmentContainer = document.querySelector('.assessment-container');
        if (assessmentContainer) {
            const completionDiv = document.createElement('div');
            completionDiv.className = 'assessment-complete';
            completionDiv.innerHTML = `
                <h3>🎉 Your Spiritual Journey Assessment is Complete!</h3>
                <p>Your personalized spiritual compass is being prepared...</p>
                <div class="completion-spinner">
                    <div class="compass-icon" style="font-size: 3rem; animation: gentleRotate 2s linear infinite;">🧭</div>
                </div>
            `;
            
            // Replace assessment content with completion
            assessmentContainer.innerHTML = '';
            assessmentContainer.appendChild(completionDiv);
        }
    }
}

// Enhanced question transitions
class QuestionTransitions {
    constructor() {
        this.setupTransitions();
    }

    setupTransitions() {
        // Add smooth transitions between questions
        document.addEventListener('DOMContentLoaded', () => {
            const questions = document.querySelectorAll('.assessment-step');
            questions.forEach((question, index) => {
                if (index === 0) {
                    question.classList.add('active');
                } else {
                    question.style.display = 'none';
                }
            });
        });
    }

    showQuestion(questionIndex) {
        const questions = document.querySelectorAll('.assessment-step');
        const currentQuestion = document.querySelector('.assessment-step.active');
        
        if (currentQuestion) {
            currentQuestion.classList.add('question-loading');
            
            setTimeout(() => {
                currentQuestion.classList.remove('active', 'question-loading');
                currentQuestion.style.display = 'none';
                
                if (questions[questionIndex]) {
                    questions[questionIndex].style.display = 'block';
                    questions[questionIndex].classList.add('active', 'slide-in');
                    
                    setTimeout(() => {
                        questions[questionIndex].classList.remove('slide-in');
                    }, 600);
                }
            }, 300);
        }
    }
}

// Initialize enhanced assessment experience
document.addEventListener('DOMContentLoaded', () => {
    const spiritualJourney = new SpiritualJourneyProgress();
    const questionTransitions = new QuestionTransitions();
    
    // Add CSS animation keyframes if not already present
    if (!document.querySelector('#sparkle-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation-styles';
        style.textContent = `
            @keyframes sparkleEffect {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced accessibility
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        option.setAttribute('role', 'button');
        option.setAttribute('tabindex', '0');
        option.setAttribute('aria-pressed', 'false');
    });
    
    console.log('✨ Enhanced Spiritual Assessment Experience initialized');
});

// Export for integration with existing assessment system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpiritualJourneyProgress, QuestionTransitions };
}