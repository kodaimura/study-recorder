import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

import { signup } from '../../apis/users.api';


const SignupForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfig] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
            <div>
                <div className='text-danger'>{errorMsg}</div>
            </div>
            <div className='input-group mb-3'>
                <Input
                    placeholder="アカウント名"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='input-group mb-3'>
                <Input
                    type="password"
                    placeholder="パスワード"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='input-group mb-3'>
                <Input
                    type="password"
                    placeholder="パスワード（確認用）"
                    required
                    onChange={(e) => setPasswordConfig(e.target.value)}
                />
            </div>
            <div>
                <Button
                    className='btn-primary w-100'
                    onClick={async () => {
                        try {
                            if (password !== passwordConfirm) {
                                setErrorMsg("確認用パスワードが一致していません。");
                            } else {
                                await signup(username, password);
                            }
                        } catch (error: any) {
                            if (error.status === 409) {
                                setErrorMsg("アカウント名が既に利用されています。")
                            } else {
                                setErrorMsg("アカウント作成に失敗しました。")
                            }
                        }
                    }}
                >アカウント作成</ Button>
            </div>
        </div>
        </div>
    )
}

export { SignupForm };