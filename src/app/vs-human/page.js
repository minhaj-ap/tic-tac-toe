"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { checkWin } from "@/logics/winningLogic";
import Lottie from "lottie-react";
import Celebration from "../celebration.json";
export default function MultiPlayer() {
  const [CurrentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [XsSelections, setXsSelections] = useState([]);
  const [OsSelections, setOsSelections] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [winState, setWinState] = useState(false);
  const cellsRef = useRef([]);
  function handleClick(index) {
    if (winState) return;
    setBoard((prevBoard) => {
      if (!prevBoard[index]) {
        const newBoard = [...prevBoard];
        newBoard[index] = CurrentPlayer;
        return newBoard;
      }
      return prevBoard;
    });
    setLastMove(index);
  }
  useEffect(() => {
    if (lastMove !== null) {
      TriggerWinCheck(lastMove);
    }
    setLastMove(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMove]);
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
      {!winState && (
        <strong>
          Current Player: <span className="currPlayer">{CurrentPlayer}</span>
        </strong>
      )}
      <div className="cells">
        {board.map((value, index) => (
          <p
            key={index}
            className="cell"
            ref={(el) => (cellsRef.current[index] = el)}
            onClick={() => {
              if (CurrentPlayer === "X") {
                setXsSelections([...XsSelections, index]);
              }
              if (CurrentPlayer === "O") {
                setOsSelections([...OsSelections, index]);
              }
              handleClick(index);
            }}
            id={index}
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
