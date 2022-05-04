import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';


const SignupPage = () => {
	const history = useHistory();
	
	return (
		<>
		<Header 
			rightContent={
				<Button
					onClick={() => history.push('/')}
				>LOGIN</Button>
			}
		/>
		<SignupForm />
		</>
		)
}

export default SignupPage;