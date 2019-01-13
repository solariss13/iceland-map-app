import React from 'react';
import {MapPaths} from './MapPaths';
import './Map.css';

const Map = (props) => {

	 const pathComponent = MapPaths.map(({d, id}) => {
		 return (
			<path 
				d={d} 
				id={id}
				key={id}
				onClick={props.regionChoice} 
				onMouseEnter={props.hoverOver} 
				onMouseLeave={props.hoverOut}
				opacity='1'
				cursor="pointer"
			/>
		 );
	 });

	return (
		<div>
			<svg viewBox="0 0 1000 700">
				{pathComponent}
			</svg>
		</div>
	);
}

export default Map;
