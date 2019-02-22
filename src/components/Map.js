import React from 'react';
import ReactDOM from 'react-dom';
import RegionsDetails from './RegionsDetails';
import './Map.css'

export class Map extends React.Component {
	state={
		regionInfo: null
	}

	renderChildren() {
		const {children} = this.props;

		return React.Children.map(children, child => {
			return React.cloneElement(child, {
				map: this.map,
				google: this.props.google,
				markers: this.state.regionInfo.markers
			});
		})
	}

	componentWillMount(){
		const regionInfo = RegionsDetails.find((element)=>{
			if(element.region===this.props.region)
				return element;
		});

		this.setState({
			regionInfo: regionInfo
		})
	}

	componentDidMount() {
		this.loadMap();
  }

	componentDidUpdate(prevProps, prevState) {
		if ((prevProps.google !== this.props.google) ) {
			this.loadMap();
		}
	}
	
	loadMap() {
		if (this.props && this.props.google) {
			
			const region = this.state.regionInfo;
			const {google} = this.props;
			const node = ReactDOM.findDOMNode(this.refs.map);

			//this.map!!!
      this.map = new google.maps.Map(node, {
				zoom: region.zoom,
				minZoom: region.minZoom, 
				maxZoom: region.maxZoom,
				center: region.center,
				mapTypeId: 'hybrid',
			});

			this.forceUpdate()

			const allowedBounds = new google.maps.LatLngBounds(
				region.bound1,
				region.bound2
			);
	
			// Listen for the dragend event
			google.maps.event.addListener( this.map, 'dragend', ()=> {
				//if dragend is outside the allowed boundaries
				if (!(allowedBounds.contains(this.map.getCenter()))) {
					//limiting panning on the map to the region's bounds
					this.map.panTo(region.center);
				} 
			});
		}
	}

	render() {
		const style = {
      width: '90vw',
      height: '80vh',
      marginLeft: '5vw',
      marginRight: '5vw',
      position: 'absolute',
      top: '10vh'
    }
		return (
				<div ref='map' style={style}>
					{this.renderChildren()}
				</div>
		)
	}
}

export default Map;