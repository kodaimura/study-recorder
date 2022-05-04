import {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import {changePassword} from '../../utils/common-requests';


const ErrorMessage = styled("div") ({
	color: "red"
})

const TextInput = styled(TextField) ({
	width: 300
})


const PasswordChangeForm = () => {
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
		<TextInput 
			label="Old Password" 
			required 
			fullWidth
			type="password"   
			variant="filled"
			onChange={(e) => setPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="New Password" 
			required 
			fullWidth 
			type="password" 
			variant="filled"
			onChange={(e) => setNewPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Confirmation New Password" 
			required 
			fullWidth  
			type="password" 
			variant="filled"
			onChange={(e) => setNewPasswordConfirm(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large" 
			variant="contained" 
			color="primary" 
			onClick={() => changePassword(password, newPassword, newPasswordConfirm, setErrorMsg)}
		>Change</ Button>
		</Grid>
		<Grid item>
		<ErrorMessage>
		{errorMsg}
		</ErrorMessage>
		</Grid>
		</Grid>
		)
}

export default PasswordChangeForm;