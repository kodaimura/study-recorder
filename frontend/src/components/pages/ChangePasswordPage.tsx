import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../layouts/Header';
import { PasswordForm } from '../organisms/PasswordForm';
import HeaderMenu from '../molecules/HeaderMenu';
import { api } from '../../apis/api';

export const ChangePasswordPage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get('account/profile');
                if (data && data.username) {
                    setUsername(data.username);
                }
            } catch (err) {
                setError('プロフィールの取得に失敗しました。');
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
                {error ? (
                    <div className='text-danger text-center'>{error}</div>
                ) : (
                    <PasswordForm />
                )}
            </Container>
        </>
    );
};
