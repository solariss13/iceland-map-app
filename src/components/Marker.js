import React from 'react';

class Marker extends React.Component {

	renderMarker() {
		let {
			map, 
			google, 
			markers 
		} = this.props;

		markers.map(marker => {
			return new google.maps.Marker({
				map: map,
				position: marker.position
			});
		});
	}

	render(){
		this.renderMarker()
		return null;
	}
}

export default Marker;