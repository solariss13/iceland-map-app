import React from 'react';
import {MapPaths} from './MapPaths';
import './Map.css';
import { Link } from 'react-router-dom';


const Map = (props) => {

		 const pathComponent = MapPaths.map(({d, id}) => {
			return (
				<Link to={`/${id}`}>
					<path 
						className='mapPaths'
						d={d} 
						id={id}
						key={id}
						onClick={props.regionOnClick} 
						onMouseEnter={props.hoverOver} 
						onMouseLeave={props.hoverOut}
						opacity='1'
						cursor="pointer"
					/>
				</Link>
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
