// Word banks by category
const wordBanks: Record<string, string[]> = {
  general: [
    'hello', 'world', 'computer', 'language', 'learning', 'education',
    'knowledge', 'science', 'technology', 'future', 'progress', 'success',
    'dream', 'hope', 'believe', 'achieve', 'create', 'innovate',
    'discover', 'explore', 'adventure', 'journey', 'destination', 'path',
    'bridge', 'connection', 'network', 'community', 'society', 'culture',
    'history', 'memory', 'experience', 'wisdom', 'truth', 'beauty',
    'nature', 'environment', 'ecosystem', 'planet', 'universe', 'galaxy',
  ],
  business: [
    'strategy', 'management', 'leadership', 'innovation', 'marketing',
    'finance', 'investment', 'revenue', 'profit', 'growth', 'expansion',
    'partnership', 'negotiation', 'contract', 'agreement', 'deal',
    'stakeholder', 'shareholder', 'boardroom', 'executive', 'entrepreneur',
    'startup', 'venture', 'capital', 'equity', 'valuation', 'acquisition',
    'merger', 'diversification', 'portfolio', 'benchmark', 'performance',
    'analytics', 'metrics', 'KPI', 'ROI', 'efficiency', 'productivity',
  ],
  academic: [
    'research', 'hypothesis', 'methodology', 'analysis', 'synthesis',
    'evaluation', 'assessment', 'criteria', 'evidence', 'conclusion',
    'argument', 'thesis', 'dissertation', 'publication', 'peer-review',
    'citation', 'reference', 'bibliography', 'abstract', 'introduction',
    'literature', 'theoretical', 'empirical', 'qualitative', 'quantitative',
    'interdisciplinary', 'paradigm', 'framework', 'conceptual', 'operational',
    'validity', 'reliability', 'significance', 'correlation', 'variable',
  ],
  travel: [
    'destination', 'itinerary', 'accommodation', 'reservation', 'passport',
    'visa', 'immigration', 'customs', 'baggage', 'terminal', 'departure',
    'arrival', 'boarding', 'connection', 'layover', 'tourist', 'attraction',
    'landmark', 'monument', 'museum', 'gallery', 'excursion', 'adventure',
    'exploration', 'navigation', 'orientation', 'transportation', 'transit',
    'infrastructure', 'hospitality', 'cuisine', 'culinary', 'traditional',
  ],
  technical: [
    'algorithm', 'database', 'framework', 'library', 'function',
    'variable', 'constant', 'parameter', 'argument', 'return',
    'asynchronous', 'synchronous', 'callback', 'promise', 'async',
    'await', 'middleware', 'endpoint', 'request', 'response',
    'authentication', 'authorization', 'encryption', 'decryption',
    'protocol', 'architecture', 'deployment', 'integration', 'API',
    'frontend', 'backend', 'fullstack', 'devops', 'repository',
  ],
  ielts: [
    'band', 'score', 'academic', 'general', 'listening', 'reading',
    'writing', 'speaking', 'task', 'response', 'essay', 'report',
    'letter', 'description', 'comparison', 'contrast', 'opinion',
    'argument', 'discussion', 'advantage', 'disadvantage', 'solution',
    'problem', 'cause', 'effect', 'example', 'evidence', 'coherence',
    'cohesion', 'vocabulary', 'grammar', 'pronunciation', 'fluency',
    'intonation', 'paraphrase', 'synonym', 'collocation', 'idiom',
  ],
  toefl: [
    'independent', 'integrated', 'conversation', 'lecture', 'passage',
    'comprehension', 'inference', 'purpose', 'attitude', 'rhetorical',
    'summary', 'outline', 'note-taking', 'main', 'detail', 'imply',
    'infer', 'synthesize', 'organize', 'develop', 'support', 'clarify',
    'exemplify', 'contrast', 'compare', 'classify', 'categorize',
    'sequence', 'process', 'cause', 'effect', 'problem', 'solution',
  ],
}

export function getWordsByCategory(category: string): string[] {
  return wordBanks[category] || wordBanks.general
}

export function getRandomWord(category: string): string {
  const words = getWordsByCategory(category)
  return words[Math.floor(Math.random() * words.length)]
}
