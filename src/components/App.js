import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import RegionDetailsLoader from './RegionDetailsLoader';
import HomePage from './HomePage';



class App extends Component {

	render(){
		return (
			<div className="container" >
				<BrowserRouter>
					<div>
						<Route path={'/'} exact component={HomePage} />
						<Route path={'/region/:handle'} component={RegionDetailsLoader} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
