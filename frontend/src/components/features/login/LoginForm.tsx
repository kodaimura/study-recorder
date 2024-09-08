import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { login } from 'apis/users.api';

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
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>
                            <i className="bi bi-person"></i>
                        </InputGroup.Text>
                        <Form.Control
                            required
                            placeholder="アカウント名"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>
                            <i className="bi bi-lock"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            required
                            placeholder="パスワード"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        className='w-100 d-flex align-items-center justify-content-center'
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i> ログイン
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { LoginForm };
