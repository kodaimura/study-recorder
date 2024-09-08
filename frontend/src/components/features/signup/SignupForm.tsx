import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { signup } from 'apis/users.api';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordConfirm) {
            setErrorMsg("確認用パスワードが一致していません。");
            return;
        }

        setIsLoading(true);
        try {
            await signup(username, password);
        } catch (error: any) {
            if (error.status === 409) {
                setErrorMsg("アカウント名が既に利用されています。");
            } else {
                setErrorMsg("アカウント作成に失敗しました。");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='text-danger mb-3'>{errorMsg}</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-person"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="アカウント名"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-lock"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="パスワード"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-lock"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="パスワード（確認用）"
                                required
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button
                        variant="success"
                        className='w-100 d-flex align-items-center justify-content-center'
                        type="submit"
                        disabled={isLoading}
                    >
                        <i className="bi bi-person-plus me-2"></i> アカウント作成
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export { SignupForm };
