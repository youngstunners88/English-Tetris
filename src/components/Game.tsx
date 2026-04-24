import { useEffect, useRef, useState, useCallback } from 'react'
import { WordBlock, GameStats, WordCategory } from '../types'
import { getWordsByCategory } from '../data/words'
import { useGameStore } from '../store/gameStore'

interface GameProps {
  category: WordCategory
  difficulty: 'easy' | 'medium' | 'hard'
  onGameOver: (score: number) => void
}

const DIFFICULTY_SETTINGS = {
  easy: { startSpeed: 0.5, speedIncrement: 0.05, spawnInterval: 3000 },
  medium: { startSpeed: 1, speedIncrement: 0.1, spawnInterval: 2500 },
  hard: { startSpeed: 1.5, speedIncrement: 0.15, spawnInterval: 2000 },
}

const GAME_HEIGHT = 600
const GAME_WIDTH = 800
const LINE_HEIGHT = 60
const BOTTOM_LINE = GAME_HEIGHT - LINE_HEIGHT

export default function Game({ category, difficulty, onGameOver }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [blocks, setBlocks] = useState<WordBlock[]>([])
  const [input, setInput] = useState('')
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    wordsCompleted: 0,
    accuracy: 100,
    streak: 0,
    level: 1,
  })
  const [gameOver, setGameOver] = useState(false)
  
  const words = getWordsByCategory(category)
  const settings = DIFFICULTY_SETTINGS[difficulty]
  const speedRef = useRef(settings.startSpeed)
  const lastSpawnRef = useRef(0)
  const animationRef = useRef<number>()

  const spawnWord = useCallback(() => {
    const word = words[Math.floor(Math.random() * words.length)]
    const newBlock: WordBlock = {
      id: Math.random().toString(36).substring(7),
      word: word,
      x: Math.random() * (GAME_WIDTH - 200) + 100,
      y: 0,
      speed: speedRef.current,
      typed: '',
    }
    setBlocks((prev) => [...prev, newBlock])
  }, [words])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)

    // Check if any block matches the input
    setBlocks((prev) => {
      const updated = prev.map((block) => {
        if (block.word.toLowerCase().startsWith(value)) {
          return { ...block, typed: value }
        }
        return block
      })

      // Check for completed words
      const completed = updated.filter((b) => b.word.toLowerCase() === value)
      if (completed.length > 0) {
        setInput('')
        setGameStats((s) => ({
          ...s,
          score: s.score + completed[0].word.length * 10 + s.streak * 5,
          wordsCompleted: s.wordsCompleted + 1,
          streak: s.streak + 1,
        }))
        return updated.filter((b) => b.word.toLowerCase() !== value)
      }

      return updated
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameLoop = (timestamp: number) => {
      if (gameOver) return

      // Clear canvas
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Draw bottom line
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, BOTTOM_LINE)
      ctx.lineTo(GAME_WIDTH, BOTTOM_LINE)
      ctx.stroke()

      // Spawn new words
      if (timestamp - lastSpawnRef.current > settings.spawnInterval) {
        if (blocks.length < 5) {
          spawnWord()
          lastSpawnRef.current = timestamp
        }
      }

      // Update and draw blocks
      setBlocks((prev) => {
        const updated = prev
          .map((block) => ({ ...block, y: block.y + block.speed }))
          .filter((block) => {
            if (block.y > BOTTOM_LINE) {
              setGameStats((s) => ({ ...s, streak: 0 }))
              return false
            }
            return true
          })

        // Check if any block hit bottom
        if (updated.some((b) => b.y > BOTTOM_LINE - 20)) {
          setGameOver(true)
        }

        return updated
      })

      // Draw blocks
      blocks.forEach((block) => {
        // Background
        ctx.fillStyle = 'rgba(6, 182, 212, 0.2)'
        ctx.fillRect(block.x - 10, block.y - 5, block.word.length * 12 + 20, 30)

        // Border
        ctx.strokeStyle = '#06b6d4'
        ctx.lineWidth = 2
        ctx.strokeRect(block.x - 10, block.y - 5, block.word.length * 12 + 20, 30)

        // Text
        ctx.font = 'bold 20px system-ui'
        
        // Typed part (green)
        if (block.typed) {
          ctx.fillStyle = '#22c55e'
          ctx.fillText(block.typed, block.x, block.y + 18)
        }
        
        // Remaining part (white)
        ctx.fillStyle = '#ffffff'
        const remaining = block.word.slice(block.typed.length)
        ctx.fillText(remaining, block.x + ctx.measureText(block.typed).width, block.y + 18)
      })

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [blocks.length, gameOver, settings.spawnInterval, spawnWord])

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
        <p className="text-2xl mb-2">Final Score: {gameStats.score}</p>
        <p className="text-lg text-slate-400 mb-6">
          Words Completed: {gameStats.wordsCompleted}
        </p>
        <button
          onClick={() => onGameOver(gameStats.score)}
          className="px-6 py-3 bg-cyan-500 rounded-xl font-bold hover:bg-cyan-600"
        >
          Back to Menu
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <div className="text-left">
          <p className="text-2xl font-bold">Score: {gameStats.score}</p>
          <p className="text-slate-400">Streak: {gameStats.streak}🔥</p>
        </div>
        <div className="text-right">
          <p className="text-xl">Level: {gameStats.level}</p>
          <p className="text-slate-400">{category}</p>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="border-2 border-slate-700 rounded-xl bg-slate-900"
      />

      <div className="mt-6 w-full max-w-4xl">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Type the falling words..."
          autoFocus
          className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-xl text-center focus:border-cyan-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
