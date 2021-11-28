import React, {useState,useEffect} from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import MyPage from './components/pages/MyPage';
import ChangeProfilePage from './components/pages/ChangeProfilePage';
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
          	<Route exact path="/" component={auth? MyPage : LoginPage} />
          	<Route exact path="/signup" component={SignupPage} />
            <Route exact path="/changeprofile" component={ChangeProfilePage} />　
          	<Route component={LoginPage} />　
        	</Switch>
        </BrowserRouter>
    	</div>
  	);
}

export default App;
