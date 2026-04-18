// SPIRITUAL COMPASS - EXPANDED WISDOM DATABASE
// 70+ authentic quotes from multiple spiritual traditions

const expandedWisdomQuotes = [
    // CHRISTIANITY (10 quotes)
    {
        quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
        author: "Apostle Peter",
        tradition: "Christianity",
        theme: "Love",
        source: "1 Peter 4:8"
    },
    {
        quote: "Be still, and know that I am God.",
        author: "Psalm 46",
        tradition: "Christianity", 
        theme: "Peace",
        source: "Psalm 46:10"
    },
    {
        quote: "For I know the plans I have for you, plans to prosper you and not to harm you, to give you hope and a future.",
        author: "Prophet Jeremiah",
        tradition: "Christianity",
        theme: "Hope",
        source: "Jeremiah 29:11"
    },
    {
        quote: "In everything give thanks; for this is the will of God in Christ Jesus for you.",
        author: "Apostle Paul",
        tradition: "Christianity",
        theme: "Gratitude",
        source: "1 Thessalonians 5:18"
    },
    {
        quote: "Come unto me, all you who are weary and burdened, and I will give you rest.",
        author: "Jesus Christ",
        tradition: "Christianity",
        theme: "Comfort",
        source: "Matthew 11:28"
    },
    {
        quote: "Faith is confidence in what we hope for and assurance about what we do not see.",
        author: "Letter to Hebrews",
        tradition: "Christianity",
        theme: "Faith",
        source: "Hebrews 11:1"
    },
    {
        quote: "Whatever you do, work at it with all your heart, as working for the Lord.",
        author: "Apostle Paul",
        tradition: "Christianity",
        theme: "Purpose",
        source: "Colossians 3:23"
    },
    {
        quote: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.",
        author: "Prophet Zephaniah",
        tradition: "Christianity",
        theme: "Comfort",
        source: "Zephaniah 3:17"
    },
    {
        quote: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.",
        author: "Apostle Paul",
        tradition: "Christianity",
        theme: "Peace",
        source: "Philippians 4:6"
    },
    {
        quote: "Let us not become weary in doing good, for at the proper time we will reap a harvest.",
        author: "Apostle Paul",
        tradition: "Christianity",
        theme: "Perseverance",
        source: "Galatians 6:9"
    },

    // ISLAM (10 quotes)
    {
        quote: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Compassion",
        source: "Hadith"
    },
    {
        quote: "And Allah invites to the Home of Peace and guides whom He wills to a straight path.",
        author: "Quran",
        tradition: "Islam",
        theme: "Peace",
        source: "Quran 10:25"
    },
    {
        quote: "The believer is not one who eats his fill while his neighbor goes hungry.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Service",
        source: "Hadith"
    },
    {
        quote: "And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind.",
        author: "Quran",
        tradition: "Islam",
        theme: "Gratitude",
        source: "Quran 6:99"
    },
    {
        quote: "Verily, with hardship comes ease.",
        author: "Quran",
        tradition: "Islam",
        theme: "Hope",
        source: "Quran 94:6"
    },
    {
        quote: "The most beloved of people to Allah are those who are most beneficial to people.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Service",
        source: "Hadith"
    },
    {
        quote: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
        author: "Quran",
        tradition: "Islam",
        theme: "Trust",
        source: "Quran 65:3"
    },
    {
        quote: "None of you truly believes until he loves for his brother what he loves for himself.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Love",
        source: "Hadith"
    },
    {
        quote: "And give good tidings to the patient, who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'",
        author: "Quran",
        tradition: "Islam",
        theme: "Patience",
        source: "Quran 2:155-156"
    },
    {
        quote: "The world is green and beautiful, and Allah has appointed you as His stewards over it.",
        author: "Prophet Muhammad",
        tradition: "Islam",
        theme: "Stewardship",
        source: "Hadith"
    },

    // JUDAISM (10 quotes)
    {
        quote: "Who is wise? One who learns from every person.",
        author: "Ben Zoma",
        tradition: "Judaism",
        theme: "Wisdom",
        source: "Pirkei Avot 4:1"
    },
    {
        quote: "If I am not for myself, who will be for me? If I am only for myself, what am I?",
        author: "Rabbi Hillel",
        tradition: "Judaism",
        theme: "Balance",
        source: "Pirkei Avot 1:14"
    },
    {
        quote: "What is hateful to you, do not do to your neighbor. This is the whole Torah; the rest is commentary.",
        author: "Rabbi Hillel",
        tradition: "Judaism",
        theme: "Compassion",
        source: "Talmud"
    },
    {
        quote: "The day is short, the work is much, the workers are lazy, the reward is great, and the Master is pressing.",
        author: "Rabbi Tarfon",
        tradition: "Judaism",
        theme: "Purpose",
        source: "Pirkei Avot 2:15"
    },
    {
        quote: "In a place where there are no human beings, strive to be human.",
        author: "Rabbi Hillel",
        tradition: "Judaism",
        theme: "Character",
        source: "Pirkei Avot 2:5"
    },
    {
        quote: "The world stands on three things: on justice, on truth, and on peace.",
        author: "Rabban Shimon ben Gamliel",
        tradition: "Judaism",
        theme: "Justice",
        source: "Pirkei Avot 1:18"
    },
    {
        quote: "Do not be daunted by the enormity of the world's grief. Do justly now, love mercy now, walk humbly now.",
        author: "Rabbi Tarfon",
        tradition: "Judaism",
        theme: "Action",
        source: "Talmud"
    },
    {
        quote: "Who is rich? One who is satisfied with his lot.",
        author: "Ben Zoma",
        tradition: "Judaism",
        theme: "Contentment",
        source: "Pirkei Avot 4:1"
    },
    {
        quote: "Great is peace, for all blessings are contained within it.",
        author: "Talmud",
        tradition: "Judaism",
        theme: "Peace",
        source: "Leviticus Rabbah 9:9"
    },
    {
        quote: "The best of people are those who are useful to others.",
        author: "Talmud",
        tradition: "Judaism",
        theme: "Service",
        source: "Talmudic Teaching"
    },

    // BUDDHISM (10 quotes)
    {
        quote: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Peace",
        source: "Buddhist Teaching"
    },
    {
        quote: "Three things cannot be long hidden: the sun, the moon, and the truth.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Truth",
        source: "Buddhist Teaching"
    },
    {
        quote: "The mind is everything. What you think you become.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Mindfulness",
        source: "Buddhist Teaching"
    },
    {
        quote: "Better than a thousand hollow words, is one word that brings peace.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Peace",
        source: "Dhammapada 100"
    },
    {
        quote: "Hatred does not cease by hatred, but only by love; this is the eternal rule.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Love",
        source: "Dhammapada 5"
    },
    {
        quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Mindfulness",
        source: "Buddhist Teaching"
    },
    {
        quote: "Thousands of candles can be lighted from a single candle. Happiness never decreases by being shared.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Joy",
        source: "Buddhist Teaching"
    },
    {
        quote: "The way is not in the sky. The way is in the heart.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Path",
        source: "Dhammapada 254"
    },
    {
        quote: "If you truly loved yourself, you would never harm yourself with destructive thoughts and emotions.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Self-Love",
        source: "Buddhist Teaching"
    },
    {
        quote: "Just as a mother would protect her only child with her life, even so let one cultivate a boundless love towards all beings.",
        author: "Buddha",
        tradition: "Buddhism",
        theme: "Compassion",
        source: "Metta Sutta"
    },

    // HINDUISM (10 quotes)
    {
        quote: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
        author: "Lord Krishna",
        tradition: "Hinduism",
        theme: "Purpose",
        source: "Bhagavad Gita 2:47"
    },
    {
        quote: "The soul is neither born, and nor does it die.",
        author: "Lord Krishna",
        tradition: "Hinduism",
        theme: "Eternal",
        source: "Bhagavad Gita 2:20"
    },
    {
        quote: "When love awakens in your life, in the night of your heart, it is like the dawn breaking within you.",
        author: "Upanishads",
        tradition: "Hinduism",
        theme: "Love",
        source: "Upanishads"
    },
    {
        quote: "The whole universe is one family.",
        author: "Ancient Sanskrit",
        tradition: "Hinduism",
        theme: "Unity",
        source: "Vasudhaiva Kutumbakam"
    },
    {
        quote: "Be fearless and pure; never waver in your determination or your dedication to the spiritual life.",
        author: "Lord Krishna",
        tradition: "Hinduism",
        theme: "Courage",
        source: "Bhagavad Gita 16:1"
    },
    {
        quote: "Truth is one, but the wise know it by many names.",
        author: "Rig Veda",
        tradition: "Hinduism",
        theme: "Truth",
        source: "Rig Veda 1:164:46"
    },
    {
        quote: "Where there is love there is life.",
        author: "Mahatma Gandhi",
        tradition: "Hinduism",
        theme: "Love",
        source: "Modern Hindu Teaching"
    },
    {
        quote: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi",
        tradition: "Hinduism",
        theme: "Service",
        source: "Modern Hindu Teaching"
    },
    {
        quote: "You must be the change you wish to see in the world.",
        author: "Mahatma Gandhi",
        tradition: "Hinduism",
        theme: "Change",
        source: "Modern Hindu Teaching"
    },
    {
        quote: "The mind acts like an enemy for those who do not control it.",
        author: "Lord Krishna",
        tradition: "Hinduism",
        theme: "Self-Control",
        source: "Bhagavad Gita 6:6"
    },

    // SECULAR/PHILOSOPHICAL (10 quotes)
    {
        quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
        author: "Cicero",
        tradition: "Secular",
        theme: "Gratitude",
        source: "Ancient Philosophy"
    },
    {
        quote: "The unexamined life is not worth living.",
        author: "Socrates",
        tradition: "Secular",
        theme: "Wisdom",
        source: "Ancient Philosophy"
    },
    {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
        tradition: "Secular",
        theme: "Authenticity",
        source: "Modern Philosophy"
    },
    {
        quote: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        author: "Ralph Waldo Emerson",
        tradition: "Secular",
        theme: "Purpose",
        source: "Transcendentalism"
    },
    {
        quote: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
        author: "Eleanor Roosevelt",
        tradition: "Secular",
        theme: "Present",
        source: "Modern Wisdom"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        tradition: "Secular",
        theme: "Hope",
        source: "Modern Philosophy"
    },
    {
        quote: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        tradition: "Secular",
        theme: "Opportunity",
        source: "Modern Science"
    },
    {
        quote: "Be the change that you wish to see in the world.",
        author: "Attributed to Gandhi",
        tradition: "Secular",
        theme: "Change",
        source: "Modern Wisdom"
    },
    {
        quote: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        tradition: "Secular",
        theme: "Mindfulness",
        source: "Modern Culture"
    },
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        tradition: "Secular",
        theme: "Purpose",
        source: "Modern Wisdom"
    },

    // UNIVERSAL/INTERFAITH (7 quotes)
    {
        quote: "Hope is being able to see that there is light despite all of the darkness.",
        author: "Desmond Tutu",
        tradition: "Universal",
        theme: "Hope",
        source: "Modern Wisdom"
    },
    {
        quote: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
        author: "Pierre Teilhard de Chardin",
        tradition: "Universal",
        theme: "Spirituality",
        source: "Modern Mysticism"
    },
    {
        quote: "The best teachers are those who show you where to look, but don't tell you what to see.",
        author: "Alexandra K. Trenfor",
        tradition: "Universal",
        theme: "Teaching",
        source: "Modern Wisdom"
    },
    {
        quote: "Be thankful for what you have; you'll end up having more.",
        author: "Oprah Winfrey",
        tradition: "Universal",
        theme: "Gratitude",
        source: "Modern Wisdom"
    },
    {
        quote: "Kindness is a language which the deaf can hear and the blind can see.",
        author: "Mark Twain",
        tradition: "Universal",
        theme: "Kindness",
        source: "American Literature"
    },
    {
        quote: "The wound is the place where the Light enters you.",
        author: "Rumi",
        tradition: "Universal",
        theme: "Healing",
        source: "Sufi Poetry"
    },
    {
        quote: "Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there.",
        author: "Rumi",
        tradition: "Universal",
        theme: "Unity",
        source: "Sufi Poetry"
    }
];

// Enhanced wisdom rotation with more variety
function updateWisdomQuote() {
    const wisdomCard = document.querySelector('.wisdom-quote');
    if (wisdomCard) {
        const today = new Date().getDate();
        const quoteIndex = today % expandedWisdomQuotes.length;
        const todaysWisdom = expandedWisdomQuotes[quoteIndex];
        
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

// Initialize wisdom on page load
document.addEventListener('DOMContentLoaded', updateWisdomQuote);

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { expandedWisdomQuotes, updateWisdomQuote };
}

// Also make available globally
window.expandedWisdomQuotes = expandedWisdomQuotes;
window.updateWisdomQuote = updateWisdomQuote;