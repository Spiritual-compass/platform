# Research Bot

Automated spiritual content discovery and resource finder for the Spirit Guide platform.

## Features

- **Content Discovery** - Find new spiritual quotes, teachings, and wisdom
- **Community Finder** - Locate spiritual communities and events by location
- **Trend Monitoring** - Track spiritual topics and discussions online
- **Source Verification** - Ensure authenticity of religious texts and quotes
- **Competitive Analysis** - Monitor similar spiritual platforms

## Capabilities

### 1. Wisdom Mining
- Search religious texts (Bible, Quran, Torah, Buddhist sutras, Hindu texts)
- Find quotes from spiritual leaders and philosophers  
- Discover modern spiritual teachings and insights
- Verify authenticity and provide proper attribution

### 2. Community Discovery
- Find local churches, temples, mosques, synagogues
- Discover meditation centers and spiritual groups
- Locate interfaith organizations and events
- Map spiritual communities by tradition and location

### 3. Trend Analysis
- Monitor spiritual hashtags and discussions
- Track emerging spiritual topics and interests
- Identify popular spiritual content and creators
- Analyze user engagement with different traditions

### 4. Resource Compilation
- Curate reading lists for different spiritual paths
- Find recommended books, podcasts, and videos
- Collect beginner guides for various traditions
- Compile crisis support and counseling resources

## Configuration

```env
# API Keys
GOOGLE_MAPS_API_KEY=your_key_here
TWITTER_BEARER_TOKEN=your_token_here
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_secret

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Search Settings
SEARCH_RADIUS_KM=50
MAX_RESULTS_PER_SEARCH=100
UPDATE_FREQUENCY_HOURS=24
```

## Usage

### Daily Research Tasks
```bash
# Find new wisdom quotes
node research/find-wisdom.js

# Update local community database  
node research/find-communities.js --location "New York, NY"

# Monitor trending spiritual topics
node research/track-trends.js

# Analyze competitor platforms
node research/competitive-analysis.js
```

### On-Demand Research
```bash
# Research specific tradition
node research/deep-dive.js --tradition buddhism

# Find resources for specific location
node research/local-resources.js --city "San Francisco" --tradition all
```

## Output

All research data is stored in Supabase tables:
- `wisdom_quotes` - Discovered spiritual wisdom
- `spiritual_communities` - Local religious/spiritual organizations  
- `trending_topics` - Popular spiritual discussions
- `resource_recommendations` - Books, podcasts, videos
- `research_logs` - Activity tracking and source attribution

## Ethics

- **Respectful Representation** - Honor all traditions authentically
- **Proper Attribution** - Always cite sources and authors
- **Privacy Conscious** - Don't collect personal spiritual data
- **Inclusive Discovery** - Seek diverse voices and perspectives