import { create } from 'zustand'

interface GameState {
  score: number
  level: number
  lives: number
  wordsTyped: number
  accuracy: number
  streak: number
  
  // Actions
  incrementScore: (points: number) => void
  levelUp: () => void
  loseLife: () => void
  wordTyped: (correct: boolean) => void
  reset: () => void
  
  // Stats
  totalGames: number
  highScore: number
  wordsLearned: string[]
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  level: 1,
  lives: 3,
  wordsTyped: 0,
  accuracy: 100,
  streak: 0,
  totalGames: 0,
  highScore: 0,
  wordsLearned: [],

  incrementScore: (points) => set((state) => {
    const newScore = state.score + points
    return {
      score: newScore,
      highScore: Math.max(newScore, state.highScore),
    }
  }),

  levelUp: () => set((state) => ({ level: state.level + 1 })),

  loseLife: () => set((state) => ({
    lives: state.lives - 1,
    streak: 0,
  })),

  wordTyped: (correct) => set((state) => ({
    wordsTyped: state.wordsTyped + 1,
    streak: correct ? state.streak + 1 : 0,
    accuracy: Math.round(
      (state.accuracy * state.wordsTyped + (correct ? 100 : 0)) / 
      (state.wordsTyped + 1)
    ),
  })),

  reset: () => set((state) => ({
    score: 0,
    level: 1,
    lives: 3,
    wordsTyped: 0,
    accuracy: 100,
    streak: 0,
    totalGames: state.totalGames + 1,
  })),
}))
