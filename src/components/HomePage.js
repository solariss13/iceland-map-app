import React, { Component } from 'react';
import SvgMap from './SvgMap';


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


  render() {
		return (
			<div className="containerHP">
        <div className="regionName">
          <h1 className="text">
            {this.state.currentRegion}
          </h1>
        </div>
				<div>
          <SvgMap 
            regionOnClick={this.regionOnClick}
            hoverOver={this.hoverOver}
            hoverOut={this.hoverOut}
          />
        </div>
			</div>
		)
  }
}

export default HomePage;
