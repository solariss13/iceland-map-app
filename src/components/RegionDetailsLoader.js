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
    strImages: [],
    addNewMarker: false,
    newMarkerPosition: {}
  }

  createNewMarker = () => {

    
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
        // this.setState({ 
        //   newMarkerPosition: {lat: lat, lng: lng},
        //   newMarkerName: markerName
        // })
        // console.log(this.state)
      }
    }
    else if (this.state.showingInfoWindow) {
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
    window.location.href = "http://localhost:3000/";
  }

  onClickAddMarkerBtn = () => {
    this.setState({ 
      showingInfoWindow: false,
      addNewMarker: true
     })
     setTimeout(() => {alert('click on the map to point the location of new marker')}, 0);
    
  }

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
        {/* {this.state.addNewMarker ? <AddMarkerForm /> : null} */}

        <div className="item3">
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
    )
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(RegionsDetailsLoader)