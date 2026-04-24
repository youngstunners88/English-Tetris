export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'

export interface WordBlock {
  id: string
  word: string
  x: number
  y: number
  speed: number
  typed: string
}

export interface GameStats {
  score: number
  wordsCompleted: number
  accuracy: number
  streak: number
  level: number
}

export type WordCategory = 
  | 'general'
  | 'business'
  | 'academic'
  | 'travel'
  | 'technical'
  | 'ielts'
  | 'toefl'
