import React from "react";
import Map from "./Map";
import Marker from "./Marker";
import InfoWindow from "./InfoWindow";
import Popup1 from "./Popup1/Popup1";
import Popup2 from "./Popup2/Popup2";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

class RegionsDetailsLoader extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		strImages: [],
		addNewMarker: false,
		newMarkerPosition: {},
		popup2visible: false
	};

	componentDidMount() {
		console.log("mount");
	}

	createNewMarker = (currentRegion, newMarkerPosition, newMarkerName) => {
		fetch(`https://iceland-map-app-api.herokuapp.com/region/${currentRegion}`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: newMarkerName,
				region: currentRegion,
				position: newMarkerPosition
			})
		})
			.then(response => response.json())
			.then(res =>
				"success"
					? document.location.reload(true)
					: console.log("Something went wrong")
			)
			.catch(err => console.log(err));
	};

	onMapClick = (lat, lng) => {
		if (this.state.addNewMarker) {
			// this.setState({ addNewMarker: false });
			// const currentRegion = this.props.match.params.handle;
			// const newMarkerPosition = { lat: lat, lng: lng };
			// popup2
			this.setState({
				addNewMarker: false,
				newMarkerPosition: { lat: lat, lng: lng },
				popup2visible: true
			});
			// const newMarkerName = prompt("Enter the name of the new marker:");

			// if (newMarkerName) {
			// 	this.createNewMarker(currentRegion, newMarkerPosition, newMarkerName);
			// }
		} else if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: {}
			});
		}
	};

	onMarkerClick = marker => {
		this.setState({
			activeMarker: marker,
			showingInfoWindow: true,
			addNewMarker: false,
			strImages: []
		});
		this.fetchImages(marker);
	};

	fetchImages = async marker => {
		const response = await axios.get(
			`https://www.googleapis.com/customsearch/v1?key=AIzaSyAsnh6DmpYqXKhFyVtAFJe8Z8O9tUhUx4Q&cx=004188267635617214622:d-jt7mecdrm&num=6&searchType=image&q=${
				marker.name
			}`
		);

		const images = response.data.items;
		const imagesToStr = images.map(element => {
			return `<div><a target="_blank" rel="noopener noreferrer" href="${
				element.link
			}"><img alt="${element.title}" src="${element.link}" /></a></div>`;
		});
		const strImages = imagesToStr.join("");
		this.setState({ strImages: strImages });
	};

	onClickAddMarkerBtn = () => {
		this.setState({
			showingInfoWindow: false,
			addNewMarker: true
		});
	};

	render() {
		const currentRegion = this.props.match.params.handle;
		return (
			<div>
				<div className='map-container'>
					<div className='map-header'>
						<h1>{currentRegion}</h1>
					</div>
					<div className='map-frame'>
						<Map
							onClick={this.onMapClick}
							google={this.props.google}
							region={currentRegion}
						>
							<Marker onClick={this.onMarkerClick} />
							<InfoWindow
								images={this.state.strImages}
								marker={this.state.activeMarker}
								visible={this.state.showingInfoWindow}
							/>
						</Map>
					</div>
					<div className='buttons'>
						<a
							className='btn-go-back'
							href='https://iceland-map-app.herokuapp.com/'
						>
							Go back
						</a>
						<button
							className='btn-add-marker'
							onClick={this.onClickAddMarkerBtn}
						>
							Add marker
						</button>
					</div>
					<Popup1 addNewMarker={this.state.addNewMarker} />
					<Popup2
						createNewMarker={this.createNewMarker}
						newMarkerPosition={this.state.newMarkerPosition}
						currentRegion={currentRegion}
						popup2visible={this.state.popup2visible}
					/>
				</div>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w"
})(RegionsDetailsLoader);
