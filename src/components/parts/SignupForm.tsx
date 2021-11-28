import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const ErrorMessage = styled("div") ({
	color: "red"
})

const TextInput = styled(TextField) ({
	width: 300
})

const SignupForm = (props :{
	onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChange3: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChange4: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
	buttonText?: string,
	errorMessage: string
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
			label="Name" 
			required 
			fullWidth 
			variant="filled"
			onChange={props.onChange1}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="ID" 
			required 
			fullWidth  
			variant="filled"
			onChange={props.onChange2}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Password" 
			required 
			fullWidth 
			type="password" 
			variant="filled"
			onChange={props.onChange3}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Confirmation Password" 
			required 
			fullWidth  
			type="password" 
			variant="filled"
			onChange={props.onChange4}
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large" 
			variant="contained" 
			color="primary" 
			onClick={props.onClick} 
		>{(props.buttonText)? props.buttonText : "SIGN UP"}</ Button>
		</Grid>
		<Grid item>
		<ErrorMessage>
		{props.errorMessage}
		</ErrorMessage>
		</Grid>
		</Grid>
		)
}

export default SignupForm;