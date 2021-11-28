import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const DeleteDialog = (props: {
	head: string,
	body: string,
	handler: any
}) => {
  	const [open, setOpen] = useState(false);

  	const handleClickOpen = () => {
   	 	setOpen(true);
  	};

  	const handleClose = () => {
    	setOpen(false);
  	};

  	return (
    	<>
    	<IconButton 
            size="small"
        	color="primary"
        	onClick={handleClickOpen}
        ><DeleteIcon/></IconButton>
      	<Dialog
        	open={open}
        	onClose={handleClose}
      	>
        <DialogTitle>
          {props.head}
        </DialogTitle>
        <DialogContent>
          	<DialogContentText>
            {props.body}
          	</DialogContentText>
        </DialogContent>
        <DialogActions>
        	<Button 
        		onClick={handleClose}>Cancel</Button>
        	<Button 
        		onClick={() => {
        			props.handler();
        			handleClose();
        		}} autoFocus>
            OK
          	</Button>
        </DialogActions>
      	</Dialog>
    </>
  );
}

export default DeleteDialog;