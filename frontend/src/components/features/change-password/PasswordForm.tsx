import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { api } from 'apis/api';
import { logout } from 'apis/users.api';

const PasswordForm: React.FC = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword !== newPasswordConfirm) {
            setErrorMsg("確認用パスワードが一致していません。");
            return;
        }

        try {
            await api.put('account/password', {
                password: password,
                newPassword: newPassword,
            });
            logout();
        } catch (error: any) {
            if (error.status === 400) {
                setErrorMsg('現在のパスワードが誤っています。');
            } else {
                setErrorMsg('パスワードの変更に失敗しました。');
            }
        }
    };

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <div className='text-danger'>{errorMsg}</div>
                    </div>
                    <div className='input-group mb-3'>
                        <Form.Control
                            type="password"
                            placeholder="現在のパスワード"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='input-group mb-3'>
                        <Form.Control
                            type="password"
                            placeholder="新しいパスワード"
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='input-group mb-3'>
                        <Form.Control
                            type="password"
                            placeholder="新しいパスワード（確認用）"
                            required
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className='btn-primary w-100'
                    >
                        変更
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { PasswordForm };
