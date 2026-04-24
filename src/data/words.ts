interface WordSet {
  easy: string[]
  medium: string[]
  hard: string[]
  expert: string[]
}

const WORD_BANK: Record<string, WordSet> = {
  general: {
    easy: ['cat', 'dog', 'sun', 'run', 'fun', 'box', 'red', 'big', 'hot', 'old'],
    medium: ['house', 'water', 'friend', 'family', 'school', 'happy', 'music', 'garden'],
    hard: ['beautiful', 'adventure', 'knowledge', 'experience', 'development'],
    expert: ['extraordinary', 'responsibility', 'consciousness', 'philosophical'],
  },
  business: {
    easy: ['job', 'work', 'boss', 'pay', 'deal', 'plan', 'team', 'sale'],
    medium: ['meeting', 'project', 'manager', 'contract', 'budget', 'strategy'],
    hard: ['negotiation', 'entrepreneur', 'investment', 'partnership'],
    expert: ['entrepreneurship', 'organizational', 'differentiation'],
  },
  academic: {
    easy: ['test', 'book', 'learn', 'class', 'study'],
    medium: ['research', 'analysis', 'academic', 'scholar', 'thesis'],
    hard: ['dissertation', 'methodology', 'bibliography', 'hypothesis'],
    expert: ['epistemological', 'methodological', 'interdisciplinary'],
  },
  travel: {
    easy: ['trip', 'tour', 'map', 'hotel', 'flight'],
    medium: ['passport', 'luggage', 'itinerary', 'destination', 'reservation'],
    hard: ['accommodation', 'transportation', 'international', 'exploration'],
    expert: ['multiculturalism', 'anthropological', 'archaeological'],
  },
  tech: {
    easy: ['app', 'web', 'code', 'data', 'user'],
    medium: ['software', 'hardware', 'network', 'database', 'algorithm'],
    hard: ['programming', 'development', 'architecture', 'optimization'],
    expert: ['microarchitecture', 'containerization', 'virtualization'],
  },
}

export function getWordsByCategory(category: string, difficulty: string): string[] {
  const set = WORD_BANK[category] || WORD_BANK.general
  
  // Combine current difficulty + below
  let words: string[] = []
  if (difficulty === 'expert') words = [...set.expert]
  if (difficulty === 'hard' || difficulty === 'expert') words = [...words, ...set.hard]
  if (difficulty === 'medium' || difficulty === 'hard' || difficulty === 'expert') {
    words = [...words, ...set.medium]
  }
  words = [...words, ...set.easy]
  
  return words
}

export function addCustomWord(category: string, word: string, difficulty: string): void {
  if (!WORD_BANK[category]) {
    WORD_BANK[category] = { easy: [], medium: [], hard: [], expert: [] }
  }
  WORD_BANK[category][difficulty as keyof WordSet].push(word)
}
