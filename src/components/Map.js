import React from 'react';
import ReactDOM from 'react-dom';

 class Map extends React.Component {
	state={
    regionInfo: null,
    count: 0
	}

	renderChildren() {

    if(this.state.regionInfo !== null && this.map !== undefined) {
      
      const {children} = this.props;

      return React.Children.map(children, child => {
        return React.cloneElement(child, {
          map: this.map,
          google: this.props.google,
          markers: this.state.regionInfo
        });
      })
    }
	}

	componentDidMount() {
    const {region} = this.props

    if (region){
      fetch(`https://iceland-map-app-api.herokuapp.com/region/${region}`, {
        params: JSON.stringify({
          region: region
        })
      })
      .then(response => response.json())
      .then(regionInfo => {
        this.setState({ regionInfo: regionInfo })
      })
    }
  }

	componentDidUpdate(prevState) {
    if ((prevState.regionInfo !== this.state.regionInfo)) {
      if(this.state.count < 1) {
        this.loadMap();
        this.setState({count: 1})
      }
    }
	}
	
	loadMap() {
		if(this.state.regionInfo !== null && this.props.google) {
			
			const region = this.state.regionInfo[0];
			const {google} = this.props;
			const node = ReactDOM.findDOMNode(this.refs.map);

      this.map = new google.maps.Map(node, {
				zoom: region.zoom,
				minZoom: region.minzoom, 
				maxZoom: region.maxzoom,
				center: region.center,
				mapTypeId: 'hybrid'
			});
      
      this.forceUpdate()

			const allowedBounds = new google.maps.LatLngBounds(
				region.bound1,
				region.bound2
			);
	
			// listen for the dragend event
			google.maps.event.addListener( this.map, 'dragend', ()=> {
				//if dragend is outside the allowed boundaries
				if (!(allowedBounds.contains(this.map.getCenter()))) {
					//limiting panning on the map to the region's bounds
          this.map.panTo(region.center)
				} 
      });
      
      // listen for map click event
      google.maps.event.addListener( this.map, 'click', (e) => {
        this.props.onClick(e.latLng.lat(), e.latLng.lng());
      })
		}
	}

	render() {
		const style = {
      width: '90vw',
      height: '85vh',
      marginLeft: '5vw',
      marginRight: '5vw',
      position: 'absolute',
      top: '8vh'
    }
		return (
			<div className="googleMap" ref='map' style={style}>
        {this.renderChildren()}
      </div>
		)
	}
}

export default Map;