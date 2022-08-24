import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../../layouts/Header';
import SignupForm from '../../forms/SignupForm';


export const SignupPage = () => {
	const navigate = useNavigate();
	
	
	return (
		<>
		<Header 
			rightContent={
				<Button
					onClick={() => navigate('/')}
				>LOGIN</Button>
			}
		/>
		<SignupForm />
		</>
		)
}
