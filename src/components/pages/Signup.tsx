import {useHistory,} from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Header from '../organisms/Header';
import TextInput from '../parts/TextInput';
import {apiDomain} from '../../utils/constants';


const signup = () => {
	const userName = (document.getElementById("userName") as HTMLInputElement)?.value;
	const userId = (document.getElementById("userId") as HTMLInputElement)?.value;
	const password = (document.getElementById("password") as HTMLInputElement)?.value;
	const passwordConfirm = (document.getElementById("passwordConfirm") as HTMLInputElement)?.value;
	const error = document.getElementById("error") as HTMLInputElement

	if (password !== passwordConfirm) {
		error.innerHTML ="パスワードが一致していません。";
	}

	fetch(`${apiDomain}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({userName, userId, password, passwordConfirm})
	})
	.then(response => {
		if (!response.ok) {
			if (response.status === 409) {
				error.innerHTML = (response.status === 409)? 
				"IDが既に利用されています。" : "登録に失敗しました。";
			}
			throw new Error(response.statusText);
		}
		document.location.href = "/"
	})
	.catch(console.error)
}


const Signup = () => {
	const history = useHistory();

	return (
		<div>
		<Header 
			button={<Button 
						variant="outlined" 
						onClick={() => history.push('/login')}
					>LOGIN</Button>}
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
			label="Name" 
			required 
			fullWidth 
			id="userName" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="ID" 
			required 
			fullWidth 
			id="userId" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Password" 
			required 
			fullWidth 
			id="password" 
			type="password" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Confirmation Password" 
			required 
			fullWidth 
			id="passwordConfirm" 
			type="password" 
			variant="filled"
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large"
			variant="contained" 
			color="primary" 
			onClick={signup} 
		>SIGN UP</ Button>
		</Grid>
		<Grid item>
		<div style={{color: "red" }} id="error"></div>
		</Grid>
		</Grid>
		</div>

		)
}

export default Signup;