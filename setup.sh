#!/bin/bash
# Professional Todo List App - Quick Setup Script

echo "🚀 Professional Todo List App - Installation & Setup"
echo "======================================================"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
node_version=$(node -v)
echo "  Node.js: $node_version"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    
    # Type checking
    echo "🔍 Running TypeScript type check..."
    npm run type-check
    echo ""
    
    # Linting
    echo "✓ Running ESLint..."
    npm run lint
    echo ""
    
    # Format code
    echo "✨ Formatting code with Prettier..."
    npm run format
    echo ""
    
    echo "======================================================"
    echo "✅ Setup Complete! Your app is ready to use."
    echo ""
    echo "📝 Available Commands:"
    echo "  npm run dev          - Start development server"
    echo "  npm run build        - Build for production"
    echo "  npm run preview      - Preview production build"
    echo "  npm run lint         - Check code quality"
    echo "  npm run type-check   - TypeScript verification"
    echo "  npm run format       - Format code"
    echo ""
    echo "🚀 To start developing:"
    echo "  npm run dev"
    echo ""
    echo "Application will open at: http://localhost:3000"
    echo "======================================================"
else
    echo "❌ Installation failed. Please check npm and try again."
    exit 1
fi
