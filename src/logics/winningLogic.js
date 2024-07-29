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
function checkWin(selections) {
  if (selections && selections.length >= 3) {
    for (let i = 0; i < selections.length; i++) {
      for (let j = 0; j < winningCombinations.length; j++) {
        if (selections[i] === winningCombinations[j][0]) {
          for (let k = 0; k < winningCombinations[j].length; k++) {
            if (selections[k] === winningCombinations[j][1]) {
              for (let l = 0; l < winningCombinations[j].length; l++) {
                if (selections[l] === winningCombinations[j][2]) {
                  return winningCombinations[j];
                }
              }
            }
          }
        }
      }
    }
  }
}
export { checkWin };
