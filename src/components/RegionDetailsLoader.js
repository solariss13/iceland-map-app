import React from 'react';
import Div100vh from 'react-div-100vh';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import { GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { error } from 'util';



class RegionsDetailsLoader extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    strImages: [],
    addNewMarker: false,
    newMarkerPosition: {}
  }

  createNewMarker = (currentRegion, newMarkerPosition, newMarkerName) => {
    fetch(`https://iceland-map-app-api.herokuapp.com/region/${currentRegion}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newMarkerName,
        region: currentRegion,
        position: newMarkerPosition
      })
    })
    .then( response => response.json())
    .then( res => 'success' ? document.location.reload(true) : console.log(error))
    .catch(err => console.log(err));
  }

  onMapClick = (lat,lng) => {
    if(this.state.addNewMarker) {
      this.setState({ addNewMarker: false})
      console.log('weszlo')
      const currentRegion = this.props.match.params.handle
      const newMarkerPosition = {lat: lat, lng: lng}
      const newMarkerName = prompt('Enter the name of the new marker:')

      if(newMarkerName) {
        this.createNewMarker(currentRegion, newMarkerPosition, newMarkerName)
      }
    } else if (this.state.showingInfoWindow) {
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

  onClickGoBackBtn = () => {
    window.location.href = "https://iceland-map-app.herokuapp.com/";
  }

  onClickAddMarkerBtn = () => {
    this.setState({ 
      showingInfoWindow: false,
      addNewMarker: true
     })
     
    setTimeout(() => {
      alert('Click on the map to point the location of new marker')
    }, 0);
  }

  render() {
    const currentRegion = this.props.match.params.handle;
    return (
      <Div100vh>
        <div className="containerMap" >
          <div>
            <h1>{currentRegion}</h1>
          </div>
          <div>
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
          <div className="buttons">
            <button 
              className="btn-go-back"
              onClick={this.onClickGoBackBtn}
            >
              Go back
            </button>
            <button 
              className="btn-add-marker"
              onClick={this.onClickAddMarkerBtn}
            >
              Add marker
            </button>
          </div>
        </div>
      </Div100vh>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(RegionsDetailsLoader)