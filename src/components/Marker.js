import React from 'react';

class Marker extends React.Component {
	renderMarker() {
		const {
			map, 
			google, 
			markers 
		} = this.props;

    //creating new markers
		markers.forEach(marker => {
      // console.log(marker.name, marker.position)
      let newMarker = this.marker = new google.maps.Marker({
				map: map,
        position: marker.position,
        name: marker.name,
      });

      //adding events to new markers
      newMarker.addListener('click', () => {
        //setting marker in the map center 
        if(map.getZoom() < 10){
          map.setZoom(10);
        }
      
        map.panTo(newMarker.getPosition())
        
        //invoke onCilck to pass props to RegionsDetailsLoader         
        this.props.onClick(newMarker);
      });
      
      return newMarker;
		});
	}


	render(){
	  this.renderMarker()
		return null;
	}
}

export default Marker;