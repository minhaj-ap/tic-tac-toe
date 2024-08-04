"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { botMove, winLogic } from "@/logics/Logics";
export default function BotPlayer() {
  const [CurrentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winState, setWinState] = useState("");
  const cellsRef = useRef([]);
  function handleUser(index) {
    if (winState) return;
    if (CurrentPlayer === "X") {
      if (board[index] === "") {
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[index] = CurrentPlayer;
          return newBoard;
        });
        setCurrentPlayer("O");
      }
      return board;
    }
  }
  useEffect(() => {
    const result = winLogic(board);
    console.log(result);
    if (result) {
      setWinState(result.winner);
      result.combination.map((id) => {
        document.getElementById(id).classList.add("win-cells");
      });
    }
  }, [CurrentPlayer, board]);
  const aiMove = useCallback(async () => {
    const Move = await botMove(board, 0, true);
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[Move.move] = "O";
      return newBoard;
    });
    setCurrentPlayer("X");
  }, [board]);

  if (CurrentPlayer === "O") {
    aiMove();
  }

  function handleReset() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinState("");
    const winCells = document.getElementsByClassName("win-cells");
    Array.from(winCells).forEach((element) => {
      element.classList.remove("win-cells");
    });

    cellsRef.current.forEach((cell) => (cell.textContent = ""));
  }
  return (
    <div className="multi_home">
      {winState !== "" && winState !== "tie" ? (
        <>
          <h1
            style={{
              color: winState === "O" ? "red" : "green",
              fontSize: "4em",
            }}
            className="ai_loss"
          >
            {winState === "O" ? "YOU LOSE" : "YOU WON"}
          </h1>
        </>
      ) : (
        ""
      )}
      {winState === "tie" && (
        <h1 style={{ color: "white", fontSize: "4em" }}>IT&apos;S A TIE!!!</h1>
      )}
      <div className="cells">
        {board.map((value, index) => (
          <p
            key={index}
            className="cell"
            ref={(el) => (cellsRef.current[index] = el)}
            id={index}
            onClick={() => handleUser(index)}
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
