import React, { ReactNode, useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';

import Header from '../layouts/Header';

import { RecordButton, RecordMenu } from '../organisms'
import HeaderMenu from '../shared/HeaderMenu';

import { api } from '../../apis/api';

type  Props = {
    children: ReactNode;
};

const Box = styled('div') ({
	width:"90%", 
	margin: "0 auto",
	marginTop: "20px"
});


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
		<Box>
		<RecordButton />
		<hr />
		<RecordMenu/>

		<hr/>
		{ props.children }
		</Box>
		</>
		);
}

export { RecordTemplate };