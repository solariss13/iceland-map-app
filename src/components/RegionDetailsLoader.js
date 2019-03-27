import React from 'react';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
// import AddMarkerForm from './AddMarkerForm';
import { GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';



class RegionsDetailsLoader extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    strImages: []
  }

  onMapClick= () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      });
    }
  };

  onMarkerClick = (marker) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      strImages: []
    });    
    this.fetchImages(marker)
  }

  fetchImages = ( async (marker) => {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAsnh6DmpYqXKhFyVtAFJe8Z8O9tUhUx4Q&cx=004188267635617214622:d-jt7mecdrm&num=6&searchType=image&q=${marker.name}`)
    
    const images = response.data.items;
    const imagesToStr = images.map(element => { 
      return `<div><a target="_blank" rel="noopener noreferrer" href="${element.link}"><img alt="${element.title}" src="${element.link}" /></a></div>`
    });
    const strImages = imagesToStr.join('');
    this.setState({strImages: strImages});
  })

  render() {
    const currentRegion = this.props.match.params.handle;
    return (
      <div className="containerMap" >
        <div className="item1">
          <h1>{currentRegion}</h1>
        </div>
        <div className="item2">
          <Map 
            onClick={this.onMapClick}
            google={this.props.google} 
            region={currentRegion}
          >
            <Marker 
              onClick={this.onMarkerClick}
            />
            <InfoWindow
              images={this.state.strImages}
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            />
          </Map>
        </div>
          <div className="item3">
            <button className="btn-go-back">Go back</button>
            <button className="btn-add-marker">Add marker</button>
          </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(RegionsDetailsLoader)