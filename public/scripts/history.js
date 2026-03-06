// Sacred History Interactive Timeline
// Created: March 2, 2026 - Evening Cron Update

document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeMapPoints();
    initializeScrollAnimations();
});

// Timeline Filtering System
function initializeTimeline() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter timeline items
            const selectedEra = button.dataset.era;
            filterTimelineItems(selectedEra, timelineItems);
        });
    });
}

function filterTimelineItems(era, items) {
    items.forEach(item => {
        if (era === 'all' || item.dataset.era === era) {
            item.classList.remove('hidden');
            // Stagger animation for visible items
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, Math.random() * 200);
        } else {
            item.classList.add('hidden');
        }
    });
}

// Interactive Map Points
function initializeMapPoints() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        // Pulse animation on load
        setTimeout(() => {
            point.style.animation = 'pulse 2s ease-in-out infinite';
        }, Math.random() * 2000);
        
        // Click interaction
        point.addEventListener('click', () => {
            showTraditionInfo(point.dataset.tradition);
        });
        
        // Enhanced hover effects
        point.addEventListener('mouseenter', () => {
            point.style.zIndex = '10';
            playChime();
        });
        
        point.addEventListener('mouseleave', () => {
            point.style.zIndex = '1';
        });
    });
}

function showTraditionInfo(tradition) {
    // Create modal or alert with tradition information
    const traditions = {
        'Celtic Druids': {
            title: 'Celtic Druids',
            description: 'Ancient Celtic priests who served as judges, teachers, and healers. They believed in the sacred connection between nature and spirit, practicing rituals in oak groves and maintaining oral traditions of wisdom.',
            practices: ['Nature worship', 'Seasonal festivals', 'Divination', 'Herbal medicine']
        },
        'Norse Mythology': {
            title: 'Norse Spirituality', 
            description: 'The spiritual beliefs of Scandinavian peoples centered on the Æsir and Vanir gods, concepts of honor, fate (wyrd), and the cosmic tree Yggdrasil connecting nine worlds.',
            practices: ['Blót ceremonies', 'Rune divination', 'Ancestor veneration', 'Warrior ethics']
        },
        'Christianity': {
            title: 'Christianity',
            description: 'Founded on the teachings of Jesus Christ, emphasizing love, forgiveness, salvation through grace, and eternal life. Grew from a small Jewish sect to the world\'s largest religion.',
            practices: ['Prayer', 'Communion', 'Baptism', 'Scripture study']
        },
        'Islam': {
            title: 'Islam',
            description: 'Revealed through Prophet Muhammad, Islam emphasizes submission to Allah, the Five Pillars, and living according to Quranic guidance and Hadith traditions.',
            practices: ['Five daily prayers', 'Hajj pilgrimage', 'Zakat charity', 'Fasting during Ramadan']
        },
        'Buddhism': {
            title: 'Buddhism',
            description: 'Founded by Siddhartha Gautama (Buddha), focusing on liberation from suffering through the Eightfold Path, mindfulness, and understanding the nature of impermanence.',
            practices: ['Meditation', 'Mindfulness', 'Ethical conduct', 'Wisdom cultivation']
        },
        'Hinduism': {
            title: 'Hinduism',
            description: 'One of the world\'s oldest religious traditions, encompassing diverse practices united by concepts of dharma, karma, reincarnation, and paths to moksha (liberation).',
            practices: ['Yoga', 'Puja worship', 'Pilgrimage', 'Mantra chanting']
        },
        'Confucianism': {
            title: 'Confucianism',
            description: 'Ethical and philosophical system emphasizing social harmony, filial piety, education, and moral cultivation through ritual practice and self-improvement.',
            practices: ['Ancestor veneration', 'Ritual propriety', 'Study', 'Social responsibility']
        },
        'Indigenous Australian': {
            title: 'Aboriginal Spirituality',
            description: 'World\'s oldest continuous spiritual tradition, centered on Dreamtime stories, connection to country, and the belief that land, people, and spirit are one.',
            practices: ['Dreamtime ceremonies', 'Walkabout journeys', 'Sacred site protection', 'Oral storytelling']
        }
    };
    
    const info = traditions[tradition];
    if (info) {
        showModal(info);
    }
}

function showModal(info) {
    // Create and show modal with tradition information
    const modal = document.createElement('div');
    modal.className = 'tradition-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>${info.description}</p>
                <h4>Key Practices:</h4>
                <ul>
                    ${info.practices.map(practice => `<li>${practice}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        transform: scale(0.8);
        animation: modalSlideIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe timeline items and wisdom cards
    document.querySelectorAll('.timeline-item, .wisdom-card').forEach(el => {
        observer.observe(el);
    });
}

// Sound Effects (Optional - only if audio files exist)
function playChime() {
    // Subtle audio feedback for interactions
    try {
        const audio = new Audio('../audio/soft-chime.mp3');
        audio.volume = 0.1;
        audio.play().catch(() => {}); // Fail silently if no audio
    } catch (e) {}
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes modalSlideIn {
        from { 
            transform: scale(0.8) translateY(-20px);
            opacity: 0;
        }
        to { 
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .tradition-modal .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        float: right;
        color: #999;
        transition: color 0.3s ease;
    }
    
    .tradition-modal .close-modal:hover {
        color: #333;
    }
    
    .tradition-modal .modal-header {
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }
    
    .tradition-modal h3 {
        margin: 0;
        color: #2c3e50;
    }
    
    .tradition-modal h4 {
        color: #34495e;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .tradition-modal ul {
        list-style-type: none;
        padding-left: 0;
    }
    
    .tradition-modal li {
        padding: 0.3rem 0;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .tradition-modal li::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #3498db;
    }
`;
document.head.appendChild(style);

// Easter Eggs and Hidden Features
document.addEventListener('keydown', function(e) {
    // Konami code or special key combinations
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        showHiddenWisdom();
    }
});

function showHiddenWisdom() {
    const wisdoms = [
        "The spiritual journey is not about reaching a destination, but about becoming who you truly are.",
        "Ancient wisdom whispers that all paths lead to the same mountain peak, though the routes differ.",
        "In silence, we find the answers that words cannot teach.",
        "The sacred is not separate from the ordinary - it is the ordinary seen with new eyes."
    ];
    
    const randomWisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
    
    // Create a floating wisdom bubble
    const bubble = document.createElement('div');
    bubble.textContent = randomWisdom;
    bubble.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(52, 152, 219, 0.95);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        font-style: italic;
        animation: fadeIn 0.5s ease;
    `;
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        bubble.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => bubble.remove(), 500);
    }, 5000);
}

console.log('🧭 Sacred History Timeline loaded - Journey through spiritual evolution');
console.log('💡 Tip: Try Ctrl+Shift+H for hidden wisdom');