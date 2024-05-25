import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

import Header from '../layouts/Header';
import { LoginForm } from '../organisms/LoginForm';


export const LoginPage = () => {
	const navigate = useNavigate();


	return (
		<>
		<Header
			rightContent={
				<Button 
                    className='btn-outline-light'
					onClick={() => navigate('/signup')}
				>SIGNUP</Button>}
		/>
		<LoginForm/>
		</>
		)
}