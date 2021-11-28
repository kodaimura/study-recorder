import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const CustomAppBar = styled(AppBar) ({
	backgroundColor: "black",
});


const Header = (props: {
	rightContent: React.ReactNode
}) => {

	return (
		<CustomAppBar position="static">
		<Toolbar>
		<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      	STUDY RECORDER
        </Typography>
		{props.rightContent}
		</ Toolbar>
		</CustomAppBar>
	);
}

export default Header;