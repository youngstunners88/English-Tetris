import { useState } from 'react'
import GameBoard from './components/GameBoard'
import StartScreen from './components/StartScreen'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [category, setCategory] = useState('general')
  const [difficulty, setDifficulty] = useState('easy')

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen 
          onStart={(cat, diff) => {
            setCategory(cat)
            setDifficulty(diff)
            setGameStarted(true)
          }}
        />
      ) : (
        <GameBoard 
          category={category}
          difficulty={difficulty}
          onExit={() => setGameStarted(false)}
        />
      )}
    </div>
  )
}

export default App
