import React from "react";
import ReactDOM from "react-dom";
import Board from "./board.js";
import { calculateWinner, determineRowCol, calculateNoMoves } from "./utils.js";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      clickedSquares: []
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const clickedSquares = this.state.clickedSquares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    clickedSquares[this.state.stepNumber] = i;

    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      clickedSquares: clickedSquares,
      isAscending: true
    });
  }

  handleToggle() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  listMoves(history) {
    const moves = history.map((step, move) => {
      //Determine the player
      let player;
      if (move % 2 === 0) {
        player = "O";
      } else {
        player = "X";
      }

      // Button Description
      let desc, moveDesc;
      if (move === 0) {
        desc = "Go to game start";
        moveDesc = "";
      } else {
        desc = "Go to move #" + move;
        // Determine the row/col
        let { row, col } = determineRowCol(this.state.clickedSquares[move - 1]);
        moveDesc = `Player ${player} moved col:${col}, row:${row}`;
      }

      var is_bold;
      if (this.state.stepNumber === move) {
        is_bold = true;
      } else {
        is_bold = false;
      }

      if (is_bold) {
        return (
          <strong>
            <li key={move}>
              <span>{moveDesc}</span>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          </strong>
        );
      } else {
        return (
          <li key={move}>
            <span>{moveDesc}</span>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });

    return moves;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const no_moves_left = calculateNoMoves(current.squares);
    const isAscending = this.state.isAscending;

    var moves = this.listMoves(history);

    // Toggle to sort ascending / descending list
    if (!isAscending) {
      moves = moves.slice().reverse();
    }

    // Status message
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (!winner && no_moves_left) {
      status = "Draw: No Moves Left";
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <button onClick={() => this.handleToggle()}>Toggle Move Order</button>
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
