import React, { Component } from "react";
import "./Popup2.css";

class Popup2 extends Component {
	hidePopup = () => {
		this.container.setAttribute("class", "hidePopup2");
		//delay time based on animation duration in Popup2.css
		setTimeout(() => this.props.toggleVisibility(), 1000);
	};

	componentDidUpdate() {
		this.props.popup2visible
			? this.container.setAttribute("class", "Popup-container")
			: this.container.setAttribute("class", "Popup-container-hidden");
	}

	render() {
		return (
			<div
				className='Popup2-container-hidden'
				ref={container => (this.container = container)}
			>
				<div className='Popup2-content'>
					<div className='Popup2-text-box'>
						<h1 className='Popup2-text'>
							Please enter the name of the new marker or close the window.
						</h1>
					</div>
					<div className='Popup2-footer'>
						<input className='Popup2-footer-input' type='text' />
						<div className='Popup2-buttons'>
							<button className='Popup2-btn-submit' onClick={this.hidePopup}>
								Submit
							</button>
							<button className='Popup2-btn-close' onClick={this.hidePopup}>
								<span>&times;</span> Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Popup2;
