import React, { Component } from "react";
import GithubLogo from "./GithubLogo/GithubLogo";
import FacebookLogo from "./FacebookLogo/FacebookLogo";
import SvgMap from "./SvgMap/SvgMap";

class HomePage extends Component {
	state = {
		currentRegion: "",
		clickedRegion: ""
	};

	regionOnClick = e => {
		this.setState({ clickedRegion: e.target.id });
	};

	hoverOver = e => {
		this.setState({ currentRegion: e.target.id });
		e.target.setAttribute("opacity", "0.7");
	};

	hoverOut = e => {
		this.setState({ currentRegion: "" });
		e.target.setAttribute("opacity", "1");
	};

	render() {
		return (
			<div className='homepage-container'>
				<div className='homepage-header'>
					<h1>{this.state.currentRegion}</h1>
				</div>
				<div className='homepage-svgmap'>
					<SvgMap
						regionOnClick={this.regionOnClick}
						hoverOver={this.hoverOver}
						hoverOut={this.hoverOut}
					/>
				</div>
				<div className='homepage-logo'>
					<GithubLogo />
					<FacebookLogo />
				</div>
			</div>
		);
	}
}

export default HomePage;
