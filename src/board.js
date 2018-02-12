import React from "react";
import Square from "./square.js";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let listItems = [];
    let index = 0;
    for (let i = 0; i < 3; i++) {
      listItems.push(<div className="board-row" />);
      for (let j = 0; j < 3; j++) {
        listItems.push(this.renderSquare(index));
        index++;
      }
    }
    return <div>{listItems}</div>;
  }
}

export default Board;
