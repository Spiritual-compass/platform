// PATHS FUNCTIONALITY - Begin Path Modal System
// Created: March 1, 2026

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧭 Paths functionality loaded');

    // Path data with detailed content
    const pathData = {
        'foundations-of-mindfulness': {
            title: 'Foundations of Mindfulness',
            icon: '🪻',
            duration: '4 weeks',
            commitment: '10 min/day',
            level: 'Beginner',
            description: 'Learn basic mindfulness meditation and present-moment awareness through simple daily practices.',
            weeks: [
                {
                    week: 1,
                    title: 'Breathing Meditation Basics',
                    practices: [
                        'Day 1-2: 5-minute breathing awareness',
                        'Day 3-4: Counting breaths (1-10 cycle)',
                        'Day 5-7: Noting when mind wanders'
                    ]
                },
                {
                    week: 2,
                    title: 'Body Awareness',
                    practices: [
                        'Day 8-10: Body scan meditation',
                        'Day 11-12: Mindful walking',
                        'Day 13-14: Tension and relaxation'
                    ]
                },
                {
                    week: 3,
                    title: 'Mindful Daily Activities',
                    practices: [
                        'Day 15-17: Mindful eating',
                        'Day 18-19: Mindful listening',
                        'Day 20-21: Mindful movement'
                    ]
                },
                {
                    week: 4,
                    title: 'Working with Thoughts',
                    practices: [
                        'Day 22-24: Observing thoughts without judgment',
                        'Day 25-26: Noting emotions',
                        'Day 27-28: Integration practice'
                    ]
                }
            ]
        },
        'introduction-to-prayer': {
            title: 'Introduction to Prayer',
            icon: '🙏',
            duration: '3 weeks',
            commitment: '5-15 min/day',
            level: 'Beginner',
            description: 'Explore different forms of prayer and communion with the divine across various traditions.',
            weeks: [
                {
                    week: 1,
                    title: 'Conversational Prayer',
                    practices: [
                        'Day 1-3: Speaking to the Divine naturally',
                        'Day 4-5: Asking for guidance',
                        'Day 6-7: Prayers of thanksgiving'
                    ]
                },
                {
                    week: 2,
                    title: 'Silent Contemplation',
                    practices: [
                        'Day 8-10: Sitting in quiet presence',
                        'Day 11-12: Listening prayer',
                        'Day 13-14: Contemplating sacred words'
                    ]
                },
                {
                    week: 3,
                    title: 'Traditional Forms',
                    practices: [
                        'Day 15-17: Learning traditional prayers',
                        'Day 18-19: Breath prayers',
                        'Day 20-21: Creating personal prayers'
                    ]
                }
            ]
        },
        'sacred-text-study': {
            title: 'Sacred Text Study',
            icon: '📖',
            duration: '6 weeks',
            commitment: '15-20 min/day',
            level: 'Beginner',
            description: 'Learn approaches to reading sacred texts with depth, understanding, and personal application.',
            weeks: [
                {
                    week: 1,
                    title: 'Choosing Your Text',
                    practices: [
                        'Day 1-2: Exploring different sacred texts',
                        'Day 3-4: Selecting passages that resonate',
                        'Day 5-7: Setting intention for study'
                    ]
                },
                {
                    week: 2,
                    title: 'Contemplative Reading',
                    practices: [
                        'Day 8-10: Slow, meditative reading',
                        'Day 11-12: Reading with questions',
                        'Day 13-14: Multiple readings approach'
                    ]
                }
            ]
        }
    };

    // Create modal HTML structure
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'path-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="path-info">
                        <div class="path-icon-large"></div>
                        <div class="path-details">
                            <h2 class="path-title"></h2>
                            <div class="path-meta">
                                <span class="duration"></span>
                                <span class="commitment"></span>
                                <span class="level"></span>
                            </div>
                        </div>
                    </div>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="path-description"></div>
                    <div class="path-content">
                        <h3>Your Journey</h3>
                        <div class="weeks-container"></div>
                    </div>
                    <div class="path-actions">
                        <button class="btn btn-primary start-journey">Start This Journey</button>
                        <button class="btn btn-secondary save-later">Save for Later</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Create modal styles
    function addModalStyles() {
        const styles = `
            <style>
                .path-modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(4px);
                }
                
                .modal-content {
                    position: relative;
                    background: white;
                    max-width: 800px;
                    max-height: 90vh;
                    margin: 2rem auto;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                .modal-header {
                    background: linear-gradient(135deg, var(--peace-green, #10b981), var(--hope-yellow, #f59e0b));
                    color: white;
                    padding: 2rem;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                }
                
                .path-info {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                    flex: 1;
                }
                
                .path-icon-large {
                    font-size: 3rem;
                    background: rgba(255, 255, 255, 0.2);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .path-title {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.75rem;
                    font-weight: 600;
                }
                
                .path-meta span {
                    background: rgba(255, 255, 255, 0.25);
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    margin-right: 0.5rem;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                
                .modal-close:hover {
                    opacity: 1;
                }
                
                .modal-body {
                    padding: 2rem;
                    flex: 1;
                    overflow-y: auto;
                }
                
                .path-description {
                    color: var(--text-secondary, #666);
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                
                .path-content h3 {
                    color: var(--text-primary, #1a1a1a);
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }
                
                .week-item {
                    background: var(--surface-elevated, #f9f9f9);
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    border-left: 4px solid var(--peace-green, #10b981);
                }
                
                .week-title {
                    font-weight: 600;
                    color: var(--text-primary, #1a1a1a);
                    margin-bottom: 0.75rem;
                    font-size: 1.1rem;
                }
                
                .week-practices {
                    list-style: none;
                    padding: 0;
                }
                
                .week-practices li {
                    color: var(--text-secondary, #666);
                    margin-bottom: 0.5rem;
                    padding-left: 1.5rem;
                    position: relative;
                }
                
                .week-practices li::before {
                    content: '•';
                    color: var(--peace-green, #10b981);
                    font-weight: bold;
                    position: absolute;
                    left: 0.5rem;
                }
                
                .path-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--border-light, #e5e5e5);
                }
                
                .path-actions .btn {
                    flex: 1;
                    padding: 1rem;
                    font-weight: 600;
                    text-align: center;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .path-modal.show {
                    display: block;
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        margin: 1rem;
                        max-height: calc(100vh - 2rem);
                    }
                    
                    .modal-header {
                        padding: 1.5rem;
                    }
                    
                    .path-info {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }
                    
                    .path-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Initialize modal system
    addModalStyles();
    const modal = createModal();

    // Handle Begin Path button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') && e.target.textContent.trim() === 'Begin Path') {
            e.preventDefault();
            
            // Find the path card
            const pathCard = e.target.closest('.path-card');
            if (!pathCard) return;
            
            // Extract path title and generate key
            const titleElement = pathCard.querySelector('h4');
            if (!titleElement) return;
            
            const pathTitle = titleElement.textContent.trim();
            const pathKey = pathTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            console.log('Opening path:', pathKey, 'Title:', pathTitle);
            
            // Get path data or create fallback
            const data = pathData[pathKey] || {
                title: pathTitle,
                icon: pathCard.querySelector('.path-icon')?.textContent || '🌱',
                duration: pathCard.querySelector('.duration')?.textContent || '4 weeks',
                commitment: pathCard.querySelector('.commitment')?.textContent || '10 min/day',
                level: pathCard.classList.contains('beginner') ? 'Beginner' : 
                      pathCard.classList.contains('intermediate') ? 'Intermediate' : 'Advanced',
                description: pathCard.querySelector('p')?.textContent || 'A guided spiritual growth journey.',
                weeks: [
                    {
                        week: 1,
                        title: 'Getting Started',
                        practices: [
                            'Begin your spiritual journey',
                            'Set daily practice time',
                            'Create sacred space'
                        ]
                    }
                ]
            };
            
            openPathModal(data);
        }
    });

    // Modal functionality
    function openPathModal(data) {
        // Populate modal content
        const pathIconLarge = modal.querySelector('.path-icon-large');
        const pathTitle = modal.querySelector('.path-title');
        const duration = modal.querySelector('.duration');
        const commitment = modal.querySelector('.commitment');
        const level = modal.querySelector('.level');
        const description = modal.querySelector('.path-description');
        const weeksContainer = modal.querySelector('.weeks-container');

        pathIconLarge.textContent = data.icon;
        pathTitle.textContent = data.title;
        duration.textContent = data.duration;
        commitment.textContent = data.commitment;
        level.textContent = data.level;
        description.textContent = data.description;

        // Build weeks content
        weeksContainer.innerHTML = data.weeks.map(week => `
            <div class="week-item">
                <div class="week-title">Week ${week.week}: ${week.title}</div>
                <ul class="week-practices">
                    ${week.practices.map(practice => `<li>${practice}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closePathModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Modal close handlers
    modal.querySelector('.modal-close').addEventListener('click', closePathModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closePathModal);

    // Action button handlers
    modal.querySelector('.start-journey').addEventListener('click', function() {
        alert('🎉 Journey started! In a full implementation, this would save your progress and begin day-by-day guidance.');
        closePathModal();
    });

    modal.querySelector('.save-later').addEventListener('click', function() {
        alert('📚 Path saved! In a full implementation, this would be added to your saved paths list.');
        closePathModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closePathModal();
        }
    });

    console.log('🧭 Paths functionality ready - Begin Path buttons now functional!');
});