import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

import Header from '../layouts/Header';
import { SignupForm } from '../organisms/SignupForm';
import Container from '../layouts/Container';


export const SignupPage: React.FC = () => {
	const navigate = useNavigate();
	
	return (
		<>
		<Header 
			rightContent={
				<Button
                    className='btn-outline-light'
					onClick={() => navigate('/login')}
				>ログイン</Button>
			}
		/>
        <Container className='mt-5'>
		    <SignupForm />
        </Container>
		</>
		)
}
