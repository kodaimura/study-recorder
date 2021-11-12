import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextInput from '../parts/TextInput';
import Header from '../organisms/Header';
import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const login =　() => {
	const userId = (document.getElementById("userId") as HTMLInputElement)?.value;
	const password = (document.getElementById("password") as HTMLInputElement)?.value;
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


const Login = () => {
	const history = useHistory();

	return (
		<div>
		<Header 
			button={<Button 
						variant="outlined" 
						onClick={() => history.push('/signup')}
					>SIGNUP</Button>}
		/>
		<Grid 
			container 
			direction="column" 
			alignItems="center" 
			justifyContent="center" 
			style={{ height: '80vh' }} 
			spacing={2}
		>
		<Grid item>
		<TextInput 
			required 
			label="ID" 
			id="userId" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="Password" 
			id="password" 
			type="password" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large"
			variant="contained" 
			color="primary" 
			onClick={login} 
		>LOGIN</ Button>
		</Grid>
		</Grid>
		</div>
		)
}

export default Login;