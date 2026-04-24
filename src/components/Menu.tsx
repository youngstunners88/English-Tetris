import { useState } from 'react'
import { WordCategory } from '../types'

interface MenuProps {
  onStart: (category: WordCategory, difficulty: 'easy' | 'medium' | 'hard') => void
}

const categories: { id: WordCategory; name: string; emoji: string }[] = [
  { id: 'general', name: 'General', emoji: '🌍' },
  { id: 'business', name: 'Business', emoji: '💼' },
  { id: 'academic', name: 'Academic', emoji: '📚' },
  { id: 'travel', name: 'Travel', emoji: '✈️' },
  { id: 'technical', name: 'Technical', emoji: '⚙️' },
  { id: 'ielts', name: 'IELTS', emoji: '📝' },
  { id: 'toefl', name: 'TOEFL', emoji: '🎯' },
]

export default function Menu({ onStart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<WordCategory>('general')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold mb-2 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        English Tetris
      </h1>
      <p className="text-slate-400 text-lg mb-12 text-center max-w-md">
        Type the falling words before they hit the bottom!
      </p>

      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Category</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <span className="text-2xl mr-2">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Difficulty</h2>
        <div className="flex gap-3 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`flex-1 p-3 rounded-xl capitalize transition-all ${
                selectedDifficulty === diff
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <button
          onClick={() => onStart(selectedCategory, selectedDifficulty)}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start Game ▶
        </button>
      </div>

      <div className="mt-8 text-slate-500 text-sm">
        <p>How to play:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Words fall from the top</li>
          <li>Type them before they reach the bottom</li>
          <li>Correct words clear lines</li>
          <li>Build your vocabulary!</li>
        </ul>
      </div>
    </div>
  )
}
