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
        },
        'deep-contemplative-practice': {
            title: 'Deep Contemplative Practice',
            icon: '🧘‍♂️',
            duration: '12 weeks',
            commitment: '30-45 min/day',
            level: 'Advanced',
            description: 'Develop a mature contemplative practice drawing from mystical traditions across cultures. This intensive program guides experienced practitioners into deeper states of awareness and union with the Divine.',
            weeks: [
                {
                    week: 1,
                    title: 'Establishing Sacred Rhythm',
                    practices: [
                        'Day 1-2: Create dedicated sacred space and ritual preparation',
                        'Day 3-4: Establish consistent 30-minute silent meditation',
                        'Day 5-7: Lectio Divina with mystical texts (Meister Eckhart, Rumi, etc.)'
                    ]
                },
                {
                    week: 2,
                    title: 'Breathing into Depth',
                    practices: [
                        'Day 8-10: Advanced pranayama and breath awareness techniques',
                        'Day 11-12: Hesychast breathing prayer (Jesus Prayer tradition)',
                        'Day 13-14: Sufi breathing practices and dhikr integration'
                    ]
                },
                {
                    week: 3,
                    title: 'Contemplative Silence',
                    practices: [
                        'Day 15-17: Extended periods of wordless contemplation (20-30 min)',
                        'Day 18-19: Cloud of Unknowing apophatic prayer methods',
                        'Day 20-21: Zen shikantaza (just sitting) practice'
                    ]
                },
                {
                    week: 4,
                    title: 'Working with Spiritual Experiences',
                    practices: [
                        'Day 22-24: Discernment of authentic vs. illusory spiritual experiences',
                        'Day 25-26: Integration of visions, insights, and mystical moments',
                        'Day 27-28: Navigating spiritual dryness and dark nights'
                    ]
                },
                {
                    week: 5,
                    title: 'Non-Dual Awareness Foundations',
                    practices: [
                        'Day 29-31: Advaita Vedanta self-inquiry (Who am I? meditation)',
                        'Day 32-33: Christian non-dual contemplation (centering prayer)',
                        'Day 34-35: Buddhist emptiness meditation (Madhyamika practices)'
                    ]
                },
                {
                    week: 6,
                    title: 'Mystical Union Practices',
                    practices: [
                        'Day 36-38: Islamic fana (self-annihilation) contemplation',
                        'Day 39-40: Kabbalistic merkabah meditation and divine names',
                        'Day 41-42: Hindu samadhi preparation and one-pointed focus'
                    ]
                },
                {
                    week: 7,
                    title: 'Integration of Shadow Work',
                    practices: [
                        'Day 43-45: Confronting unconscious spiritual bypassing',
                        'Day 46-47: Contemplative examination of psychological patterns',
                        'Day 48-49: Healing meditation for wounded aspects of self'
                    ]
                },
                {
                    week: 8,
                    title: 'Advanced Prayer Forms',
                    practices: [
                        'Day 50-52: Ignatian contemplation with Gospel scenes',
                        'Day 53-54: Tibetan deity visualization and mantra practice',
                        'Day 55-56: Indigenous shamanic journey work and spirit communion'
                    ]
                },
                {
                    week: 9,
                    title: 'Contemplative Living Integration',
                    practices: [
                        'Day 57-59: Continuous prayer and presence throughout daily activities',
                        'Day 60-61: Contemplative eating, walking, and working practices',
                        'Day 62-63: Maintaining contemplative awareness in relationships'
                    ]
                },
                {
                    week: 10,
                    title: 'Advanced Discernment',
                    practices: [
                        'Day 64-66: Distinguishing between ego, soul, and Divine guidance',
                        'Day 67-68: Reading the movements of consolation and desolation',
                        'Day 69-70: Discerning authentic from counterfeit mystical experience'
                    ]
                },
                {
                    week: 11,
                    title: 'Preparing for Deeper Mysteries',
                    practices: [
                        'Day 71-73: 45-minute periods of pure contemplative silence',
                        'Day 74-75: Preparation for potential dark night experiences',
                        'Day 76-77: Surrender practices and radical letting go'
                    ]
                },
                {
                    week: 12,
                    title: 'Living from Union',
                    practices: [
                        'Day 78-80: Integration of contemplative insights into service',
                        'Day 81-82: Contemplative response to suffering and injustice',
                        'Day 83-84: Establishing lifelong contemplative practice rhythm'
                    ]
                }
            ]
        },
        'spiritual-leadership': {
            title: 'Spiritual Leadership',
            icon: '🏛️',
            duration: '10 weeks',
            commitment: '30 min/day',
            level: 'Advanced',
            description: 'Develop the skills, wisdom, and maturity needed to guide others on their spiritual journeys. This program combines contemplative practice with practical leadership training rooted in spiritual principles.',
            weeks: [
                {
                    week: 1,
                    title: 'Foundations of Spiritual Authority',
                    practices: [
                        'Day 1-2: Self-examination of motivations for spiritual leadership',
                        'Day 3-4: Study of servant leadership across wisdom traditions',
                        'Day 5-7: Personal inventory of spiritual gifts and calling'
                    ]
                },
                {
                    week: 2,
                    title: 'Holding Sacred Space',
                    practices: [
                        'Day 8-10: Creating containers for others\' spiritual experience',
                        'Day 11-12: Managing group energy and spiritual dynamics',
                        'Day 13-14: Establishing appropriate boundaries and sacred presence'
                    ]
                },
                {
                    week: 3,
                    title: 'Deep Listening and Presence',
                    practices: [
                        'Day 15-17: Contemplative listening beyond words to soul movement',
                        'Day 18-19: Discerning when to speak, when to remain silent',
                        'Day 20-21: Practicing non-judgmental witnessing of others\' journeys'
                    ]
                },
                {
                    week: 4,
                    title: 'Offering Spiritual Guidance',
                    practices: [
                        'Day 22-24: Discerning authentic guidance from personal projection',
                        'Day 25-26: Asking powerful questions that invite deeper reflection',
                        'Day 27-28: Offering wisdom without creating spiritual dependency'
                    ]
                },
                {
                    week: 5,
                    title: 'Working with Spiritual Crises',
                    practices: [
                        'Day 29-31: Supporting others through dark nights of the soul',
                        'Day 32-33: Recognizing when to refer to mental health professionals',
                        'Day 34-35: Holding space for doubt, anger, and spiritual rebellion'
                    ]
                },
                {
                    week: 6,
                    title: 'Building Spiritual Community',
                    practices: [
                        'Day 36-38: Fostering authentic spiritual fellowship vs. religious social club',
                        'Day 39-40: Facilitating group spiritual practices and shared contemplation',
                        'Day 41-42: Managing conflicts and personality clashes in spiritual settings'
                    ]
                },
                {
                    week: 7,
                    title: 'Cross-Tradition Competency',
                    practices: [
                        'Day 43-45: Understanding and honoring different spiritual languages',
                        'Day 46-47: Bridging between traditions without syncretistic confusion',
                        'Day 48-49: Supporting seekers from backgrounds different from your own'
                    ]
                },
                {
                    week: 8,
                    title: 'Ethical Leadership and Power Dynamics',
                    practices: [
                        'Day 50-52: Recognizing and avoiding spiritual abuse patterns',
                        'Day 53-54: Maintaining humility and continuing as lifelong student',
                        'Day 55-56: Handling projection, idealization, and spiritual transference'
                    ]
                },
                {
                    week: 9,
                    title: 'Advanced Facilitation Skills',
                    practices: [
                        'Day 57-59: Leading group meditation, prayer, and contemplative practices',
                        'Day 60-61: Facilitating spiritual direction and one-on-one guidance',
                        'Day 62-63: Teaching spiritual practices without losing their mystery'
                    ]
                },
                {
                    week: 10,
                    title: 'Sustainable Ministry and Self-Care',
                    practices: [
                        'Day 64-66: Maintaining your own contemplative practice while serving others',
                        'Day 67-68: Creating support systems and peer supervision',
                        'Day 69-70: Integration and commitment to ongoing formation'
                    ]
                }
            ]
        },
        'world-religions-integration': {
            title: 'World Religions Integration',
            icon: '🌍',
            duration: '16 weeks',
            commitment: '45 min/day',
            level: 'Advanced',
            description: 'A comprehensive exploration and integration of wisdom from major world religions while deepening your personal spiritual path. This advanced program requires substantial commitment and open-hearted engagement with diverse traditions.',
            weeks: [
                {
                    week: 1,
                    title: 'Sacred Foundation and Intentions',
                    practices: [
                        'Day 1-2: Setting intentions for interfaith exploration without losing your center',
                        'Day 3-4: Contemplative study of religious pluralism and universal principles',
                        'Day 5-7: Daily practice of gratitude for world\'s spiritual diversity'
                    ]
                },
                {
                    week: 2,
                    title: 'Abrahamic Traditions Deep Dive',
                    practices: [
                        'Day 8-9: Jewish contemplative practices - Shema meditation and Kabbalistic study',
                        'Day 10-11: Christian mystical tradition - Lectio Divina and contemplative prayer',
                        'Day 12-14: Islamic spirituality - Dhikr, Sufi practices, and 99 Names meditation'
                    ]
                },
                {
                    week: 3,
                    title: 'Eastern Wisdom Traditions I',
                    practices: [
                        'Day 15-17: Hindu contemplative paths - Bhakti, Raja, and Jnana Yoga practices',
                        'Day 18-19: Buddhist meditation - Vipassana insight and loving-kindness practices',
                        'Day 20-21: Integration period - finding common threads and unique gifts'
                    ]
                },
                {
                    week: 4,
                    title: 'Eastern Wisdom Traditions II',
                    practices: [
                        'Day 22-24: Taoist practices - Wu Wei meditation and Tao Te Ching contemplation',
                        'Day 25-26: Zen Buddhist practices - Zazen and koan study',
                        'Day 27-28: Confucian ethical contemplation and ancestor reverence practices'
                    ]
                },
                {
                    week: 5,
                    title: 'Indigenous and Earth-Based Spiritualities',
                    practices: [
                        'Day 29-31: Native American spiritual practices - Medicine wheel and nature communion',
                        'Day 32-33: African traditional spirituality - Ancestral wisdom and community ritual',
                        'Day 34-35: Celtic and Norse earth-based practices - Seasonal celebrations and mythology'
                    ]
                },
                {
                    week: 6,
                    title: 'Mystical and Esoteric Traditions',
                    practices: [
                        'Day 36-38: Gnostic Christianity - Contemplation of hidden gospels and divine spark',
                        'Day 39-40: Hermetic traditions - As above, so below meditation practices',
                        'Day 41-42: Sufi mysticism deep dive - Whirling, sacred geometry, and divine love'
                    ]
                },
                {
                    week: 7,
                    title: 'Modern Spiritual Movements',
                    practices: [
                        'Day 43-45: Theosophy and Universal teachings - Perennial philosophy study',
                        'Day 46-47: New Thought and metaphysical Christianity - Consciousness practices',
                        'Day 48-49: Contemporary integral spirituality - Ken Wilber and developmental models'
                    ]
                },
                {
                    week: 8,
                    title: 'Sacred Text Comparative Study',
                    practices: [
                        'Day 50-52: Comparative study of creation stories across traditions',
                        'Day 53-54: Universal themes of salvation/liberation in world scriptures',
                        'Day 55-56: Mystical poetry - Rumi, Hafez, St. John of the Cross, Mirabai'
                    ]
                },
                {
                    week: 9,
                    title: 'Ritual and Ceremonial Integration',
                    practices: [
                        'Day 57-59: Creating personal ritual drawing from multiple traditions',
                        'Day 60-61: Understanding symbol, metaphor, and archetype across cultures',
                        'Day 62-63: Seasonal and lunar practices from various traditions'
                    ]
                },
                {
                    week: 10,
                    title: 'Ethics and Social Justice Across Traditions',
                    practices: [
                        'Day 64-66: Comparative study of ethical teachings - Golden Rule variations',
                        'Day 67-68: Social justice imperatives across religious traditions',
                        'Day 69-70: Environmental stewardship from multiple spiritual perspectives'
                    ]
                },
                {
                    week: 11,
                    title: 'Navigating Religious Differences',
                    practices: [
                        'Day 71-73: Dealing with contradictions and theological disagreements',
                        'Day 74-75: Maintaining spiritual integrity while embracing diversity',
                        'Day 76-77: Dialogue skills for interfaith understanding and cooperation'
                    ]
                },
                {
                    week: 12,
                    title: 'Death and Afterlife Contemplations',
                    practices: [
                        'Day 78-80: Comparative study of death and afterlife across traditions',
                        'Day 81-82: Tibetan Bardo teachings and Christian mystical death',
                        'Day 83-84: Egyptian, Hindu, and indigenous perspectives on soul journey'
                    ]
                },
                {
                    week: 13,
                    title: 'Universal Mystical Experience',
                    practices: [
                        'Day 85-87: Study of common mystical phenomena across traditions',
                        'Day 88-89: Personal mystical experiences interpretation and integration',
                        'Day 90-91: Unitive consciousness practices from multiple paths'
                    ]
                },
                {
                    week: 14,
                    title: 'Personal Synthesis Development',
                    practices: [
                        'Day 92-94: Creating your personal interfaith spiritual practice',
                        'Day 95-96: Identifying your primary tradition while honoring others',
                        'Day 97-98: Developing your unique spiritual vocabulary and understanding'
                    ]
                },
                {
                    week: 15,
                    title: 'Living Interfaith Spirituality',
                    practices: [
                        'Day 99-101: Practical application in daily life and relationships',
                        'Day 102-103: Sharing wisdom without proselytizing or syncretic confusion',
                        'Day 104-105: Building bridges while maintaining authentic spiritual identity'
                    ]
                },
                {
                    week: 16,
                    title: 'Integration and Ongoing Journey',
                    practices: [
                        'Day 106-108: Final integration of learnings and continued growth planning',
                        'Day 109-110: Commitment to ongoing interfaith dialogue and learning',
                        'Day 111-112: Establishing sustainable practice honoring world spiritual wisdom'
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