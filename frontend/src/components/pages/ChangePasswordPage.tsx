import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { Header, HeaderMenu } from 'components/common';
import { PasswordForm } from 'components/features/change-password';

import { api } from 'apis/api';
import { logout } from 'apis/users.api';

const ChangePasswordPage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get('account/profile');
                if (data && data.username) {
                    setUsername(data.username);
                }
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <Container className='mt-5 text-center'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">読み込み中...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <>
            <Header rightContent={username ? <HeaderMenu username={username} /> : null} />
            <Container className='mt-5'>
                <PasswordForm />
            </Container>
        </>
    );
};

export default ChangePasswordPage;