import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

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
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>
                            <i className="bi bi-key"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="現在のパスワード"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>
                            <i className="bi bi-lock"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="新しいパスワード"
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>
                            <i className="bi bi-lock-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="新しいパスワード（確認用）"
                            required
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        variant="success"
                        type="submit"
                        className='w-100 d-flex align-items-center justify-content-center'
                    >
                        <i className="bi bi-save me-2"></i> 変更
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { PasswordForm };
