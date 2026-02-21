#!/usr/bin/env node
/**
 * Spirit Guide Content Bot - Daily Wisdom Poster
 * Selects and posts daily spiritual wisdom from multiple traditions
 */

require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Daily themes (rotating weekly)
const DAILY_THEMES = {
  0: 'peace',      // Sunday
  1: 'purpose',    // Monday  
  2: 'compassion', // Tuesday
  3: 'wisdom',     // Wednesday
  4: 'gratitude',  // Thursday
  5: 'hope',       // Friday
  6: 'love'        // Saturday
};

// Spiritual traditions (rotating)
const TRADITIONS = [
  'christianity', 'islam', 'judaism', 'buddhism', 
  'hinduism', 'secular', 'universal'
];

async function selectDailyWisdom() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  const theme = DAILY_THEMES[dayOfWeek];
  const tradition = TRADITIONS[dayOfYear % TRADITIONS.length];
  
  console.log(`📅 Today's theme: ${theme} | Tradition: ${tradition}`);
  
  // Query Supabase for wisdom content
  const { data: wisdom, error } = await supabase
    .from('wisdom_quotes')
    .select('*')
    .eq('theme', theme)
    .eq('tradition', tradition)
    .limit(5);
    
  if (error || !wisdom?.length) {
    console.log('⚠️  No themed content found, selecting from general pool');
    
    // Fallback to general wisdom
    const { data: fallback } = await supabase
      .from('wisdom_quotes')
      .select('*')
      .eq('tradition', tradition)
      .limit(10);
      
    return fallback?.[Math.floor(Math.random() * fallback.length)];
  }
  
  // Select random quote from themed results
  return wisdom[Math.floor(Math.random() * wisdom.length)];
}

async function formatPost(wisdom) {
  const { quote, author, tradition, source } = wisdom;
  
  // Format for Twitter (280 char limit)
  let post = `"${quote}"`;
  
  if (author) {
    post += `\n— ${author}`;
  }
  
  // Add tradition/source if space allows
  const remaining = 280 - post.length - 20; // Buffer for hashtags
  if (remaining > 0 && source) {
    const sourceText = ` (${source})`;
    if (sourceText.length <= remaining) {
      post += sourceText;
    }
  }
  
  // Add relevant hashtags
  const themes = ['#SpiritualWisdom', '#DailyWisdom', '#Mindfulness'];
  const hashtag = themes[Math.floor(Math.random() * themes.length)];
  
  if (post.length + hashtag.length + 1 <= 280) {
    post += `\n\n${hashtag}`;
  }
  
  return post;
}

async function postToTwitter(content) {
  try {
    const tweet = await twitter.v2.tweet(content);
    console.log('✅ Posted to Twitter:', tweet.data.id);
    return tweet.data;
  } catch (error) {
    console.error('❌ Twitter posting failed:', error.message);
    throw error;
  }
}

async function logActivity(wisdom, platforms) {
  // Log posting activity to database
  const { error } = await supabase
    .from('content_activity')
    .insert({
      quote_id: wisdom.id,
      posted_at: new Date().toISOString(),
      platforms: platforms,
      theme: wisdom.theme,
      tradition: wisdom.tradition
    });
    
  if (error) {
    console.error('⚠️  Failed to log activity:', error.message);
  }
}

async function main() {
  try {
    console.log('🌟 Spirit Guide Content Bot - Daily Post');
    console.log('⏰', new Date().toISOString());
    
    // Select today's wisdom
    const wisdom = await selectDailyWisdom();
    if (!wisdom) {
      throw new Error('No wisdom content available');
    }
    
    console.log('📜 Selected wisdom:', `"${wisdom.quote}" - ${wisdom.author || 'Unknown'}`);
    
    // Format for social media
    const post = await formatPost(wisdom);
    console.log('📝 Formatted post:', post);
    
    // Post to platforms
    const platforms = [];
    
    // Twitter
    if (process.env.TWITTER_API_KEY) {
      await postToTwitter(post);
      platforms.push('twitter');
    }
    
    // TODO: Instagram posting
    // TODO: Website feed update
    
    // Log activity
    await logActivity(wisdom, platforms);
    
    console.log('✨ Daily wisdom posted successfully!');
    
  } catch (error) {
    console.error('💥 Error posting daily wisdom:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { selectDailyWisdom, formatPost, postToTwitter };