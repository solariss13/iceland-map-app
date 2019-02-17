import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import RegionsDetails from './RegionsDetails';
import {memoize} from 'lodash';
import axios from 'axios';


class GoogleMapsContainer extends React.Component {
  
  state = {
      initialLat: RegionsDetails.find(element => element.region===this.props.match.params.handle).lat,
      initialLng: RegionsDetails.find(element => element.region===this.props.match.params.handle).lng,
      showingInfoWindow: false,
      markers: RegionsDetails.find(element => element.region===this.props.match.params.handle).markers,
      activeMarker: {},
      selectedPlace: '',
      images: []
    }


  loadMarkers = () => {
    const marker = this.state.markers.map((m) => {
      return <Marker 
        key = { m.lng }
        onClick = { this.onMarkerClick }
        onMouseover = { this.onMarkerMouseover}
        name = { m.name }
        position = { { lat: m.lat, lng: m.lng } }
      />
    })
    return marker;
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    const fetchImages = () =>{
      memoizedFetchImages()
    }
    const memoizedFetchImages = memoize( async () => {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAsnh6DmpYqXKhFyVtAFJe8Z8O9tUhUx4Q&cx=004188267635617214622:d-jt7mecdrm&num=6&searchType=image&q=${props.name}`)
      this.setState({images: response.data.items})
    })
    fetchImages()
    
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const style = {
      width: '90vw',
      height: '90vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = {style}
        disableDefaultUI= {false}
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 7 }
        initialCenter = {{ lat: this.state.initialLat, lng: this.state.initialLng }}
      >
        {this.loadMarkers()}

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <div>
            
              <h1>{this.state.selectedPlace.name}</h1>
    {this.state.images.map(element=>{return <img alt={this.state.selectedPlace} src={element.link} key={element.title}/>})}
          </div>
          
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(GoogleMapsContainer)
