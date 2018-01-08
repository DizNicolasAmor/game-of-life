import React, { Component } from 'react';
import Buttons from './Buttons.js';
import Board from './Board.js';

const Header = () => {
  return (
    <div className="container">
      <h1><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" 
          target="_blank" rel="noopener noreferrer">Conway's</a>  Game of Life</h1>
    </div>
    );
} 


class App extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      board: [],
      is100cells: true,
      gameStatus: 'clear',
      generations: 0,
      startButtonName: 'START'
    }
    this.play = this.play.bind(this);    
    this.start = this.start.bind(this);
    this.seed = this.seed.bind(this);
    this.clear = this.clear.bind(this);
    this.button100cells = this.button100cells.bind(this);
    this.button600cells = this.button600cells.bind(this);
    this.selectCell = this.selectCell.bind(this);
  }

  createBoard(rows,cols){
    let newBoard = [];
    for(let i=0;i<rows;i++){
      let rowArr = [];
      for(var j=0;j<cols;j++){ 
        let rand = Math.floor(Math.random()*4);
        if(rand === 0){
          rowArr[j] = true;
        }
        else{
          rowArr[j] = false;
        }
      }
      newBoard.push(rowArr);
    }
    this.setState({board: newBoard});  
  }

  //auxiliar function of play
  arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  //auxiliar function of start()
  play(){
    let auxBoard = this.state.board,    //create two copies of board
        nextBoard = this.arrayClone(this.state.board),   //because all cells must update at the same time
        neighbours = 0;

    for(let i=0; i < auxBoard.length; i++){    //loop through each cell
      for(let j=0; j < auxBoard[i].length; j++){

        //calculate neighbours
        if( i > 0 && j > 0 && auxBoard[i - 1][j - 1 ] ) neighbours ++;
        if( i > 0 && auxBoard[i - 1][j] ) neighbours ++;
        if( i > 0 && j < auxBoard[i].length - 1 && auxBoard[i - 1][j + 1 ] ) neighbours ++;

        if( j > 0 && auxBoard[i][j - 1 ] ) neighbours ++;
        if( j < auxBoard[i].length - 1 && auxBoard[i][j + 1] ) neighbours ++;

        if( i < auxBoard.length - 1 && j > 0 && auxBoard[i + 1][j - 1 ] ) neighbours ++;
        if( i < auxBoard.length - 1 && auxBoard[i + 1][j] ) neighbours ++;
        if( i < auxBoard.length - 1 && j < auxBoard[i].length - 1 && auxBoard[i + 1][j + 1 ] ) neighbours ++;
        
        // is this cell alive or dead in the next turn ? 
        if( nextBoard[i][j] ){
          if( neighbours < 2 || neighbours > 3 ) nextBoard[i][j] = false;
        }else{
          if( neighbours === 3) nextBoard[i][j] = true;
      }
      neighbours = 0;    //reset counter
      }
    }

    this.setState({
      board: nextBoard,
      generations: this.state.generations + 1
    });
  }

  start(){
    if(this.state.gameStatus === 'clear'){
      if(this.state.is100cells) this.createBoard(10, 10);
      if(! this.state.is100cells) this.createBoard(40, 15);

      this.setState({
        gameStatus: 'start',
        startButtonName: 'STOP'
      });
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.play, 750);
    }

    if(this.state.gameStatus === 'stop'){
      this.setState({
        gameStatus: 'start',
        startButtonName: 'STOP'
      });
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.play, 750);
    }

    //stop
    if(this.state.gameStatus === 'start'){
      this.setState({
        gameStatus: 'stop',
        startButtonName: 'START'
      });
      clearInterval(this.intervalId);
    }
  }

  seed(){
    this.setState({
      gameStatus: 'stop',
      startButtonName: 'START'
    });
    clearInterval(this.intervalId);
    if(this.state.is100cells) this.createBoard(10, 10);
    if(! this.state.is100cells) this.createBoard(40, 15);
  }
  
  clear(){
    //stop
    this.setState({
      gameStatus: 'stop',
      startButtonName: 'START'
    });
    clearInterval(this.intervalId);

    //clear
    let auxArr = this.state.board;
    for(let i=0; i < auxArr.length; i++){
      for(let j=0; j < auxArr[i].length; j++){
        auxArr[i][j] = false;
      }
    }
    clearInterval(this.intervalId);
    this.setState({
      board:auxArr,
      generations: 0,
      gameStatus: 'clear',
      startButtonName: 'START'
    });
  }
  
  button100cells(){
    if(!this.state.is100cells){
      this.setState({is100cells: true});
      this.clear();
      this.createBoard(10, 10);
    }
  }

  button600cells(){
    if(this.state.is100cells){
      this.setState({is100cells: false});
      this.clear();
      this.createBoard(40, 15);
    }
  }

  //onClick in cell
  selectCell(x, y){
    let auxArr = this.state.board;
    auxArr[x][y] = ! auxArr[x][y];
    this.setState({board: auxArr});
  }

  componentWillMount(){
    this.start();
  }

  render() {
    return (
      <div>
        <Header />
        <Buttons 
          start = {this.start}
          seed = {this.seed}
          startButtonName = {this.state.startButtonName}
          clear = {this.clear}
          is100cells = {this.state.is100cells}
          button100cells = {this.button100cells}
          button600cells = {this.button600cells}
          generations = {this.state.generations}
          board = {this.state.board} />
        <Board 
          board = {this.state.board}
          is100cells = {this.state.is100cells} 
          selectCell = {this.selectCell} />
      </div>
    );
  }
}

export default App;
