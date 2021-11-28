import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import LoginForm from '../parts/LoginForm';
import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const LoginPage = () => {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();


  	const login =　() => {
		fetch(`${apiDomain}/login`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({userId, password})
		})
		.then(parseResponse)
		.then(data => {
			localStorage.setItem("token", data.access_token);
			document.location.href = "/";
		})
		.catch(console.error);
	}

	return (
		<>
		<Header 
			rightContent={
				<Button 
					variant="outlined" 
					onClick={() => history.push('/signup')}
				>SIGNUP</Button>}/>
		<LoginForm
			onChange1={(e) => setUserId(e.target.value)}
			onChange2={(e) => setPassword(e.target.value)} 
			onClick={login}/>
		</>
		)
}

export default LoginPage;