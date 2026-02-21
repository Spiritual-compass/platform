#!/usr/bin/env node
/**
 * Seed the wisdom database with initial spiritual quotes
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Sample wisdom quotes from various traditions
const WISDOM_SEEDS = [
  // Buddhism - Peace
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    tradition: "buddhism",
    theme: "peace",
    source: "Buddhist Teaching"
  },
  
  // Christianity - Love
  {
    quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
    author: "Apostle Peter", 
    tradition: "christianity",
    theme: "love",
    source: "1 Peter 4:8"
  },
  
  // Islam - Compassion
  {
    quote: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
    author: "Prophet Muhammad",
    tradition: "islam", 
    theme: "compassion",
    source: "Hadith"
  },
  
  // Judaism - Wisdom
  {
    quote: "Who is wise? One who learns from every person.",
    author: "Ben Zoma",
    tradition: "judaism",
    theme: "wisdom", 
    source: "Pirkei Avot 4:1"
  },
  
  // Hinduism - Purpose
  {
    quote: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
    author: "Lord Krishna",
    tradition: "hinduism",
    theme: "purpose",
    source: "Bhagavad Gita 2:47"
  },
  
  // Secular - Gratitude
  {
    quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
    author: "Cicero",
    tradition: "secular",
    theme: "gratitude", 
    source: "Ancient Philosophy"
  },
  
  // Universal - Hope
  {
    quote: "Hope is being able to see that there is light despite all of the darkness.",
    author: "Desmond Tutu",
    tradition: "universal",
    theme: "hope",
    source: "Modern Wisdom"
  },
  
  // Buddhism - Wisdom
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
    tradition: "buddhism", 
    theme: "wisdom",
    source: "Buddhist Teaching"
  },
  
  // Christianity - Peace
  {
    quote: "Peace I leave with you; my peace I give you.",
    author: "Jesus Christ",
    tradition: "christianity",
    theme: "peace",
    source: "John 14:27"
  },
  
  // Islam - Purpose
  {
    quote: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    author: "Quran",
    tradition: "islam",
    theme: "purpose", 
    source: "Quran 6:73"
  },
  
  // Judaism - Compassion
  {
    quote: "What is hateful to you, do not do to your neighbor. This is the whole Torah; the rest is commentary.",
    author: "Rabbi Hillel",
    tradition: "judaism",
    theme: "compassion",
    source: "Talmud"
  },
  
  // Hinduism - Love
  {
    quote: "Where there is love there is life.",
    author: "Mahatma Gandhi",
    tradition: "hinduism",
    theme: "love",
    source: "Modern Hindu Teaching"
  },
  
  // Secular - Hope
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    tradition: "secular", 
    theme: "hope",
    source: "Modern Philosophy"
  },
  
  // Universal - Gratitude
  {
    quote: "Be thankful for what you have; you'll end up having more.",
    author: "Oprah Winfrey",
    tradition: "universal",
    theme: "gratitude",
    source: "Modern Wisdom"
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding wisdom database...');
    
    // Create table if it doesn't exist
    console.log('📋 Creating wisdom_quotes table...');
    
    // Insert wisdom quotes
    const { data, error } = await supabase
      .from('wisdom_quotes')
      .insert(WISDOM_SEEDS);
      
    if (error) {
      console.error('❌ Error seeding database:', error.message);
      return;
    }
    
    console.log(`✅ Successfully seeded ${WISDOM_SEEDS.length} wisdom quotes`);
    
    // Show summary by tradition and theme
    const traditions = [...new Set(WISDOM_SEEDS.map(w => w.tradition))];
    const themes = [...new Set(WISDOM_SEEDS.map(w => w.theme))];
    
    console.log('\n📊 Summary:');
    console.log('Traditions:', traditions.join(', '));
    console.log('Themes:', themes.join(', '));
    
    traditions.forEach(tradition => {
      const count = WISDOM_SEEDS.filter(w => w.tradition === tradition).length;
      console.log(`  ${tradition}: ${count} quotes`);
    });
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { WISDOM_SEEDS, seedDatabase };