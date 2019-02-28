import React from 'react';


class InfoWindow extends React.Component {

  componentDidUpdate() {
    if(this.props.visible) {
        this.infowindow.close();
        this.renderInfoWindow()
    } else {
      this.infowindow.close();
    }
  }

  componentDidMount() {
    this.renderInfoWindow();
  }

  renderInfoWindow() {
    const { marker, google, images } = this.props;

    if(images.length === 0){
      this.infowindow = new google.maps.InfoWindow({
        content: `<div> <div class="markerName"> ${marker.name} </div>  <div>Loading...</div> </div>`
      });
    } else {
      this.infowindow = new google.maps.InfoWindow({
        content: `<div class="imgWrapper"> <div class="markerName"> ${marker.name} </div>  ${images} </div>`
      });
    }

    this.props.visible ? this.infowindow.open(marker.map, marker) : (this.infowindow.close());
  }

  render() {
    return null;
  }
}

 export default InfoWindow;