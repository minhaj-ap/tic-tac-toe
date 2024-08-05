function botMove(board, depth, isBotOption) {
  let i;
  const scores = { O: 1, X: -1, tie: 0 };
  const winner = winLogic(board);
  if (winner !== null) {
    return {
      score: scores[winner.winner],
      move: null,
      combination: winner.combination,
    };
  }

 if (isBoardFull(board)) {
     return { score: scores["tie"], move: null };
   }

  let bestScore = isBotOption ? -Infinity : Infinity;
  let bestMove = null;
  let combination;
  for (i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = isBotOption ? "O" : "X";
      const result = botMove(board, depth + 1, !isBotOption);
      board[i] = "";
      if (isBotOption) {
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      } else {
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      }
      if (result.combination) {
        combination = result.combination;
      }
    }
  }

  return {
    score: bestScore,
    move: bestMove,
    combination: combination ? combination : [],
  };
}

function winLogic(board) {
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  
  for (const pattern of winningCombinations) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination: pattern };
    }
  }
if (isBoardFull(board)) return { winner: "tie", combination: [] };
  return null;
}

function isBoardFull(board) {
  return board.every((cell) => cell !== "");
}
export { botMove, winLogic };
