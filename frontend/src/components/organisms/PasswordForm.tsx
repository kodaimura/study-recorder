import React, {useState} from 'react';
import Button from '../atoms/Button';
import Grid from '@mui/material/Grid';
import PasswordField from '../atoms/PasswordField';

import { api } from '../../apis/api';
import { logout } from '../../apis/users.api';


const PasswordForm = () => {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
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
			Change password.
			</em>
		</Grid>
		<Grid item>
		</Grid>
		<Grid item>
		<PasswordField
			placeholder="Old Password" 
			required
			onChange={(e) => setPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<PasswordField
			placeholder="New Password" 
			required
			onChange={(e) => setNewPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<PasswordField
			placeholder="Confirmation New Password" 
			required
			onChange={(e) => setNewPasswordConfirm(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<Button 
            className='btn-primary btn-lg'
			onClick={async () => {
				if (newPassword !== newPasswordConfirm) {
					setErrorMsg("Confirmation passwords do not match.");
					return;
				}
				try {
					await api.put('account/password', {
						password: password, 
						newPassword: newPassword,
					});
					logout();
				} catch (error) {
					setErrorMsg('Failed.');
				}
			}}
		>Change</ Button>
		</Grid>
		<Grid item>
		<div className='text-danger'>{errorMsg}</div>
		</Grid>
		</Grid>
		)
}

export { PasswordForm };