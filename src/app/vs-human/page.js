"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import Celebration from "../celebration.json";
import { winLogic } from "@/logics/Logics";
export default function MultiPlayer() {
  const [CurrentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [lastMove, setLastMove] = useState(null);
  const [GameState, setGameState] = useState("");
  const cellsRef = useRef([]);
  function handleClick(index) {
    if (GameState) return;
    setBoard((prevBoard) => {
      if (!prevBoard[index]) {
        const newBoard = [...prevBoard];
        newBoard[index] = CurrentPlayer;
        setCurrentPlayer(CurrentPlayer === "X" ? "O" : "X");
        return newBoard;
      }
      return prevBoard;
    });
    setLastMove(index);
  }
  useEffect(() => {
    if (lastMove !== null) {
      TriggerWinCheck();
    }
    setLastMove(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMove]);
  function TriggerWinCheck() {
    const result = winLogic(board);
    console.log(result);
    if (result) {
      setGameState(result.winner);
      result.combination.map((id) => {
        document.getElementById(id).classList.add("win-cells");
      });
    }
  }
  function handleReset() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameState("");
    const winCells = document.getElementsByClassName("win-cells");
    Array.from(winCells).forEach((element) => {
      element.classList.remove("win-cells");
    });

    cellsRef.current.forEach((cell) => (cell.textContent = ""));
  }
  return (
    <div className="multi_home">
      {GameState !== "" && GameState !== "tie" ? (
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
      {GameState === "tie" ? (
        <h1 style={{ color: "white", fontSize: "4em" }}>IT&apos;S A TIE!!!</h1>
      ) : (
        ""
      )}
      {GameState === "" && (
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
