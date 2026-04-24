import { create } from 'zustand'
import { GameStats } from '../types'

interface GameState {
  stats: GameStats
  isPlaying: boolean
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  
  startGame: (category: string, difficulty: 'easy' | 'medium' | 'hard') => void
  endGame: () => void
  updateScore: (points: number) => void
  incrementStreak: () => void
  resetStreak: () => void
  reset: () => void
}

const initialStats: GameStats = {
  score: 0,
  wordsCompleted: 0,
  accuracy: 100,
  streak: 0,
  level: 1,
}

export const useGameStore = create<GameState>((set) => ({
  stats: initialStats,
  isPlaying: false,
  category: 'general',
  difficulty: 'easy',

  startGame: (category, difficulty) => set({
    stats: initialStats,
    isPlaying: true,
    category,
    difficulty,
  }),

  endGame: () => set({ isPlaying: false }),

  updateScore: (points) => set((state) => ({
    stats: {
      ...state.stats,
      score: state.stats.score + points,
      wordsCompleted: state.stats.wordsCompleted + 1,
    },
  })),

  incrementStreak: () => set((state) => ({
    stats: {
      ...state.stats,
      streak: state.stats.streak + 1,
    },
  })),

  resetStreak: () => set((state) => ({
    stats: {
      ...state.stats,
      streak: 0,
    },
  })),

  reset: () => set({
    stats: initialStats,
    isPlaying: false,
    category: 'general',
    difficulty: 'easy',
  }),
}))
