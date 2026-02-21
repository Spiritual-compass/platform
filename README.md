# Spiritual Compass Platform 🧭

> **Multi-religious spiritual guidance for seekers finding their sacred direction**

[![Netlify Status](https://api.netlify.com/api/v1/badges/spiritual-compass/deploy-status)](https://spiritual-compass.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Site:** [spiritual-compass.com](https://spiritual-compass.com)

## 🌟 Vision

Spiritual Compass helps lonely and seeking individuals find wisdom, community, and their spiritual path in the digital age. We provide respectful guidance across multiple religious and spiritual traditions without judgment or proselytizing.

### Core Values
- **Respectful** - Honor all spiritual traditions authentically
- **Inclusive** - Welcome seekers from any background
- **Safe** - Non-judgmental space for spiritual exploration
- **Helpful** - Practical guidance and real community connections

## ✨ Features

### 🔍 Spiritual Assessment
Thoughtful questionnaire helping users discover spiritual traditions that align with their values and seeking.

### 📖 Daily Wisdom
Rotating spiritual quotes and teachings from multiple faith traditions:
- Christianity, Islam, Judaism
- Buddhism, Hinduism  
- Secular philosophy and modern spirituality

### 🤝 Community Finder
Locate spiritual communities, meditation groups, and houses of worship by location and tradition.

### 🤖 Intelligent Bots
- **Content Bot** - Daily wisdom posting across social platforms
- **Research Bot** - Discover new spiritual content and communities
- **Moderation Bot** - Maintain respectful, safe discussions

## 🏗️ Technical Architecture

### Frontend
- **Framework:** Vanilla HTML/CSS/JavaScript (Progressive enhancement)
- **Hosting:** Netlify with CDN
- **Domain:** spiritual-compass.com (Cloudflare DNS)
- **Forms:** Netlify Forms for assessment and contact

### Backend & APIs
- **Database:** Supabase (PostgreSQL)
- **APIs:** Serverless functions (Netlify/Vercel)
- **Authentication:** Netlify Identity (future feature)

### Bots & Automation
- **Platform:** Node.js with scheduled functions
- **Social Media:** Twitter API, Instagram Basic Display
- **Content Sources:** Religious text APIs, wisdom databases
- **Hosting:** Serverless deployment (Netlify/Vercel Functions)

## 📁 Project Structure

```
spiritual-compass/
├── public/                 # Website files (deployed to Netlify)
│   ├── index.html         # Landing page
│   ├── assessment/        # Spiritual assessment
│   ├── wisdom/           # Daily wisdom display
│   ├── community/        # Community finder
│   ├── styles/           # CSS files
│   ├── scripts/          # JavaScript
│   └── _redirects        # Netlify redirects
│
├── bots/                  # Automation bots
│   ├── content-bot/      # Daily wisdom posting
│   ├── research-bot/     # Content discovery
│   └── moderation-bot/   # Community safety
│
├── functions/            # Serverless API functions
│   ├── wisdom-api.js     # Daily wisdom endpoint
│   ├── assessment.js     # Process spiritual assessments
│   └── community.js      # Community finder API
│
├── database/             # Database schemas and migrations
│   ├── schema.sql        # PostgreSQL schema
│   └── migrations/       # Database updates
│
└── docs/                 # Documentation
    ├── SETUP.md          # Development setup
    ├── DEPLOYMENT.md     # Deployment guide
    └── API.md           # API documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- Netlify CLI (optional)

### Local Development
```bash
# Clone repository
git clone https://github.com/spiritual-compass/platform.git
cd platform

# Install dependencies
npm install

# Start local development server
npm run dev

# Open http://localhost:3000
```

### Deployment
```bash
# Deploy to Netlify
npm run deploy

# Deploy bots
npm run deploy:bots
```

## 🤖 Bot Operations

### Content Bot - Daily Wisdom
```bash
# Run daily posting manually
npm run bot:content

# Schedule daily (7:00 AM)
npm run bot:schedule
```

### Research Bot - Content Discovery  
```bash
# Discover new wisdom content
npm run bot:research

# Find local communities
npm run bot:research -- --communities
```

## 📊 Analytics & Monitoring

- **Website:** Google Analytics (privacy-focused)
- **Forms:** Netlify Analytics
- **Bots:** Custom logging to Supabase
- **Uptime:** Netlify status monitoring

## 🔒 Privacy & Security

- **Data Protection:** GDPR compliant, minimal data collection
- **Spiritual Privacy:** Assessment responses encrypted
- **Safe Space:** Proactive moderation, crisis resources
- **Email Security:** SPF, DKIM, DMARC configured

## 🤝 Contributing

We welcome contributions from developers, spiritual practitioners, and community builders!

### Ways to Contribute
- **Code** - Frontend, bots, API improvements
- **Content** - Wisdom quotes, spiritual resources
- **Community** - Moderation, user support
- **Documentation** - Setup guides, API docs

### Guidelines
1. Respect all spiritual traditions
2. Follow inclusive language practices  
3. Test thoroughly before submitting
4. Document changes clearly

### Development Setup
See [SETUP.md](docs/SETUP.md) for detailed development instructions.

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 💫 Acknowledgments

- **Spiritual Traditions** - For wisdom shared across cultures and centuries
- **Open Source Community** - For tools and frameworks that make this possible
- **Contributors** - Everyone helping build a more connected spiritual world

## 📞 Contact

- **Website:** [spiritual-compass.com](https://spiritual-compass.com)
- **Email:** guidance@spiritual-compass.com
- **Support:** [Contact Form](https://spiritual-compass.com/#contact)

---

**Built with 💙 for spiritual seekers everywhere**