import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


import React from 'react';

const Header = (props: {
	userName?: string,
	button?: React.ReactNode
}) => {
	const userName = props.userName;
	const button = props.button;

	const Header = styled(AppBar) ({
		backgroundColor: "black",
	});

	return (
		<Header position="static">
		<Toolbar>
		<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      	STUDY RECORDER
        </Typography>
        <Typography variant="h6">
      	{(userName)? `${userName}　` : ""}
        </Typography>
		{button}
		</ Toolbar>
		</Header>
	);
}

export default Header;