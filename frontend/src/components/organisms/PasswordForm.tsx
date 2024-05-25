import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

import { api } from '../../apis/api';
import { logout } from '../../apis/users.api';


const PasswordForm = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div>
                    <em>
                        Change password.
                    </em>
                </div>
                <div>
                </div>
                <div className='input-group mb-3'>
                    <Input
                        type="password"
                        placeholder="Old Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='input-group mb-3'>
                    <Input
                        type="password"
                        placeholder="New Password"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className='input-group mb-3'>
                    <Input
                        type="password"
                        placeholder="Confirmation New Password"
                        required
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        className='btn-primary w-100'
                        onClick={async () => {
                            if (newPassword !== newPasswordConfirm) {
                                setErrorMsg("Confirmation passwords do not match.");
                                return;
                            }
                            try {
                                await api.put('account/password', {
                                    password: password,
                                    newPassword: newPassword,
                                });
                                logout();
                            } catch (error) {
                                setErrorMsg('Failed.');
                            }
                        }}
                    >Change</ Button>
                </div>
                <div>
                    <div className='text-danger'>{errorMsg}</div>
                </div>
            </div>
        </div>
    )
}

export { PasswordForm };