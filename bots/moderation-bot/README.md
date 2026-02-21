# Community Moderation Bot

Ensures respectful, safe spiritual discussions on the Spirit Guide platform.

## Core Principles

- **Respect All Traditions** - Honor diverse spiritual paths equally
- **Safe Space** - Protect vulnerable users seeking spiritual guidance  
- **Constructive Dialogue** - Encourage thoughtful, helpful conversations
- **Zero Tolerance** - No discrimination, harassment, or hate speech

## Features

### 1. Content Moderation
- **Automatic Filtering** - Flag inappropriate content using AI
- **Community Reports** - Process user-submitted reports
- **Context Awareness** - Understand spiritual/religious context
- **Appeal Process** - Allow users to contest moderation decisions

### 2. User Support
- **Welcome Messages** - Greet new members warmly
- **Guideline Reminders** - Gentle nudges about community standards
- **Resource Suggestions** - Connect users with appropriate help
- **Crisis Detection** - Identify users in spiritual/emotional crisis

### 3. Discussion Facilitation
- **Conversation Starters** - Suggest thoughtful discussion topics
- **Bridge Building** - Help users find common ground across traditions
- **Learning Opportunities** - Share educational content about different faiths
- **Celebration Alerts** - Acknowledge religious holidays and observances

## Moderation Guidelines

### ✅ Encouraged Content
- Personal spiritual experiences and questions
- Respectful discussions about different traditions
- Sharing wisdom, quotes, and teachings (with attribution)
- Seeking guidance during difficult times
- Celebrating spiritual milestones and holidays

### ⚠️ Requires Review
- Theological debates (keep constructive)
- Personal religious conversion experiences
- Criticism of religious institutions (focus on ideas, not people)
- Mental health discussions (provide appropriate resources)

### ❌ Prohibited Content
- Hate speech or discrimination based on religion/belief
- Proselytizing or aggressive conversion attempts
- Sharing personal information or private spiritual confessions
- Off-topic discussions unrelated to spiritual growth
- Spam, commercial promotion, or self-promotion

## Response Strategies

### Level 1: Gentle Guidance
```
"Thanks for sharing! To help maintain our respectful community, could you rephrase this in a way that honors all spiritual paths? 🙏"
```

### Level 2: Community Reminder
```
"Reminder: Our community welcomes seekers from all traditions. Let's focus on our shared values of compassion and understanding. 💜"
```

### Level 3: Direct Intervention
```
"This comment violates our community guidelines. It has been removed. Please review our guidelines [link] and reach out if you have questions."
```

### Level 4: Crisis Support
```
"It sounds like you're going through a difficult time. While our community offers spiritual support, for immediate help please consider contacting [crisis resources]. You're not alone. 💙"
```

## Technology Stack

- **AI Content Analysis** - OpenAI GPT for context understanding
- **Sentiment Analysis** - Detect emotional distress or hostility
- **Auto-Reporting** - Flag problematic content for human review
- **Database Integration** - Track moderation actions and user history
- **Multi-Platform** - Discord, website comments, social media

## Configuration

```env
# AI Services
OPENAI_API_KEY=your_key_here
PERSPECTIVE_API_KEY=your_key_here

# Platform Integration  
DISCORD_BOT_TOKEN=your_token_here
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Crisis Resources
CRISIS_TEXT_LINE=text HOME to 741741
SUICIDE_PREVENTION=988
SPIRITUAL_CRISIS_RESOURCES=custom_list.json
```

## Usage

### Automated Monitoring
```bash
# Start continuous monitoring
node moderation/auto-monitor.js

# Process user reports queue  
node moderation/process-reports.js

# Daily community health check
node moderation/health-check.js
```

### Manual Actions
```bash
# Review flagged content
node moderation/review-queue.js

# Generate moderation report
node moderation/generate-report.js --period weekly

# Update community guidelines
node moderation/update-guidelines.js
```

## Human Oversight

- **Daily Reviews** - Human moderator checks bot actions
- **Appeals Process** - Users can contest automated decisions
- **Policy Updates** - Regular review and refinement of guidelines
- **Community Feedback** - Monthly surveys on moderation effectiveness