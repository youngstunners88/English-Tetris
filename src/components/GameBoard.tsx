import { useEffect, useState, useCallback, useRef } from 'react'
import { useGameStore } from '../hooks/useGameStore'
import { getWordsByCategory } from '../data/words'

interface GameBoardProps {
  category: string
  difficulty: string
  onExit: () => void
}

interface FallingWord {
  id: string
  word: string
  x: number
  y: number
  speed: number
  typed: string
}

const DIFFICULTY_SPEEDS: Record<string, number> = {
  easy: 0.5,
  medium: 1,
  hard: 2,
  expert: 3.5,
}

const SPAWN_RATES: Record<string, number> = {
  easy: 3000,
  medium: 2000,
  hard: 1500,
  expert: 1000,
}

export default function GameBoard({ category, difficulty, onExit }: GameBoardProps) {
  const [words, setWords] = useState<FallingWord[]>([])
  const [input, setInput] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const boardRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastSpawnRef = useRef(0)

  const wordList = getWordsByCategory(category, difficulty)
  const speed = DIFFICULTY_SPEEDS[difficulty]
  const spawnRate = SPAWN_RATES[difficulty]

  const spawnWord = useCallback(() => {
    const word = wordList[Math.floor(Math.random() * wordList.length)]
    const boardWidth = boardRef.current?.offsetWidth || 600
    const x = Math.random() * (boardWidth - 200) + 50
    
    const newWord: FallingWord = {
      id: Math.random().toString(36).substr(2, 9),
      word: word,
      x,
      y: 0,
      speed: speed * (1 + level * 0.1),
      typed: '',
    }
    
    setWords(prev => [...prev, newWord])
  }, [wordList, speed, level])

  const gameLoop = useCallback((timestamp: number) => {
    if (gameOver) return

    // Spawn new words
    if (timestamp - lastSpawnRef.current > spawnRate) {
      spawnWord()
      lastSpawnRef.current = timestamp
    }

    // Update word positions
    setWords(prev => {
      const updated = prev.map(w => ({
        ...w,
        y: w.y + w.speed,
      }))

      // Check for words hitting bottom
      const boardHeight = boardRef.current?.offsetHeight || 500
      const survivors = updated.filter(w => {
        if (w.y > boardHeight - 50) {
          setLives(l => {
            const newLives = l - 1
            if (newLives <= 0) setGameOver(true)
            return newLives
          })
          return false
        }
        return true
      })

      return survivors
    })

    animationRef.current = requestAnimationFrame(gameLoop)
  }, [gameOver, spawnRate, spawnWord])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameLoop])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)

    // Check for matching words
    setWords(prev => {
      const matches = prev.filter(w => w.word === value)
      if (matches.length > 0) {
        setScore(s => s + matches[0].word.length * 10 * level)
        setInput('')
        return prev.filter(w => w.word !== value)
      }
      return prev
    })

    // Level up every 100 points
    setScore(s => {
      const newLevel = Math.floor(s / 100) + 1
      if (newLevel > level) setLevel(newLevel)
      return s
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onExit()
    }
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>English Tetris</h1>
        <div className="score-display">
          <div className="score-item">
            <div className="label">Score</div>
            <div className="value">{score}</div>
          </div>
          <div className="score-item">
            <div className="label">Level</div>
            <div className="value">{level}</div>
          </div>
          <div className="score-item">
            <div className="label">Lives</div>
            <div className="value">{'❤️'.repeat(lives)}</div>
          </div>
          <div className="score-item">
            <div className="label">Words</div>
            <div className="value">{words.length}</div>
          </div>
        </div>
      </div>

      <div 
        ref={boardRef}
        className="game-board"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {words.map(w => (
          <div
            key={w.id}
            className="word-block"
            style={{
              position: 'absolute',
              left: w.x,
              top: w.y,
              transform: `translateY(${w.y}px)`,
            }}
          >
            {w.word}
          </div>
        ))}

        {gameOver && (
          <div className="game-over-overlay">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button className="btn-primary" onClick={onExit}>
              Back to Menu
            </button>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type words to clear them..."
          disabled={gameOver}
          autoFocus
        />
        <p className="hint">Press ESC to exit</p>
      </div>
    </div>
  )
}
