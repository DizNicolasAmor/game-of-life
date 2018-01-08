import React, { Component } from 'react';

class Board extends Component {
  render() {
    return (
      <div className="board" 
           id={this.props.is100cells ? "b100" : "b600"} > 

        {this.props.board.map( (eachRowArr, rowID) => (
          eachRowArr.map( (isCellAlive, id) => (

            <div 
              className = {isCellAlive ? "cell alive" : "cell dead"} 
              key = {id}
              onClick = { () => this.props.selectCell(rowID, id) } >
            </div> 
          ))
        ))}
        
      </div>      
    );
  }
}

export default Board;