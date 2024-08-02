"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { checkWin } from "@/logics/winningLogic";
import { botMove } from "@/logics/botMoveLogic";
import Lottie from "lottie-react";
import Celebration from "../celebration.json";
export default function BotPlayer() {
  const [CurrentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [XsSelections, setXsSelections] = useState([]);
  const [OsSelections, setOsSelections] = useState([]);
  const [winState, setWinState] = useState(false);
  const cellsRef = useRef([]);
  let Move = botMove(board);

  function handleUser(index) {
    if (CurrentPlayer === "X") {
      if (board[index] === "") {
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[index] = CurrentPlayer;
          return newBoard;
        });
      }
      setCurrentPlayer("O");
      return board;
    }
  }
  if (CurrentPlayer === "O") {
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[Move] = "O";
      return newBoard;
    });
    setCurrentPlayer("X");
  }

  function TriggerWinCheck() {
    setCurrentPlayer(CurrentPlayer === "X" ? "O" : "X");
    const result = checkWin(
      CurrentPlayer === "X" ? XsSelections : OsSelections
    );
    if (result) {
      setWinState(true);
      result.map((id) => {
        document.getElementById(id).classList.add("win-cells");
      });
    }
  }
  function handleReset() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setXsSelections([]);
    setOsSelections([]);
    setWinState(false);
    const winCells = document.getElementsByClassName("win-cells");
    Array.from(winCells).forEach((element) => {
      element.classList.remove("win-cells");
    });

    cellsRef.current.forEach((cell) => (cell.textContent = ""));
  }
  return (
    <div className="multi_home">
      {winState ? (
        <>
          <h1 style={{ color: "white", fontSize: "5em" }}>
            {CurrentPlayer === "X" ? "O" : "X"} won!!!
          </h1>
          <Lottie
            style={{ position: "fixed", pointerEvents: "none" }}
            animationData={Celebration}
            loop={true}
          />
        </>
      ) : (
        ""
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
