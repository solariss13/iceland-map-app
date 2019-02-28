import React from 'react';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import { GoogleApiWrapper } from 'google-maps-react';
// import { ClipLoader } from 'react-spinners';
// import { memoize } from 'lodash';
// import RegionsDetails from './RegionsDetails';
import axios from 'axios';


class RegionsDetailsLoader extends React.Component {
  state = {
    currentRegion: null,
    showingInfoWindow: false,
    activeMarker: {},
    strImages: []
  }

  componentWillMount(){
    const currentRegion = this.props.match.params.handle;
    this.setState({
      currentRegion: currentRegion,
    })
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
      return `<div class="images"><img alt="${element.title}" src="${element.link}" /></div>`
    });
    const strImages = imagesToStr.join('');
    this.setState({strImages: strImages});
  })

  render() {
    return (
      <div>
        <h1>{this.state.currentRegion}</h1>
        <Map 
          onClick={this.onMapClick}
          google={this.props.google} 
          region={this.state.currentRegion}
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
    )
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(RegionsDetailsLoader)