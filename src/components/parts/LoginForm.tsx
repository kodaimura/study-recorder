import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const TextInput = styled(TextField) ({
	width: 300
})

const LoginForm = (props: {
	onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}) => {

	return (
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
			variant="filled"
			onChange={props.onChange1}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="Password" 
			type="password" 
			variant="filled"
			onChange={props.onChange2}
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large"
			variant="contained" 
			color="primary" 
			onClick={props.onClick} 
		>LOGIN</ Button>
		</Grid>
		</Grid>
		)
}

export default LoginForm;