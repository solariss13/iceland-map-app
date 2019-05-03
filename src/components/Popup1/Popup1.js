import React, { Component } from "react";
import angle_arrow_up from "./angle_arrow_up.png";
import gmap_marker from "./gmap_marker.png";
import "./Popup1.css";

class Popup1 extends Component {
	hidePopup = () => {
		this.container.setAttribute("class", "hidePopup");
	};

	componentDidUpdate() {
		this.props.addNewMarker
			? this.container.setAttribute("class", "Popup-container")
			: this.container.setAttribute("class", "Popup-container-hidden");
	}

	render() {
		return (
			<div
				className='Popup-container-hidden'
				ref={container => (this.container = container)}
			>
				<div className='Popup-content'>
					<div className='Popup-gmap-box'>
						<img
							className='Popup-gmap-img'
							alt='gmap marker'
							src={gmap_marker}
						/>
					</div>
					<div className='Popup-footer' onClick={this.hidePopup}>
						<div className='Popup-text-box'>
							<h1 className='Popup-text'>
								Click on the map to point the location of the new marker.
							</h1>
						</div>

						<div className='Popup-arrowup-box'>
							<img
								className='Popup-arrowup-img'
								title='Hide the info box!'
								alt='arrow-up'
								src={angle_arrow_up}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Popup1;
