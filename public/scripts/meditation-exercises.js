// MEDITATION EXERCISES - Interactive guided meditation functionality

class MeditationExercises {
  constructor() {
    this.exercises = {
      mindfulness: {
        title: "🌅 Mindfulness Meditation",
        duration: "15 minutes",
        steps: [
          {
            time: 0,
            title: "Preparation",
            text: "Find a comfortable seated position. Close your eyes or soften your gaze. Take three deep breaths.",
            duration: 60
          },
          {
            time: 60,
            title: "Settling In",
            text: "Notice your body against the chair or cushion. Feel your feet on the ground. Let your shoulders relax.",
            duration: 120
          },
          {
            time: 180,
            title: "Breath Awareness",
            text: "Turn your attention to your breath. Notice the sensation of breathing in... and breathing out. No need to change anything, just observe.",
            duration: 300
          },
          {
            time: 480,
            title: "Mind Wandering",
            text: "When you notice your mind has wandered (and it will), gently bring your attention back to the breath. This is the practice.",
            duration: 300
          },
          {
            time: 780,
            title: "Closing",
            text: "Take a moment to appreciate this time you've given yourself. Wiggle your fingers and toes. When ready, open your eyes.",
            duration: 120
          }
        ]
      },
      lovingkindness: {
        title: "❤️ Loving-Kindness Meditation",
        duration: "20 minutes",
        steps: [
          {
            time: 0,
            title: "Preparation",
            text: "Sit comfortably with your eyes closed. Place one hand on your heart. Begin with deep, gentle breathing.",
            duration: 90
          },
          {
            time: 90,
            title: "Self-Compassion",
            text: "Begin by offering yourself loving-kindness. Silently repeat: 'May I be happy, may I be healthy, may I be at peace, may I be free from suffering.'",
            duration: 300
          },
          {
            time: 390,
            title: "Loved Ones",
            text: "Bring to mind someone you love dearly. Send them loving-kindness: 'May you be happy, may you be healthy, may you be at peace, may you be free from suffering.'",
            duration: 300
          },
          {
            time: 690,
            title: "Neutral Person",
            text: "Think of someone neutral - perhaps a cashier or neighbor. Extend the same wishes: 'May you be happy, may you be healthy, may you be at peace.'",
            duration: 240
          },
          {
            time: 930,
            title: "Difficult Person",
            text: "If you feel ready, bring to mind someone you find difficult. Try offering: 'May you be happy, may you be healthy, may you be at peace.' Go slowly and be gentle with yourself.",
            duration: 240
          },
          {
            time: 1170,
            title: "All Beings",
            text: "Expand your loving-kindness to all beings everywhere: 'May all beings be happy, may all beings be healthy, may all beings be at peace, may all beings be free from suffering.'",
            duration: 30
          }
        ]
      },
      contemplative: {
        title: "🕯️ Contemplative Prayer",
        duration: "25 minutes",
        steps: [
          {
            time: 0,
            title: "Entering Sacred Space",
            text: "Sit quietly in God's presence. You might light a candle or hold a cross. Begin with the sign of the cross if that resonates.",
            duration: 90
          },
          {
            time: 90,
            title: "Sacred Word",
            text: "Choose a sacred word that expresses your intention: 'Jesus,' 'Peace,' 'Abba,' or 'Love.' This word is your anchor.",
            duration: 120
          },
          {
            time: 210,
            title: "Silent Rest",
            text: "Rest in silence, opening your heart to God's presence. When thoughts arise, gently return to your sacred word. No need to think or analyze.",
            duration: 1200
          },
          {
            time: 1410,
            title: "Returning to Prayer",
            text: "As your silent time concludes, slowly return to words. You might pray the Our Father or simply rest in gratitude.",
            duration: 90
          }
        ]
      },
      mantra: {
        title: "🕉️ Mantra Meditation",
        duration: "20 minutes",
        steps: [
          {
            time: 0,
            title: "Choosing Your Mantra",
            text: "Select a sacred phrase: 'Om Mani Padme Hum' (compassion), 'So Hum' (I am), or simply 'Om.' This will be your focal point.",
            duration: 90
          },
          {
            time: 90,
            title: "Beginning Repetition",
            text: "Begin repeating your mantra silently or aloud. Let it flow naturally with your breath. There's no perfect way - just be sincere.",
            duration: 150
          },
          {
            time: 240,
            title: "Deepening Practice",
            text: "As you continue, let the mantra carry you deeper. If your mind wanders, simply return to the sacred sounds. Feel their vibration.",
            duration: 900
          },
          {
            time: 1140,
            title: "Silent Integration",
            text: "Allow the mantra to fade into silence while maintaining the peaceful state it has created. Rest in this stillness.",
            duration: 60
          }
        ]
      },
      breathing: {
        title: "🌊 Breathing Practices",
        duration: "10 minutes",
        steps: [
          {
            time: 0,
            title: "Natural Breath",
            text: "Begin by observing your natural breath without changing it. Notice the rhythm, the temperature, the sensation.",
            duration: 120
          },
          {
            time: 120,
            title: "4-7-8 Breathing",
            text: "Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. This calms the nervous system. Repeat 4-8 times.",
            duration: 240
          },
          {
            time: 360,
            title: "Belly Breathing",
            text: "Place one hand on chest, one on belly. Breathe so that only the bottom hand moves. This engages the diaphragm and promotes relaxation.",
            duration: 240
          },
          {
            time: 600,
            title: "Integration",
            text: "Return to natural breathing. Notice how you feel now compared to when you began. This is your new baseline of calm.",
            duration: 0
          }
        ]
      }
    };
    
    this.currentExercise = null;
    this.currentStep = 0;
    this.isRunning = false;
    this.timer = null;
    this.startTime = null;
    this.elapsedTime = 0;
    
    this.init();
  }
  
