import React, { ReactNode, useState, useEffect} from 'react';
import Container from '../layouts/Container';

import Header from '../layouts/Header';

import { RecordButton, RecordMenu } from '../organisms'
import HeaderMenu from '../molecules/HeaderMenu';

import { api } from '../../apis/api';

type  Props = {
    children: ReactNode;
};

const RecordTemplate: React.FC<Props> = (props) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		(async () => {
			const data = await api.get('account/profile');
			if (data && data.username) setUsername(data.username);
		})();
	}, []);

	return (
		<>
		<Header rightContent={<HeaderMenu username={username}/>} />
        <Container>
		<RecordButton />
		<hr />
		<RecordMenu/>

		<hr/>
		{ props.children }
		</Container>
		</>
		);
}

export { RecordTemplate };