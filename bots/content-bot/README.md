# Content Management Bot

Daily wisdom posting and content curation for the Spirit Guide platform.

## Features

- **Daily Wisdom Posts** - Rotating spiritual quotes from multiple traditions
- **Themed Content** - Hope, peace, purpose, gratitude, etc.
- **Multi-Platform** - Twitter, Instagram, website feed
- **Content Calendar** - Plan and schedule posts in advance
- **Tradition Rotation** - Ensure balanced representation

## Setup

1. Configure API keys in `.env`:
   ```env
   TWITTER_API_KEY=your_key_here
   TWITTER_API_SECRET=your_secret_here
   TWITTER_ACCESS_TOKEN=your_token_here
   TWITTER_ACCESS_TOKEN_SECRET=your_token_secret_here
   
   INSTAGRAM_ACCESS_TOKEN=your_token_here
   
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run daily posting:
   ```bash
   node daily-post.js
   ```

## Content Sources

- **Christianity** - Bible verses, saints' wisdom
- **Islam** - Quran verses, Hadith sayings  
- **Judaism** - Torah, Talmud, rabbi teachings
- **Buddhism** - Buddha quotes, mindfulness teachings
- **Hinduism** - Vedas, Upanishads, guru wisdom
- **Secular** - Philosophers, modern spiritual teachers

## Usage

The bot runs on a daily schedule (7:00 AM local time) and:
1. Selects content based on the day's theme
2. Posts to configured social platforms
3. Updates the website's daily wisdom feed
4. Logs activity for analytics

## Content Guidelines

- **Respectful** - Honor each tradition authentically
- **Inclusive** - Avoid exclusionary language
- **Universal** - Focus on shared human values
- **Accessible** - Simple language, clear wisdom