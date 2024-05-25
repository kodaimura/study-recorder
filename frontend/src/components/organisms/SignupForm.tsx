import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

import { signup } from '../../apis/users.api';


const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfig] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div>
                <em>
                    Create a new account.
                </em>
            </div>
            <div className='input-group mb-3'>
                <Input
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='input-group mb-3'>
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='input-group mb-3'>
                <Input
                    type="password"
                    placeholder="Confirmation Password"
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
                                setErrorMsg("Confirmation passwords do not match.");
                            } else {
                                await signup(username, password);
                            }
                        } catch (error: any) {
                            setErrorMsg((error.status === 409) ? "That Username is already in use." : "Signup failed.");
                        }
                    }}
                >Signup</ Button>
            </div>
            <div>
                <div className='text-danger'>{errorMsg}</div>
            </div>
        </div>
        </div>
    )
}

export { SignupForm };