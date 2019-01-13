import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  state={
      currentRegion: '',
      regions: []
    }

 regionChoice = (e) => {
  this.setState({ currentRegion: e.target.id });
  console.log(e.target)
 }

 hoverOver = (e) => {
  this.setState({ currentRegion: e.target.id });
  e.target.setAttribute('opacity', '0.7');
 }

 hoverOut = (e) => {
  this.setState({ currentRegion: '' });
  e.target.setAttribute('opacity', '1');
 }

  render(){
    return (
      <div className="container" >
        <div className="content" >
          <Map 
            regionChoice={this.regionChoice}
            hoverOver={this.hoverOver}
            hoverOut={this.hoverOut}
          />
        </div>
      <h1>{this.state.currentRegion}</h1>      
		</div>
    )
  }
}

export default App;
