import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function GameBoard({onSelectActivePlayer, activeSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prveGameBoard) => {
            const updateBoard = [...prveGameBoard.map((innerArray) => [...innerArray])];
            updateBoard[rowIndex][colIndex] = activeSymbol;
            return updateBoard;
        })
        
        onSelectActivePlayer();
        // 배열이나 객체를 상태로 사용하고 업데이트 할때는 원본이 아닌 복사본을 사용하여야한다. 
        // -> 자바스크립트의 객체는 참조형 데이터이므로 원본의 수정이 이루어지는 시점이 리액트가 실행하는 예정된 상태 업데이트보다 이전이다.
        //    상태 업데이트가 여러개 예정되어 있을때 오류를 일으킬 가능성이 매우 크다.
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}

export default GameBoard;