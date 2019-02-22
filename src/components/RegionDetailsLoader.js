import React from 'react';
import Map from './Map';
import Marker from './Marker';
import { GoogleApiWrapper } from 'google-maps-react';
// import { ClipLoader } from 'react-spinners';
// import { memoize } from 'lodash';
// import RegionsDetails from './RegionsDetails';
// import axios from 'axios';


class RegionsDetailsLoader extends React.Component {
  state = {
    currentRegion: null,
  }

  componentWillMount(){
    const currentRegion = this.props.match.params.handle;
    this.setState({
      currentRegion: currentRegion
    })
  }

  render() {
    const position = {lat: 64.164968, lng: -22.021984}
    return (
      <div>
        <h1>{this.state.currentRegion}</h1>
        <Map google={this.props.google} region={this.state.currentRegion}>
          <Marker position={position}/>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w')
})(RegionsDetailsLoader)