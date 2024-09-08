import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import { Header } from 'components/common';
import { LoginForm } from 'components/features/login';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header
                rightContent={
                    <Button 
                        variant="outline-light"
                        onClick={() => navigate('/signup')}
                        aria-label="アカウント作成ページへ移動"
                    >
                        アカウント作成
                    </Button>
                }
            />
            <Container className='mt-5'>
                <LoginForm />
            </Container>
        </>
    );
}

export default LoginPage;
