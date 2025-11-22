# ZenLog - 心灵日记

A mobile-first, conversational gratitude and happiness journal designed to help stressed professionals capture and rediscover small moments of happiness (小确幸).

## ✨ Features

### 🏯 心灵庇护所 (Sanctuary Chat)
- **Chat-based Interface**: Natural conversation flow for logging gratitude moments
- **AI Gardener**: Intelligent processing with:
  - Auto-tagging based on content analysis
  - Sentiment detection
  - Encouraging responses
- **Echo Mechanism**: Automatically surfaces related past memories when relevant
- **Flashback Cards**: Beautiful cards that display connected memories from your past

### 💎 记忆宝库 (Memory Jar)
- **Gallery View**: Browse all your happy moments in a beautiful card layout
- **Random Pick**: Get a random past memory to brighten your day
- **Auto-categorization**: See your memories organized with auto-generated tags

## 🎨 Design Philosophy

**Zen Minimalism**
- Soft, warm neutral color palette (creams, soft greys)
- Generous whitespace for a calm, uncluttered experience
- Elegant typography mixing Inter (sans) and Noto Serif
- Subtle animations for smooth, peaceful interactions
- Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your DeepSeek API key

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 API Configuration

ZenLog uses DeepSeek AI for intelligent, context-aware responses.

1. Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Copy `.env.example` to `.env.local`
3. Add your API key:
   ```
   DEEPSEEK_API_KEY=your_api_key_here
   ```

The app will automatically fall back to local responses if the API is unavailable.

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **AI**: DeepSeek Chat API (with local fallback)
- **Styling**: Tailwind CSS v3
- **Components**: Custom components with Shadcn/UI patterns
- **Icons**: Lucide React
- **Storage**: LocalStorage for persistence

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main app with tab navigation
│   └── globals.css         # Global styles & Zen color scheme
├── components/
│   ├── ui/                 # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── sanctuary-chat.tsx  # Main chat interface
│   ├── memory-jar.tsx      # Memory gallery view
│   ├── chat-bubble.tsx     # Message bubble component
│   └── flashback-card.tsx  # Past memory card component
└── lib/
    ├── context/
    │   └── journal-context.tsx  # Global state & LocalStorage
    ├── ai-gardener.ts      # Mock AI logic & Echo mechanism
    ├── types.ts            # TypeScript type definitions
    └── utils.ts            # Utility functions
```

## 🎯 Key Features Explained

### AI Gardener
The AI Gardener processes each journal entry to:
1. **Extract Tags**: Analyzes content for themes (#Work, #Social, #Nature, etc.)
2. **Detect Sentiment**: Identifies positive, neutral, or negative emotions
3. **Generate Response**: Provides encouraging acknowledgment
4. **Find Connections**: Searches for related past memories based on tag overlap

### Echo Mechanism
When you share a happy moment, ZenLog may surface a related memory from your past:
- 40% chance to show a related memory
- Matches based on common tags
- Only shows positive memories
- Includes both mock demo memories and your actual past entries

### LocalStorage Persistence
All your journal entries are automatically saved to browser LocalStorage:
- No backend required for MVP
- Data persists across sessions
- Easy to migrate to a database later

## 🎨 Color Palette

The Zen-minimalist color scheme uses warm, soothing neutrals:

- **Background**: Soft cream (`hsl(40 20% 97%)`)
- **Foreground**: Warm dark grey (`hsl(30 10% 25%)`)
- **Primary**: Warm earth tone (`hsl(30 15% 40%)`)
- **Accent**: Warm beige (`hsl(35 30% 85%)`)
- **Border**: Subtle grey (`hsl(40 10% 88%)`)

## 📱 Mobile-First Design

ZenLog is designed primarily for mobile use:
- Touch-friendly interface
- Optimized for vertical scrolling
- Bottom navigation for easy thumb access
- Responsive breakpoints for tablet & desktop

## 🔮 Future Enhancements

Potential features for future versions:
- Backend integration with database
- User authentication
- Advanced AI with real NLP
- Voice input for journal entries
- Export/backup functionality
- Weekly/monthly reflection summaries
- Mood tracking visualization
- Social features (optional sharing)

## 📄 License

MIT License - feel free to use this for your own zen journey.

## 🙏 Acknowledgments

Built with calm technology principles in mind - technology that works quietly in the background, supporting you without demanding attention.
