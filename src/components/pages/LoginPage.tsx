import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import LoginForm from '../parts/LoginForm';


const LoginPage = () => {
	
	const history = useHistory();


	return (
		<>
		<Header
			rightContent={
				<Button 
					onClick={() => history.push('/signup')}
				>SIGNUP</Button>}
		/>
		<LoginForm/>
		</>
		)
}

export default LoginPage;