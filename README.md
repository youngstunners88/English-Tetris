# English Learning Tetris

> Learn English vocabulary while playing Tetris. Words fall like blocks — type them before they stack up!

A gamified language learning application that combines classic Tetris mechanics with vocabulary building. Perfect for ESL learners who want to improve their typing speed and word recognition while having fun.

![Game Preview](public/placeholder.svg)

## How It Works

1. **Words fall from the top** like Tetris pieces
2. **Type the word** before it reaches the bottom
3. **Complete words** to clear lines and score points
4. **Build streaks** for bonus multipliers
5. **Learn pronunciation** with ElevenLabs voice integration

## Features

### Core Gameplay
- **Tetris-inspired mechanics** — Words fall as blocks you must type
- **3 difficulty levels** — Easy (simple words), Medium (intermediate), Hard (advanced vocabulary)
- **Progressive difficulty** — Speed increases as you level up
- **Score tracking** — Words completed, streak multipliers, high scores

### Learning Features
- **Vocabulary building** — 30+ words per difficulty level with definitions
- **Voice pronunciation** — ElevenLabs AI voice speaks words aloud
- **Visual definitions** — See word meanings as you play
- **Mobile-friendly** — Touch controls for on-the-go learning

### Audio & Visual
- **Background music** — Lo-fi beats that change every 7 minutes
- **Sound effects** — Satisfying audio feedback for actions
- **Particle effects** — Celebratory visuals for streaks and level-ups
- **Dark mode UI** — Easy on the eyes for long sessions

## Tech Stack

- **Framework:** Next.js 14 + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Voice:** ElevenLabs API
- **Build:** Vite + SWC

## Getting Started

### Prerequisites
- Node.js 18+ or pnpm
- ElevenLabs API key (for voice features)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your ElevenLabs API key to .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Build for Production

```bash
pnpm build
pnpm start
```

## Game Controls

### Desktop
- **Arrow Keys** — Move falling piece
- **Up Arrow** — Rotate piece
- **Down Arrow** — Soft drop (speed up)
- **Space** — Hard drop (instant)
- **P** — Pause game
- **R** — Reset
- **M** — Toggle music

### Mobile
- On-screen touch controls
- Swipe gestures for movement

## Word Lists

| Difficulty | Word Examples | Skill Level |
|------------|---------------|---------------|
| Easy | cat, dog, sun, book, fish | Beginner (A1-A2) |
| Medium | happy, music, garden, travel | Intermediate (B1-B2) |
| Hard | knowledge, adventure, courage, mystery | Advanced (C1+) |

## Project Structure

```
app/                  # Next.js app routes
├── api/elevenlabs/   # Voice synthesis API
├── layout.tsx        # Root layout
└── page.tsx          # Game entry point

components/           # React components
├── ui/               # shadcn/ui components
├── game-board.tsx    # Main game grid
├── game-hud.tsx      # Score & stats display
├── tetris-game.tsx   # Desktop game wrapper
└── mobile-*.tsx      # Mobile components

data/                 # Game data
├── words.ts          # Word definitions by level
└── pieces.ts         # Tetris piece configurations

hooks/                # Custom React hooks
├── use-game-state.ts # Game logic & state
├── use-audio.ts      # Sound effects
├── use-elevenlabs-voice.ts  # Voice synthesis
└── use-background-music.ts   # BGM management

public/               # Static assets
└── icons/, images/
```

## Configuration

Create `.env.local` with:

```env
# Optional: ElevenLabs API key for voice features
# Get yours at https://elevenlabs.io
ELEVENLABS_API_KEY=your_api_key_here
```

Voice features work without an API key using browser fallback speech synthesis.

## Educational Value

This game helps ESL learners with:

- **Typing speed** — Muscle memory for English words
- **Word recognition** — Quick visual processing
- **Spelling accuracy** — Immediate feedback on errors
- **Vocabulary expansion** — Exposure to new words with context
- **Pronunciation** — Audio reinforcement of correct sounds

## Credits

- Built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)
- Voice synthesis by [ElevenLabs](https://elevenlabs.io)
- Background music: Lo-fi study beats

## License

MIT © 2026 — Open source for educational use.

---

**Built for learners, by learners.** 🎮📚
