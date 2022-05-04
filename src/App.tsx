import React, {useState,useEffect} from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import MyPage from './components/pages/MyPage';
import PasswordChangePage from './components/pages/PasswordChangePage';
import {apiurl} from './utils/constants';


const App = () => {
	const [auth, setAuth] = useState(false);

  	useEffect(() => {
    	fetch(`${apiurl}/profile`, {
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
            <Route exact path="/passwordchange" component={PasswordChangePage} />　
          	<Route component={LoginPage} />　
        	</Switch>
        </BrowserRouter>
    	</div>
  	);
}

export default App;
