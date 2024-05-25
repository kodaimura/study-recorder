import React, {useState, useEffect} from 'react';

import Header from '../layouts/Header';
import { PasswordForm } from '../organisms/PasswordForm';
import HeaderMenu from '../shared/HeaderMenu';

import { api } from '../../apis/api';


export const ChangePasswordPage = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		(async () => {
			const data = await api.get('account/profile');
			if (data && data.username) setUsername(data.username);
		})();
	}, [])

	return (
		<>
		<Header rightContent={<HeaderMenu username={username}/>}/>
		<PasswordForm />
		</>
		)
}