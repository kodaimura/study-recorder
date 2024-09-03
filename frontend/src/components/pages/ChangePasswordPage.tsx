import React, {useState, useEffect} from 'react';

import Header from '../layouts/Header';
import { PasswordForm } from '../organisms/PasswordForm';
import HeaderMenu from '../molecules/HeaderMenu';

import { api } from '../../apis/api';
import Container from '../layouts/Container';


export const ChangePasswordPage: React.FC = () => {
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
        <Container className='mt-5'>
		    <PasswordForm />
        </Container>
		</>
		)
}