  init() {
    this.createModal();
    this.attachEventListeners();
  }
  
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'meditation-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="exercise-header">
          <h2 class="exercise-title"></h2>
          <div class="exercise-meta">
            <span class="exercise-duration"></span>
            <span class="exercise-progress"></span>
          </div>
        </div>
        <div class="exercise-body">
          <div class="step-content">
            <h3 class="step-title"></h3>
            <p class="step-text"></p>
          </div>
          <div class="exercise-timer">
            <div class="timer-display">00:00</div>
            <div class="timer-progress">
              <div class="timer-bar"></div>
            </div>
          </div>
        </div>
        <div class="exercise-controls">
          <button class="btn-control btn-play">▶️ Start</button>
          <button class="btn-control btn-pause" style="display: none;">⏸️ Pause</button>
          <button class="btn-control btn-next">⏭️ Next</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      .meditation-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: none;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
      }
      
      .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-primary, #ffffff);
        border-radius: 16px;
        padding: 2rem;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }
      
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-muted, #666);
        line-height: 1;
        padding: 0.5rem;
      }
      
      .exercise-header {
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .exercise-title {
        color: var(--text-primary, #333);
        margin: 0 0 1rem 0;
        font-size: 1.8rem;
      }
      
      .exercise-meta {
        display: flex;
        justify-content: center;
        gap: 2rem;
        color: var(--text-secondary, #666);
        font-size: 0.9rem;
      }
      
      .step-content {
        text-align: center;
        margin-bottom: 2rem;
        min-height: 120px;
      }
      
      .step-title {
        color: var(--text-primary, #333);
        margin: 0 0 1rem 0;
        font-size: 1.4rem;
      }
      
      .step-text {
        color: var(--text-secondary, #666);
        line-height: 1.6;
        font-size: 1.1rem;
      }
      
      .exercise-timer {
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .timer-display {
        font-size: 3rem;
        font-weight: 300;
        color: var(--text-primary, #333);
        margin-bottom: 1rem;
        font-family: monospace;
      }
      
      .timer-progress {
        width: 100%;
        height: 6px;
        background: var(--bg-secondary, #f5f5f5);
        border-radius: 3px;
        overflow: hidden;
      }
      
      .timer-bar {
        height: 100%;
        background: linear-gradient(90deg, #4a90e2, #50e3c2);
        width: 0%;
        transition: width 0.3s ease;
      }
      
      .exercise-controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
      
      .btn-control {
        background: var(--primary-color, #4a90e2);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s ease;
      }
      
      .btn-control:hover {
        background: var(--primary-dark, #357abd);
        transform: translateY(-1px);
      }
      
      .btn-control:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      @media (max-width: 768px) {
        .modal-content {
          width: 95%;
          padding: 1.5rem;
        }
        
        .timer-display {
          font-size: 2.5rem;
        }
        
        .exercise-controls {
          flex-direction: column;
        }
        
        .btn-control {
          width: 100%;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  attachEventListeners() {
    // Practice buttons
    const practiceButtons = document.querySelectorAll('.practice-card .btn');
    practiceButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const exerciseKeys = Object.keys(this.exercises);
        const exerciseKey = exerciseKeys[index];
        if (exerciseKey) {
          this.startExercise(exerciseKey);
        }
      });
    });
    
    // Modal controls
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close, .modal-overlay')) {
        this.closeModal();
      }
      
      if (e.target.matches('.btn-play')) {
        this.playExercise();
      }
      
      if (e.target.matches('.btn-pause')) {
        this.pauseExercise();
      }
      
      if (e.target.matches('.btn-next')) {
        this.nextStep();
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (this.isModalOpen()) {
        if (e.key === 'Escape') {
          this.closeModal();
        }
        if (e.key === ' ') {
          e.preventDefault();
          this.togglePlayPause();
        }
        if (e.key === 'ArrowRight') {
          this.nextStep();
        }
      }
    });
  }
  
  startExercise(exerciseKey) {
    this.currentExercise = this.exercises[exerciseKey];
    this.currentStep = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    
    this.showModal();
    this.updateDisplay();
  }
  
  showModal() {
    const modal = document.querySelector('.meditation-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.3s ease';
      requestAnimationFrame(() => {
        modal.style.opacity = '1';
      });
    });
  }
  
  closeModal() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.isRunning = false;
    
    const modal = document.querySelector('.meditation-modal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
  
  playExercise() {
    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;
    
    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
    
    document.querySelector('.btn-play').style.display = 'none';
    document.querySelector('.btn-pause').style.display = 'inline-block';
  }
  
  pauseExercise() {
    this.isRunning = false;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    document.querySelector('.btn-play').style.display = 'inline-block';
    document.querySelector('.btn-pause').style.display = 'none';
  }
  
  togglePlayPause() {
    if (this.isRunning) {
      this.pauseExercise();
    } else {
      this.playExercise();
    }
  }
  
  nextStep() {
    if (this.currentStep < this.currentExercise.steps.length - 1) {
      this.currentStep++;
      this.elapsedTime = this.currentExercise.steps[this.currentStep].time * 1000;
      this.updateDisplay();
      
      if (this.isRunning) {
        this.startTime = Date.now() - this.elapsedTime;
      }
    } else {
      this.completeExercise();
    }
  }
  
  updateDisplay() {
    const exercise = this.currentExercise;
    const step = exercise.steps[this.currentStep];
    
    document.querySelector('.exercise-title').textContent = exercise.title;
    document.querySelector('.exercise-duration').textContent = exercise.duration;
    document.querySelector('.exercise-progress').textContent = `Step ${this.currentStep + 1} of ${exercise.steps.length}`;
    
    document.querySelector('.step-title').textContent = step.title;
    document.querySelector('.step-text').textContent = step.text;
    
    this.updateTimer();
  }
  
  updateTimer() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
    }
    
    const step = this.currentExercise.steps[this.currentStep];
    const stepElapsed = this.elapsedTime - (step.time * 1000);
    const stepDuration = step.duration * 1000;
    
    // Format time display
    const minutes = Math.floor(stepElapsed / 60000);
    const seconds = Math.floor((stepElapsed % 60000) / 1000);
    document.querySelector('.timer-display').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update progress bar
    const progress = Math.min(stepElapsed / stepDuration, 1);
    document.querySelector('.timer-bar').style.width = `${progress * 100}%`;
    
    // Auto-advance to next step
    if (this.isRunning && stepElapsed >= stepDuration && this.currentStep < this.currentExercise.steps.length - 1) {
      this.nextStep();
    } else if (this.isRunning && stepElapsed >= stepDuration && this.currentStep === this.currentExercise.steps.length - 1) {
      this.completeExercise();
    }
  }
  
  completeExercise() {
    this.pauseExercise();
    
    // Show completion message
    document.querySelector('.step-title').textContent = "🙏 Practice Complete";
    document.querySelector('.step-text').textContent = "Take a moment to appreciate the peace you've cultivated. You can close this window when ready.";
    
    document.querySelector('.btn-next').style.display = 'none';
  }
  
  isModalOpen() {
    const modal = document.querySelector('.meditation-modal');
    return modal && modal.style.display !== 'none';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MeditationExercises();
});