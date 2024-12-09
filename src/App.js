import React, { useState } from "react";
import './App.css';

const SIZE = 15;  // 五子棋的棋盘大小为15x15

function App() {
  const [board, setBoard] = useState(Array(SIZE).fill(null).map(() => Array(SIZE).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // 判断是否有胜者
  const checkWinner = (board) => {
    const directions = [
      { row: 0, col: 1 },  // 横向
      { row: 1, col: 0 },  // 纵向
      { row: 1, col: 1 },  // 主对角线
      { row: 1, col: -1 }  // 副对角线
    ];

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        const player = board[row][col];
        if (!player) continue;

        for (let { row: dRow, col: dCol } of directions) {
          let count = 1;
          for (let step = 1; step < 5; step++) {
            const newRow = row + dRow * step;
            const newCol = col + dCol * step;

            if (newRow < 0 || newRow >= SIZE || newCol < 0 || newCol >= SIZE || board[newRow][newCol] !== player) {
              break;
            }
            count++;
          }
          if (count === 5) {
            return player;
          }
        }
      }
    }
    return null;
  };

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return; // 检查是否已下过棋或已有胜者

    const newBoard = board.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? (isXNext ? 'X' : 'O') : c))
    );

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newBoard));  // 检查是否有胜者
  };

  const renderSquare = (row, col) => (
    <button
      key={`${row}-${col}`}
      className="square"
      onClick={() => handleClick(row, col)}
      style={{ width: 30, height: 30, backgroundColor: 'lightgrey' }}
    >
      {board[row][col]}
    </button>
  );

  return (
    <div>
      <h1>五子棋</h1>
      {winner && <h2>胜者: {winner}</h2>}
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
