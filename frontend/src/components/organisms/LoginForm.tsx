import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../apis/users.api';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login(username, password);
        } catch (error: any) {
            if (error.status === 401) {
                setErrorMsg("アカウント名または、パスワードに誤りがあります。");
            } else {
                setErrorMsg("ログインに失敗しました。");
            }
        }
    };

    return (
        <div className='row justify-content-center'>
            <div>
                <div className='text-danger text-center'>{errorMsg}</div>
            </div>
            <div className='col-md-6'>
                <Form onSubmit={handleSubmit}>
                    <div className='input-group mb-3'>
                        <Form.Control
                            required
                            placeholder="アカウント名"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='input-group mb-3'>
                        <Form.Control
                            type="password"
                            required
                            placeholder="パスワード"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className='btn-primary w-100'
                    >
                        ログイン
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { LoginForm };
