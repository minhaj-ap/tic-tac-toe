"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function MultiPlayer() {
  const [CurrentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const cellsRef = useRef([]);
  function handleClick(index) {
    setBoard((prevBoard) => {
      if (!prevBoard[index]) {
        const newBoard = [...prevBoard];
        newBoard[index] = CurrentPlayer;
        setCurrentPlayer(CurrentPlayer === "X" ? "O" : "X");
        return newBoard;
      }
      return prevBoard;
    });
  }
  function handleReset() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    cellsRef.current.forEach((cell) => (cell.textContent = ""));
  }
  return (
    <div className="multi_home">
      <strong>
        Current Player: <span className="currPlayer">{CurrentPlayer}</span>
      </strong>
      <div className="cells">
        {board.map((value, index) => (
          <p
            key={index}
            className="cell"
            ref={(el) => (cellsRef.current[index] = el)}
            onClick={() => handleClick(index)}
            data-index={index}
          >
            {value}
          </p>
        ))}
      </div>
      <div className="play_options">
        <button id="play_again">
          <Link href="/">GO BACK</Link>
        </button>
        <button id="new_game" onClick={() => handleReset()}>
          RESET
        </button>
      </div>
    </div>
  );
}
