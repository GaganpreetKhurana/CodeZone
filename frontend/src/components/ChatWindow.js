import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ChatBox from './ChatBox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {self,other} = props;
  let disable;
  if(self && other){
  if(self._id === other._id){
    disable = true;
  }
  else{
    disable = false;
  }
  }
  console.log(props,"selfother");
  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen} disabled={disable}>
        <CommentIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        disableBackdropClick
        disableEnforceFocus
        hideBackdrop
        PaperProps={{
            sx: {
            width: "50%",
            maxHeight: 400,
            maxWidth: 500,
            }
        }}
        style={{ position: 'left' }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Chat Window
        </DialogTitle>
        <DialogContent>
            <ChatBox/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}