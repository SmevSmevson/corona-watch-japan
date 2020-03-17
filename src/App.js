import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'leaflet/dist/leaflet.css'
import './assets/styles/css/App.css'
import AuthContext from './contextProviders/AuthContext'
// import MapDataContext from './contextProviders/MapDataContext'
import CasesDataContext from './contextProviders/CasesDataContext'
import Header from './components/Header'
import PageLinks from './components/PageLinks'
import Home from './routes/Home'
import Cases from './routes/Cases'
import Graphs from './routes/Graphs'
import About from './routes/About'
// import Login from './routes/Login'
// import EditMapData from './routes/EditMapData'
// import EditTimelineData from './routes/EditTimelineData'
import Error from './routes/Error'
import EditCaseData from './routes/EditCaseData';

function App() {
	  window.onload = function() {
	    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
	        document.body.addEventListener(
	            'touchstart',
	            function() {},
	            false,
	        )
	    }
	}
	return (
		<BrowserRouter>
			<AuthContext>
			<nav>
				<Header />
			</nav>
			<main>
				{/* <MapDataContext> */}
				<CasesDataContext>
				<Switch>
						<Route path='/' component={Home} exact />
						<Route path='/cases' component={Cases} exact />
						<Route path='/graphs' component={Graphs} exact />
						<Route path='/about' component={About} exact />
						<Route path='/edit-case-data' component={EditCaseData} exact />
							{/* <Route path='/login' component={Login} /> */}
							{/* <Route path='/edit-map-data' component={EditMapData} /> */}
							{/* <Route path='/edit-timeline-data' component={EditTimelineData} /> */}
						<Route component={Error} />
				</Switch>
				</CasesDataContext>
				{/* </MapDataContext> */}
			</main>
			<nav>
				<PageLinks />
			</nav>
			</AuthContext>
		</BrowserRouter>
	)
}

export default App
