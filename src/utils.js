export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function determineRowCol(i) {
  let row, col;
  if (i === 0 || i === 1 || i === 2) {
    row = 1;
  } else if (i === 3 || i === 4 || i === 5) {
    row = 2;
  } else if (i === 6 || i === 7 || i === 8) {
    row = 3;
  }

  if (i === 0 || i === 3 || i === 6) {
    col = 1;
  } else if (i === 1 || i === 4 || i === 7) {
    col = 2;
  } else if (i === 2 || i === 5 || i === 8) {
    col = 3;
  }

  return { row, col };
}
