import React from 'react';
import {SvgMapPaths} from './SvgMapPaths';
import './SvgMap.css';
import { Link } from 'react-router-dom';


const SvgMap = (props) => {

		 const pathComponent = SvgMapPaths.map(({d, id}) => {
			return (
				<Link to={{
					pathname: `/region/${id}`,
					state: id
				}}>
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

export default SvgMap;
