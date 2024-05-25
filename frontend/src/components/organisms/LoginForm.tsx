import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

import { login } from '../../apis/users.api';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div>
                    <em>
                        Login to StudyRecorder.
                    </em>
                </div>
                <div className='input-group mb-3'>
                    <Input
                        required
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-group mb-3'>
                    <Input
                        type="password"
                        required
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        className='btn-primary w-100'
                        onClick={async () => {
                            try {
                                await login(username, password);
                            } catch (error: any) {
                                setErrorMsg("Login failed.");
                            }
                        }}
                    >Login</ Button>
                </div>
            </div>
            <div>
                <div className='text-danger'>{errorMsg}</div>
            </div>
        </div>
    )
}

export { LoginForm };