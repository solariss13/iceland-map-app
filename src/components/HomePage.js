import React, { Component } from 'react';
import Div100vh from 'react-div-100vh';
import GithubLogo from './GithubLogo';
import FacebookLogo from './FacebookLogo';
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
      <Div100vh>
        <div className="containerHP">
          <div className="row1">
            <h1>
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
          <div className="logo" >
              <GithubLogo />
              <FacebookLogo />
          </div>
        </div>
      </Div100vh>
		)
  }
}

export default HomePage;
