import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


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
  
  let gameBoard = initialGameBoard;
  let winner;

  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = firstSymbol;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

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

  function handleReStart() {
    setGameTurns([]);
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleReStart} />}
        <GameBoard onSelectActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
