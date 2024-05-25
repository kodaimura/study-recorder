import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../atoms/Button';

import Header from '../layouts/Header';
import { SignupForm } from '../organisms/SignupForm';


export const SignupPage = () => {
	const navigate = useNavigate();
	
	return (
		<>
		<Header 
			rightContent={
				<Button
                    className='btn-outline-light'
					onClick={() => navigate('/login')}
				>LOGIN</Button>
			}
		/>
		<SignupForm />
		</>
		)
}
