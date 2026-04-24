import { useState } from 'react'
import './StartScreen.css'

interface StartScreenProps {
  onStart: (category: string, difficulty: string) => void
}

const CATEGORIES = [
  { id: 'general', name: 'General', emoji: '🌍', desc: 'Common English words' },
  { id: 'business', name: 'Business', emoji: '💼', desc: 'Professional vocabulary' },
  { id: 'academic', name: 'Academic', emoji: '🎓', desc: 'IELTS/TOEFL words' },
  { id: 'travel', name: 'Travel', emoji: '✈️', desc: 'Tourism & transport' },
  { id: 'tech', name: 'Tech', emoji: '💻', desc: 'Technology terms' },
]

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', emoji: '🟢', speed: 'Slow', wordLength: '3-5 letters' },
  { id: 'medium', name: 'Medium', emoji: '🟡', speed: 'Normal', wordLength: '5-8 letters' },
  { id: 'hard', name: 'Hard', emoji: '🔴', speed: 'Fast', wordLength: '8+ letters' },
  { id: 'expert', name: 'Expert', emoji: '⚫', speed: 'Very Fast', wordLength: 'All' },
]

export default function StartScreen({ onStart }: StartScreenProps) {
  const [category, setCategory] = useState('general')
  const [difficulty, setDifficulty] = useState('easy')

  return (
    <div className="start-screen">
      <div className="title-section">
        <h1 className="game-title">🎮 English Tetris</h1>
        <p className="tagline">Type words before they stack up!</p>
      </div>

      <div className="selection-section">
        <h2>Select Category</h2>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-card ${category === cat.id ? 'selected' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="emoji">{cat.emoji}</span>
              <span className="name">{cat.name}</span>
              <span className="desc">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="selection-section">
        <h2>Select Difficulty</h2>
        <div className="difficulty-grid">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              className={`difficulty-card ${difficulty === diff.id ? 'selected' : ''}`}
              onClick={() => setDifficulty(diff.id)}
            >
              <span className="emoji">{diff.emoji}</span>
              <span className="name">{diff.name}</span>
              <span className="meta">{diff.speed} • {diff.wordLength}</span>
            </button>
          ))}
        </div>
      </div>

      <button 
        className="btn-primary start-button"
        onClick={() => onStart(category, difficulty)}
      >
        Start Game ▶
      </button>
    </div>
  )
}
