import React, {useState} from 'react';
import Button from '../atoms/Button';
import Grid from '@mui/material/Grid';
import TextField from '../atoms/TextField';
import PasswordField from '../atoms/PasswordField';

import { signup } from '../../apis/users.api';


const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<Grid 
			container
			direction="column" 
			alignItems="center" 
			justifyContent="center" 
			style={{ height: '70vh' }} 
			spacing={2}
		>
		<Grid item>
			<em>
			Create a new account.
			</em>
		</Grid>
		<Grid item>
		<TextField
			placeholder="Username"
			required 
			onChange={(e) => setUsername(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<PasswordField
			placeholder="Password" 
			required 
			onChange={(e) => setPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<PasswordField 
			placeholder="Confirmation Password" 
			required
			onChange={(e) => setPasswordConfig(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<Button 
			className='btn-primary btn-lg'
			onClick={async () => {
				try {
					if (password !== passwordConfirm) {
						setErrorMsg("Confirmation passwords do not match.");
					} else {
						await signup(username, password);
					}
				} catch (error: any) {
					setErrorMsg((error.status === 409)? "That Username is already in use." : "Signup failed.");
				}
			}}
		>Signup</ Button>
		</Grid>
		<Grid item>
		<div className='text-danger'>{errorMsg}</div>
		</Grid>
		</Grid>
		)
}

export { SignupForm };