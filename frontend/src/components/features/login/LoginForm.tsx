import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { login } from 'apis/users.api';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('session') === 'expired' ? "セッションの有効期限が切れました。もう一度ログインしてください。" : "";
    });

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
        <div className='auth-panel'>
            <div className="auth-panel-header">
                <h1>ログイン</h1>
                <p>学習記録を続きから確認します。</p>
            </div>
            {errorMsg && <div className='auth-error'>{errorMsg}</div>}
            <div>
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
                        variant="dark"
                        type="submit"
                        className='app-submit-button'
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i> ログイン
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { LoginForm };
