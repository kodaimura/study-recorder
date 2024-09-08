import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import { Header } from 'components/common';
import { SignupForm } from 'components/features/signup';

const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Header 
                rightContent={
                    <Button
						variant="outline-light"
                        onClick={() => navigate('/login')}
                        aria-label="ログインページへ移動"
                    >
                        ログイン
                    </Button>
                }
            />
            <Container className='mt-5'>
                <SignupForm />
            </Container>
        </>
    );
}

export default SignupPage;
