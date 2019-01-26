import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import urlLoader from './urlLoader';
import HomePage from './HomePage';



class App extends Component {

	render(){
		return (
			<div className="container" >
				<BrowserRouter>
					<div>
						<Route path={'/'} exact component={HomePage} />
						<Route path={`/Reykjavik`} exact component={urlLoader} />
						<Route path={`/Westfjords`} exact component={urlLoader} />
						<Route path={`/East Iceland`} exact component={urlLoader} />
						<Route path={`/North Iceland`} exact component={urlLoader} />
						<Route path={`/North-East Iceland`} exact component={urlLoader} />
						<Route path={`/Reykjanes Peninsula`} exact component={urlLoader} />
						<Route path={`/South Iceland`} exact component={urlLoader} />
						<Route path={`/Capital region`} exact component={urlLoader} />
						<Route path={`/West Iceland`} exact component={urlLoader} />
						{/* <Route path={`/${this.state.clickedRegion}`} exact component={urlLoader} /> */}
					</div>
				</BrowserRouter>
			</div>
		)
  }
}

export default App;
