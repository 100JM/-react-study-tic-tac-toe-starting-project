import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import Log from "./components/Log";

function controlActivePlayer(gameTurns) {
  let nowPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    nowPlayer = 'O';
  }

  return nowPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = controlActivePlayer(gameTurns)

  function handleActivePlayer(rowIndex, colIndex) {
    // setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      const currentPlayer = controlActivePlayer(prevTurns);
      
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectActivePlayer={handleActivePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
