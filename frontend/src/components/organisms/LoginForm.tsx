import React, {useState} from 'react';
import Button from '../atoms/Button';
import Grid from '@mui/material/Grid';
import Input from '../atoms/Input';

import { login } from '../../apis/users.api';

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<>
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
			Login to StudyRecorder.
			</em>
		</Grid>
		<Grid item>
		<Input 
			required 
			placeholder="Username" 
			onChange={(e) => setUsername(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<Input 
            type="password"
			required 
			placeholder="Password"
			onChange={(e) => setPassword(e.target.value)} 
		/>
		</Grid>
		<Grid item>
		<Button
            className='btn-primary btn-lg'
			onClick={async () => {
				try {
					await login(username, password);
				} catch (error: any) {
					setErrorMsg("Login failed.");
				}
			}}
		>Login</ Button>
		</Grid>
		<Grid item>
		<div className='text-danger'>{errorMsg}</div>
		</Grid>
		</Grid>
		</>
		)
}

export { LoginForm };