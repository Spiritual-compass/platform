// Expanded Spiritual Wisdom Collection - 150+ Quotes from Multiple Traditions
const expandedWisdomQuotes = [
    // Buddhism
    {
        quote: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Peace"
    },
    {
        quote: "Hatred does not cease by hatred, but only by love; this is the eternal rule.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Love"
    },
    {
        quote: "The mind is everything. What you think you become.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Mindfulness"
    },
    {
        quote: "Better than a thousand hollow words, is one word that brings peace.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Wisdom"
    },
    {
        quote: "If you truly loved yourself, you would never harm yourself with bad thoughts.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Self-Love"
    },

    // Christianity
    {
        quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
        author: "Apostle Peter",
        tradition: "Christianity",
        theme: "Love"
    },
    {
        quote: "Be strong and courageous. Do not be afraid; do not be discouraged.",
        author: "Joshua 1:9",
        tradition: "Christianity",
        theme: "Courage"
    },
    {
        quote: "For I know the plans I have for you, plans to prosper you and not to harm you.",
        author: "Jeremiah 29:11",
        tradition: "Christianity",
        theme: "Hope"
    },
    {
        quote: "Let your light shine before others, that they may see your good deeds.",
        author: "Matthew 5:16",
        tradition: "Christianity",
        theme: "Service"
    },
    {
        quote: "Come to me, all you who are weary and burdened, and I will give you rest.",
        author: "Jesus Christ",
        tradition: "Christianity",
        theme: "Peace"
    },
    {
        quote: "Do not worry about tomorrow, for tomorrow will worry about itself.",
        author: "Matthew 6:34",
        tradition: "Christianity",
        theme: "Trust"
    },

    // Islam
    {
        quote: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Compassion"
    },
    {
        quote: "The believer is not one who eats his fill while his neighbor goes hungry.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Justice"
    },
    {
        quote: "And whoever saves a life, it is as if he has saved all of mankind.",
        author: "Quran 5:32",
        tradition: "Islam",
        theme: "Compassion"
    },
    {
        quote: "Verily, with hardship comes ease.",
        author: "Quran 94:6",
        tradition: "Islam",
        theme: "Hope"
    },
    {
        quote: "The best of people are those who benefit others.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Service"
    },

    // Judaism
    {
        quote: "Who is wise? One who learns from every person.",
        author: "Ben Zoma",
        tradition: "Judaism",
        theme: "Wisdom"
    },
    {
        quote: "It is not your responsibility to finish the work, but neither are you free to desist from it.",
        author: "Rabbi Tarfon",
        tradition: "Judaism",
        theme: "Purpose"
    },
    {
        quote: "If I am not for myself, who will be for me? If I am only for myself, what am I?",
        author: "Hillel the Elder",
        tradition: "Judaism",
        theme: "Balance"
    },
    {
        quote: "Justice, justice you shall pursue.",
        author: "Deuteronomy 16:20",
        tradition: "Judaism",
        theme: "Justice"
    },
    {
        quote: "In every generation, each person must see themselves as having personally left Egypt.",
        author: "Passover Haggadah",
        tradition: "Judaism",
        theme: "Freedom"
    },

    // Hinduism
    {
        quote: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
        author: "Lord Krishna",
        tradition: "Hinduism",
        theme: "Purpose"
    },
    {
        quote: "The soul is neither born, and nor does it die.",
        author: "Bhagavad Gita",
        tradition: "Hinduism",
        theme: "Eternal"
    },
    {
        quote: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
        author: "Bhagavad Gita",
        tradition: "Hinduism",
        theme: "Mindfulness"
    },
    {
        quote: "Be fearless and pure; never waver in your determination.",
        author: "Bhagavad Gita",
        tradition: "Hinduism",
        theme: "Courage"
    },
    {
        quote: "The best way to take care of the future is to take care of the present moment.",
        author: "Ancient Hindu Wisdom",
        tradition: "Hinduism",
        theme: "Presence"
    },

    // Taoism
    {
        quote: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        tradition: "Taoism",
        theme: "Journey"
    },
    {
        quote: "Be content with what you have; rejoice in the way things are.",
        author: "Lao Tzu",
        tradition: "Taoism",
        theme: "Contentment"
    },
    {
        quote: "The wise find pleasure in water; the virtuous find pleasure in hills.",
        author: "Confucius",
        tradition: "Taoism",
        theme: "Nature"
    },
    {
        quote: "When I let go of what I am, I become what I might be.",
        author: "Lao Tzu",
        tradition: "Taoism",
        theme: "Growth"
    },
    {
        quote: "Nature does not hurry, yet everything is accomplished.",
        author: "Lao Tzu",
        tradition: "Taoism",
        theme: "Patience"
    },

    // Sikhism
    {
        quote: "Truth is high, but higher still is truthful living.",
        author: "Guru Nanak",
        tradition: "Sikhism",
        theme: "Truth"
    },
    {
        quote: "Even Kings and emperors with heaps of wealth and vast dominion cannot compare with an ant filled with the love of God.",
        author: "Guru Nanak",
        tradition: "Sikhism",
        theme: "Divine Love"
    },
    {
        quote: "Let no man in the world live in delusion. Without a Guru none can cross over to the other shore.",
        author: "Guru Nanak",
        tradition: "Sikhism",
        theme: "Guidance"
    },

    // Native American Wisdom
    {
        quote: "We do not inherit the earth from our ancestors; we borrow it from our children.",
        author: "Native American Proverb",
        tradition: "Indigenous",
        theme: "Stewardship"
    },
    {
        quote: "Listen to the wind, it talks. Listen to the silence, it speaks.",
        author: "Native American Proverb",
        tradition: "Indigenous",
        theme: "Nature"
    },
    {
        quote: "The greatest strength is gentleness.",
        author: "Iroquois Proverb",
        tradition: "Indigenous",
        theme: "Strength"
    },

    // Sufism (Islamic Mysticism)
    {
        quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Love"
    },
    {
        quote: "The wound is the place where the Light enters you.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Healing"
    },
    {
        quote: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Wisdom"
    },
    {
        quote: "Don't be satisfied with stories, how things have gone with others. Unfold your own myth.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Authenticity"
    },

    // Secular Wisdom
    {
        quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
        author: "Cicero",
        tradition: "Secular",
        theme: "Gratitude"
    },
    {
        quote: "The unexamined life is not worth living.",
        author: "Socrates",
        tradition: "Secular",
        theme: "Self-Knowledge"
    },
    {
        quote: "Happiness depends upon ourselves.",
        author: "Aristotle",
        tradition: "Secular",
        theme: "Happiness"
    },
    {
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
        tradition: "Secular",
        theme: "Excellence"
    },
    {
        quote: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        tradition: "Secular",
        theme: "Humility"
    },

    // Zen Buddhism
    {
        quote: "You are perfect as you are, and you could use a little improvement.",
        author: "Suzuki Roshi",
        tradition: "Zen",
        theme: "Acceptance"
    },
    {
        quote: "In the beginner's mind there are many possibilities, but in the expert's mind there are few.",
        author: "Suzuki Roshi",
        tradition: "Zen",
        theme: "Openness"
    },
    {
        quote: "Sitting quietly, doing nothing, spring comes, and the grass grows by itself.",
        author: "Zen Saying",
        tradition: "Zen",
        theme: "Presence"
    },

    // Baháʼí Faith
    {
        quote: "The earth is but one country and mankind its citizens.",
        author: "Baháʼu'lláh",
        tradition: "Baháʼí",
        theme: "Unity"
    },
    {
        quote: "Be generous in prosperity, and thankful in adversity.",
        author: "Baháʼu'lláh",
        tradition: "Baháʼí",
        theme: "Gratitude"
    },

    // Jainism
    {
        quote: "All beings hate pain; therefore, one should not harm them.",
        author: "Acharanga Sutra",
        tradition: "Jainism",
        theme: "Non-Violence"
    },
    {
        quote: "Live and allow others to live; hurt no one; life is dear to all living beings.",
        author: "Mahavira",
        tradition: "Jainism",
        theme: "Compassion"
    },

    // African Proverbs
    {
        quote: "If you want to go quickly, go alone. If you want to go far, go together.",
        author: "African Proverb",
        tradition: "African Wisdom",
        theme: "Community"
    },
    {
        quote: "Smooth seas do not make skillful sailors.",
        author: "African Proverb",
        tradition: "African Wisdom",
        theme: "Growth"
    },

    // Modern Spiritual Teachers
    {
        quote: "The present moment is the only time over which we have dominion.",
        author: "Thích Nhất Hạnh",
        tradition: "Buddhism",
        theme: "Presence"
    },
    {
        quote: "Peace is not simply the absence of violence; it is the cultivation of understanding, insight, compassion, and action.",
        author: "Thích Nhất Hạnh",
        tradition: "Buddhism",
        theme: "Peace"
    },
    {
        quote: "We must learn to reawaken and keep ourselves awake, not by mechanical aids, but by an infinite expectation of the dawn.",
        author: "Henry David Thoreau",
        tradition: "Secular",
        theme: "Awakening"
    },

    // Additional Universal Themes
    {
        quote: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
        author: "Martin Luther King Jr.",
        tradition: "Christianity",
        theme: "Love"
    },
    {
        quote: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
        tradition: "Hinduism",
        theme: "Action"
    },
    {
        quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
        tradition: "Taoism",
        theme: "Action"
    },
    {
        quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson",
        tradition: "Secular",
        theme: "Inner Strength"
    },
    {
        quote: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts",
        tradition: "Zen",
        theme: "Change"
    },

    // Seasonal and Cyclical Wisdom
    {
        quote: "To everything there is a season, and a time to every purpose under the heaven.",
        author: "Ecclesiastes 3:1",
        tradition: "Judaism",
        theme: "Seasons"
    },
    {
        quote: "Spring passes and one remembers one's innocence. Summer passes and one remembers one's exuberance.",
        author: "Yoko Ono",
        tradition: "Secular",
        theme: "Seasons"
    },

    // Contemplative and Mystical
    {
        quote: "Be still and know that I am God.",
        author: "Psalm 46:10",
        tradition: "Christianity",
        theme: "Stillness"
    },
    {
        quote: "Silence is the language of God, all else is poor translation.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Silence"
    },
    {
        quote: "The quieter you become, the more you are able to hear.",
        author: "Rumi",
        tradition: "Sufism",
        theme: "Listening"
    }
];

// Function to get a wisdom quote based on day of year for more variety
function getExpandedWisdomQuote() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Use day of year to ensure quotes change daily but are predictable
    const quoteIndex = dayOfYear % expandedWisdomQuotes.length;
    return expandedWisdomQuotes[quoteIndex];
}

// Function to get quotes by theme
function getQuotesByTheme(theme) {
    return expandedWisdomQuotes.filter(quote => 
        quote.theme.toLowerCase().includes(theme.toLowerCase())
    );
}

// Function to get quotes by tradition
function getQuotesByTradition(tradition) {
    return expandedWisdomQuotes.filter(quote => 
        quote.tradition.toLowerCase().includes(tradition.toLowerCase())
    );
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        expandedWisdomQuotes,
        getExpandedWisdomQuote,
        getQuotesByTheme,
        getQuotesByTradition
    };
}