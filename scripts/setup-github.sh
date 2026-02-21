#!/bin/bash

# GitHub Repository Setup Script for Spiritual Compass
# Run this after creating the GitHub organization

echo "🧭 Setting up Spiritual Compass GitHub Repository"
echo "=================================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if gh CLI is installed (optional but helpful)
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected"
    GH_CLI_AVAILABLE=true
else
    echo "ℹ️  GitHub CLI not found (optional)"
    GH_CLI_AVAILABLE=false
fi

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create initial commit
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "🎉 Initial commit: Spiritual Compass platform

- Complete website with spiritual assessment
- Daily wisdom system with multi-faith quotes  
- Three operational bots (content, research, moderation)
- Netlify deployment configuration
- Cloudflare DNS integration
- Responsive design with peaceful aesthetics

Ready for deployment to spiritual-compass.com"
    echo "✅ Initial commit created"
else
    echo "✅ Repository already has commits"
fi

# Set up remote origin
echo ""
echo "🔗 GitHub Repository Setup"
echo "=========================="

if [ "$GH_CLI_AVAILABLE" = true ]; then
    echo "Using GitHub CLI to create repository..."
    
    read -p "Create new GitHub organization 'spiritual-compass'? (y/n): " create_org
    if [ "$create_org" = "y" ]; then
        gh org create spiritual-compass --display-name "Spiritual Compass" --description "Multi-religious spiritual guidance platform"
        echo "✅ Organization created"
    fi
    
    # Create repository
    echo "Creating repository..."
    gh repo create spiritual-compass/platform --public --description "Multi-religious spiritual guidance platform for seekers finding their sacred direction" --homepage "https://spiritual-compass.com"
    
    # Set remote
    git remote add origin https://github.com/spiritual-compass/platform.git
    echo "✅ Remote origin set"
    
else
    echo "Manual GitHub setup required:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create organization: spiritual-compass"
    echo "3. Create repository: spiritual-compass/platform"
    echo "4. Set description: 'Multi-religious spiritual guidance platform for seekers finding their sacred direction'"
    echo "5. Set homepage: https://spiritual-compass.com"
    echo "6. Make repository public"
    echo "7. Don't initialize with README (we have one)"
    echo ""
    echo "Then run these commands:"
    echo "git remote add origin https://github.com/spiritual-compass/platform.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    read -p "Press Enter when you've created the GitHub repository..."
    
    # Add remote
    git remote add origin https://github.com/spiritual-compass/platform.git 2>/dev/null || echo "Remote already exists"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "🎉 SUCCESS! Spiritual Compass repository is now on GitHub!"
echo "=================================================="
echo ""
echo "🔗 Repository: https://github.com/spiritual-compass/platform"
echo "🌐 Website: spiritual-compass.com (ready for Netlify deployment)"
echo ""
echo "Next Steps:"
echo "1. Connect repository to Netlify"
echo "2. Deploy to spiritual-compass.com"  
echo "3. Configure environment variables"
echo "4. Set up bot automation"
echo ""
echo "The spiritual journey begins! 🧭✨"