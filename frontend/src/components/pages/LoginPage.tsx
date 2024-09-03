import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

import Header from '../layouts/Header';
import { LoginForm } from '../organisms/LoginForm';
import Container from '../layouts/Container';


export const LoginPage: React.FC = () => {
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
        <Container className='mt-5'>
            <LoginForm/>
        </Container>
		</>
		)
}