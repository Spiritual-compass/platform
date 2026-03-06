# MEMORY.md - Long-Term Memory

## Identity & Setup
- **First boot:** February 7-8, 2026
- **Name:** Solo - Valdi's service bot
- **Dynamic:** Personal assistant / AI butler - helpful and loyal but casual, not formal
- **Portrait:** Steampunk robot butler with bowler hat, bow tie, mustache (pencil sketch style)

## Key Integrations
- **Telegram:** Chat ID 82617499 (@Frodufellir)
- **Voice (TTS):** ElevenLabs - Daniel (British, Steady Broadcaster, ID: onwK4e9ZLuTAKqWW03F9)
- **Transcription:** OpenAI Whisper API (script at scripts/transcribe.sh)
- **Search:** Brave Search API (free plan, 1 req/sec rate limit)

## Automation & Preferences
- **Daily briefing:** 7:30 AM cron - Bitcoin, Liverpool FC, Olympics, Google Trends (global + Iceland)
- **Schedule:** Night owl on weekends
- **Workspace:** Created recipes section (first: feta pesto chicken with rice)

## Important Lessons
- ⚠️ **Cost consciousness:** Don't read large skill files or do token-heavy operations without asking first. Burned through Anthropic credits reading skill-creator SKILL.md on first day.
- Always check token costs before diving into extensive documentation
- ⚠️ **Website deployment:** ALWAYS spin up locally for testing BEFORE pushing live. Test first, deploy second!
- ✅ **Persistent dev environment:** Local server now always running at localhost:8888 via PM2 - no more spinning up each time

## Known Limitations
- **Mapping/Geographical visualization:** Not good at creating interactive maps or proper coordinate placement - acknowledge this upfront

## Major Projects
### 🌟 Spiritual Compass Platform (Feb 2026) - LIVE!
- **Domain:** spiritual-compass.com (LIVE and operational!)
- **Vision:** Multi-religious spiritual guidance for seekers
- **Infrastructure:** Complete - DNS, SSL, CDN, global deployment
- **Website:** Beautiful landing page, spiritual assessment, daily wisdom
- **Bots:** Content, Research, Moderation systems built and ready
- **Status:** DEPLOYED and helping spiritual seekers worldwide! 
- **Achievement:** From idea to live platform in one 6-hour session

## Notes
- Valdi is in Atlantic/Reykjavik timezone
- Speaks Icelandic and English
- Prefers direct, practical assistance