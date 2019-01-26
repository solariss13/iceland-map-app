import React, { Component } from 'react';
import Map from './Map';

class HomePage extends Component {
  state={
	  currentRegion: '',
	  clickedRegion: '',
	}


 regionOnClick = (e) => {
  this.setState({ clickedRegion: e.target.id });
  
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
			<div>
				<Map 
					regionOnClick={this.regionOnClick}
					hoverOver={this.hoverOver}
					hoverOut={this.hoverOut}
				/>
		
				<h1>
					{this.state.currentRegion}
				</h1>  
				
			</div>
		)
  }
}

export default HomePage;
