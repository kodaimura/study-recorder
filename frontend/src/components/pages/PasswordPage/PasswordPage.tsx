import React, {useState, useEffect} from 'react';

import Header from '../../layouts/Header';
import PasswordForm from '../../forms/PasswordForm';
import HeaderMenu from '../../shared/HeaderMenu';

import {getProfile} from '../../../apis/users.api';


export const PasswordPage = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.username) setUsername(data.username);
		});
	}, [])

	return (
		<>
		<Header rightContent={<HeaderMenu username={username}/>}/>
		<PasswordForm />
		</>
		)
}