import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { signup } from 'apis/users.api';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateUsername = (value: string): string => {
        if (!value.trim()) return "アカウント名を入力してください。";
        if (value.length > 150) return "アカウント名は150文字以内で入力してください。";
        return "";
    };

    const validatePassword = (value: string): string => {
        if (!value) return "パスワードを入力してください。";
        if (value.length < 8) return "パスワードは8文字以上で入力してください。";
        if (value.length > 128) return "パスワードは128文字以内で入力してください。";
        if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
            return "パスワードには英字と数字をどちらも含めてください。";
        }
        return "";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextUsernameError = validateUsername(username);
        const nextPasswordError = validatePassword(password);
        const nextPasswordConfirmError = !passwordConfirm
            ? "確認用パスワードを入力してください。"
            : password !== passwordConfirm ? "確認用パスワードが一致していません。" : "";
        setUsernameError(nextUsernameError);
        setPasswordError(nextPasswordError);
        setPasswordConfirmError(nextPasswordConfirmError);
        setErrorMsg("");

        if (nextUsernameError || nextPasswordError || nextPasswordConfirmError) {
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
        <div className='auth-panel'>
            <div className="auth-panel-header">
                <h1>アカウント作成</h1>
                <p>8文字以上で、英字と数字を含むパスワードを設定してください。</p>
            </div>
            <div>
                {errorMsg && <div className='auth-error'>{errorMsg}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-person"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="アカウント名"
                                isInvalid={!!usernameError}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setUsername(value);
                                    setUsernameError(validateUsername(value));
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {usernameError}
                            </Form.Control.Feedback>
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
                                isInvalid={!!passwordError}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPassword(value);
                                    setPasswordError(validatePassword(value));
                                    if (passwordConfirm) {
                                        setPasswordConfirmError(value === passwordConfirm ? "" : "確認用パスワードが一致していません。");
                                    }
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
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
                                isInvalid={!!passwordConfirmError}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPasswordConfirm(value);
                                    setPasswordConfirmError(!value ? "確認用パスワードを入力してください。" : password === value ? "" : "確認用パスワードが一致していません。");
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordConfirmError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button
                        variant="dark"
                        className='app-submit-button'
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
