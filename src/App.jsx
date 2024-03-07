import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/Gameboard";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleActivePlayer() {
    setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player name="player 2" symbol="O"isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectActivePlayer={handleActivePlayer} activeSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
