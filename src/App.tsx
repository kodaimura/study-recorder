import React, {useState,useEffect} from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Mypage from './components/pages/Mypage';
import {apiDomain} from './utils/constants';


const App = () => {
	const [auth, setAuth] = useState(false);

  	useEffect(() => {
    	fetch(`${apiDomain}/profile`, {
      		headers: {"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}})
    	.then(response => (response.ok)? setAuth(true) : setAuth(false));
  	}, []); 

  	return (
    	<div className="App">
    	<BrowserRouter>
        	<Switch>
          	<Route exact path="/" component={auth? Mypage : Login} />
          	<Route exact path="/signup" component={Signup} />　
          	<Route component={Login} />　
        	</Switch>
        </BrowserRouter>
    	</div>
  	);
}

export default App;
