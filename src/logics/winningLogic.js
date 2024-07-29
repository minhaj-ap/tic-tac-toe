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
  for (let i = 0; i < winningCombinations.length; i++) {
    let combination = winningCombinations[i];
    let matchCount = 0;

    for (let j = 0; j < combination.length; j++) {
      for (let k = 0; k < selections.length; k++) {
        if (combination[j] === selections[k]) {
          matchCount++;
          break;
        }
      }
    }
    if (matchCount === 3) {
      return combination;
    }
  }
  return null;
}
export { checkWin };
