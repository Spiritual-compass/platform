// Wisdom Archive Page Functionality
class WisdomArchive {
    constructor() {
        this.allQuotes = [];
        this.displayedQuotes = [];
        this.currentFilter = 'all';
        this.quotesPerPage = 12;
        this.currentPage = 1;
        this.init();
    }
    
    async init() {
        // Load quotes from expanded quotes or fallback
        this.loadQuotesData();
        this.setupEventListeners();
        this.displayInitialQuotes();
    }
    
    loadQuotesData() {
        // If expanded quotes are available, use them
        if (typeof expandedWisdomQuotes !== 'undefined' && expandedWisdomQuotes.length > 0) {
            this.allQuotes = [...expandedWisdomQuotes];
        } else {
            // Enhanced fallback quotes for demo
            this.allQuotes = [
                {
                    quote: "Peace comes from within. Do not seek it without.",
                    author: "Buddha",
                    tradition: "buddhism",
                    theme: "peace",
                    date: "2024-02-20"
                },
                {
                    quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
                    author: "Apostle Peter",
                    tradition: "christianity",
                    theme: "love",
                    date: "2024-02-21"
                },
                {
                    quote: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
                    author: "Prophet Muhammad",
                    tradition: "islam",
                    theme: "love",
                    date: "2024-02-22"
                },
                {
                    quote: "Who is wise? One who learns from every person.",
                    author: "Ben Zoma",
                    tradition: "judaism",
                    theme: "wisdom",
                    date: "2024-02-23"
                },
                {
                    quote: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
                    author: "Lord Krishna",
                    tradition: "hinduism",
                    theme: "purpose",
                    date: "2024-02-24"
                },
                {
                    quote: "Be strong and courageous. Do not be afraid; do not be discouraged.",
                    author: "Joshua 1:9",
                    tradition: "christianity",
                    theme: "courage",
                    date: "2024-02-25"
                },
                {
                    quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
                    author: "Cicero",
                    tradition: "secular",
                    theme: "gratitude",
                    date: "2024-02-26"
                },
                {
                    quote: "The wound is the place where the Light enters you.",
                    author: "Rumi",
                    tradition: "sufism",
                    theme: "healing",
                    date: "2024-02-27"
                },
                {
                    quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
                    author: "Rumi",
                    tradition: "sufism",
                    theme: "purpose",
                    date: "2024-02-28"
                },
                {
                    quote: "All conditioned things are impermanent. Work out your salvation with diligence.",
                    author: "Buddha",
                    tradition: "buddhism",
                    theme: "wisdom",
                    date: "2024-03-01"
                },
                {
                    quote: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
                    author: "1 Corinthians 13:4",
                    tradition: "christianity",
                    theme: "love",
                    date: "2024-03-02"
                },
                {
                    quote: "And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind.",
                    author: "Quran 6:99",
                    tradition: "islam",
                    theme: "gratitude",
                    date: "2024-03-03"
                },
                {
                    quote: "In every generation, a person must see themselves as if they personally left Egypt.",
                    author: "Talmud",
                    tradition: "judaism",
                    theme: "purpose",
                    date: "2024-03-04"
                },
                {
                    quote: "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
                    author: "Bhagavad Gita",
                    tradition: "hinduism",
                    theme: "peace",
                    date: "2024-03-05"
                },
                {
                    quote: "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
                    author: "Mother Teresa",
                    tradition: "christianity",
                    theme: "purpose",
                    date: "2024-03-06"
                }
            ];
        }
        
        // Sort by date (newest first)
        this.allQuotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.tradition-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreQuotes();
            });
        }
        
        // Category cards (theme filters)
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                if (theme) {
                    this.filterByTheme(theme);
                }
            });
        });
    }
    
    handleFilterClick(button) {
        // Update active state
        document.querySelectorAll('.tradition-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Get filter value
        const tradition = button.dataset.tradition;
        this.currentFilter = tradition;
        this.currentPage = 1;
        
        // Apply filter and display
        this.applyFilter();
        this.displayQuotes();
        this.updateLoadMoreButton();
    }
    
    applyFilter() {
        if (this.currentFilter === 'all') {
            this.displayedQuotes = [...this.allQuotes];
        } else {
            this.displayedQuotes = this.allQuotes.filter(quote => 
                quote.tradition.toLowerCase() === this.currentFilter.toLowerCase()
            );
        }
    }
    
    filterByTheme(theme) {
        // Reset tradition filter to show all traditions for this theme
        this.currentFilter = 'all';
        document.querySelectorAll('.tradition-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.tradition-btn[data-tradition="all"]').classList.add('active');
        
        // Filter by theme
        this.displayedQuotes = this.allQuotes.filter(quote => 
            quote.theme.toLowerCase() === theme.toLowerCase()
        );
        
        this.currentPage = 1;
        this.displayQuotes();
        this.updateLoadMoreButton();
        
        // Scroll to wisdom feed
        const wisdomFeed = document.querySelector('.wisdom-feed');
        if (wisdomFeed) {
            wisdomFeed.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    displayInitialQuotes() {
        this.applyFilter();
        this.displayQuotes();
        this.updateLoadMoreButton();
    }
    
    displayQuotes() {
        const wisdomFeed = document.getElementById('wisdomFeed');
        if (!wisdomFeed) return;
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.quotesPerPage;
        const quotesToShow = this.displayedQuotes.slice(startIndex, endIndex);
        
        // Clear existing content
        wisdomFeed.innerHTML = '';
        
        // Add quotes
        quotesToShow.forEach((quote, index) => {
            const card = this.createQuoteCard(quote, index);
            wisdomFeed.appendChild(card);
        });
        
        // Add entrance animations
        setTimeout(() => {
            const cards = wisdomFeed.querySelectorAll('.wisdom-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 100);
            });
        }, 100);
    }
    
    createQuoteCard(quote, index) {
        const card = document.createElement('div');
        card.className = 'wisdom-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Format tradition name for display
        const traditionDisplay = this.formatTraditionName(quote.tradition);
        
        // Format date
        const dateFormatted = new Date(quote.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
        card.innerHTML = `
            <div class="quote-content">
                <blockquote>"${quote.quote}"</blockquote>
                <cite>— ${quote.author}</cite>
            </div>
            <div class="quote-meta">
                <span class="tradition-tag">${traditionDisplay}</span>
                <span class="theme-tag">${this.formatThemeName(quote.theme)}</span>
            </div>
            <div class="quote-date">${dateFormatted}</div>
        `;
        
        return card;
    }
    
    formatTraditionName(tradition) {
        const traditions = {
            'buddhism': 'Buddhism',
            'christianity': 'Christianity', 
            'islam': 'Islam',
            'judaism': 'Judaism',
            'hinduism': 'Hinduism',
            'sufism': 'Sufism',
            'secular': 'Wisdom'
        };
        return traditions[tradition.toLowerCase()] || tradition;
    }
    
    formatThemeName(theme) {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    loadMoreQuotes() {
        this.currentPage++;
        this.displayQuotes();
        this.updateLoadMoreButton();
        
        // Smooth scroll to new content
        setTimeout(() => {
            const newCards = document.querySelectorAll('.wisdom-card:not(.animate-in)');
            if (newCards.length > 0) {
                newCards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        const totalShown = this.currentPage * this.quotesPerPage;
        const hasMore = totalShown < this.displayedQuotes.length;
        
        if (hasMore) {
            loadMoreBtn.style.display = 'inline-flex';
            const remaining = this.displayedQuotes.length - totalShown;
            loadMoreBtn.textContent = `Load More Wisdom (${remaining} more)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Public method to get statistics
    getStats() {
        const stats = {};
        this.allQuotes.forEach(quote => {
            const tradition = quote.tradition;
            stats[tradition] = (stats[tradition] || 0) + 1;
        });
        return stats;
    }
}

// CSS for wisdom cards (inject if not present)
const style = document.createElement('style');
style.textContent = `
.wisdom-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.wisdom-card {
    background: var(--surface, #f8fafc);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-left: 4px solid var(--primary, #1e40af);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(20px);
}

.wisdom-card.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.wisdom-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.quote-content blockquote {
    font-size: 1.1rem;
    line-height: 1.7;
    margin: 0 0 1rem 0;
    font-style: italic;
    color: var(--text-primary, #111827);
}

.quote-content cite {
    display: block;
    font-size: 0.95rem;
    color: var(--text-secondary, #374151);
    font-weight: 600;
    margin-bottom: 1rem;
}

.quote-meta {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.tradition-tag, .theme-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.tradition-tag {
    background: var(--primary, #1e40af);
    color: white;
}

.theme-tag {
    background: var(--surface-elevated, #ffffff);
    color: var(--text-secondary, #374151);
    border: 1px solid var(--border-light, #e5e7eb);
}

.quote-date {
    font-size: 0.85rem;
    color: var(--text-light, #6b7280);
    text-align: right;
}

.tradition-btn {
    padding: 0.75rem 1.5rem;
    background: var(--surface, #f8fafc);
    border: 2px solid var(--border-light, #e5e7eb);
    border-radius: 25px;
    font-weight: 600;
    color: var(--text-secondary, #374151);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.tradition-btn:hover {
    background: var(--primary, #1e40af);
    color: white;
    border-color: var(--primary, #1e40af);
}

.tradition-btn.active {
    background: var(--primary, #1e40af);
    color: white;
    border-color: var(--primary, #1e40af);
}

.traditions-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.category-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.load-more {
    text-align: center;
    margin: 3rem 0;
}

@media (max-width: 768px) {
    .wisdom-cards {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .traditions-row {
        justify-content: flex-start;
    }
    
    .tradition-btn {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
    }
}
`;

if (!document.getElementById('wisdom-archive-styles')) {
    style.id = 'wisdom-archive-styles';
    document.head.appendChild(style);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.wisdomArchive = new WisdomArchive();
    });
} else {
    window.wisdomArchive = new WisdomArchive();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WisdomArchive;
}