import React, { Component } from 'react';

class Buttons extends Component {
  render() {
    return (
      <div className="container center-block" >
        <h4>
          <button 
            className="btn btn-submit" 
            onClick={this.props.start}
            >{this.props.startButtonName}</button>
          <button 
            className="btn btn-submit"
            onClick={this.props.seed}
            >SEED</button>
          <button 
            className="btn btn-submit"
            onClick = {this.props.clear}
              >CLEAR</button>
          <p>BOARD: 
            <button 
              className = {this.props.is100cells ? "btn btn-info" : "btn btn-submit"}
              onClick = {this.props.button100cells}
              >100 CELLS</button>
            <button 
              className = {!this.props.is100cells ? "btn btn-info" : "btn btn-submit"}
              onClick = {this.props.button600cells}
              >600 CELLS</button>
          </p> 
          <p>GENERATIONS: {this.props.generations}</p>
        </h4>
      </div>  
    );
  }
}

export default Buttons;
