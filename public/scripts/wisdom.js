// Spiritual Wisdom Engine - Daily Quote Rotation System
class WisdomEngine {
    constructor() {
        this.quotes = [];
        this.currentQuote = null;
        this.init();
    }
    
    async init() {
        // Load quotes from expanded quotes if available
        if (typeof expandedWisdomQuotes !== 'undefined' && expandedWisdomQuotes.length > 0) {
            this.quotes = expandedWisdomQuotes;
        } else {
            // Fallback quotes if expanded collection not loaded
            this.quotes = [
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
                }
            ];
        }
        
        this.updateDailyWisdom();
        this.setupPeriodicUpdate();
    }
    
    getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    
    getDailyQuote() {
        if (this.quotes.length === 0) return null;
        
        // Use day of year + hour for more frequent rotation
        const dayOfYear = this.getDayOfYear();
        const hour = new Date().getHours();
        const index = (dayOfYear + Math.floor(hour / 6)) % this.quotes.length; // Change every 6 hours
        
        return this.quotes[index];
    }
    
    updateDailyWisdom() {
        const wisdomCard = document.querySelector('.wisdom-quote');
        if (!wisdomCard) return;
        
        this.currentQuote = this.getDailyQuote();
        if (!this.currentQuote) return;
        
        // Update quote text
        const blockquote = wisdomCard.querySelector('blockquote');
        const cite = wisdomCard.querySelector('cite'); 
        const traditionLabel = wisdomCard.querySelector('.tradition-label');
        const themeLabel = wisdomCard.querySelector('.theme-label');
        
        if (blockquote) {
            blockquote.textContent = `"${this.currentQuote.quote}"`;
            blockquote.style.opacity = '0';
            setTimeout(() => {
                blockquote.style.transition = 'opacity 0.5s ease-in-out';
                blockquote.style.opacity = '1';
            }, 100);
        }
        
        if (cite) {
            cite.textContent = `— ${this.currentQuote.author}`;
        }
        
        if (traditionLabel) {
            traditionLabel.textContent = this.currentQuote.tradition;
        }
        
        if (themeLabel) {
            themeLabel.textContent = this.currentQuote.theme;
        }
        
        // Add subtle entrance animation
        wisdomCard.style.transform = 'translateY(5px)';
        wisdomCard.style.opacity = '0.8';
        setTimeout(() => {
            wisdomCard.style.transition = 'all 0.3s ease-out';
            wisdomCard.style.transform = 'translateY(0)';
            wisdomCard.style.opacity = '1';
        }, 200);
        
        console.log(`Daily wisdom updated: ${this.currentQuote.tradition} - ${this.currentQuote.theme}`);
    }
    
    setupPeriodicUpdate() {
        // Update every 6 hours 
        setInterval(() => {
            this.updateDailyWisdom();
        }, 6 * 60 * 60 * 1000);
        
        // Also update on page visibility change (user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Small delay to check if we should update
                setTimeout(() => {
                    const newQuote = this.getDailyQuote();
                    if (newQuote && (!this.currentQuote || newQuote.quote !== this.currentQuote.quote)) {
                        this.updateDailyWisdom();
                    }
                }, 1000);
            }
        });
    }
    
    getNewWisdom() {
        // Force refresh wisdom (called from keyboard shortcut)
        this.updateDailyWisdom();
    }
    
    getQuotesByTheme(theme) {
        return this.quotes.filter(quote => 
            quote.theme.toLowerCase().includes(theme.toLowerCase())
        );
    }
    
    getQuotesByTradition(tradition) {
        return this.quotes.filter(quote => 
            quote.tradition.toLowerCase().includes(tradition.toLowerCase())
        );
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.wisdomEngine = new WisdomEngine();
    });
} else {
    window.wisdomEngine = new WisdomEngine();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WisdomEngine;
}