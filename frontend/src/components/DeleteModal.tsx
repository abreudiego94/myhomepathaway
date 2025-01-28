import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  title?: string;
  description?: string;
}


export default function DeleteModal({ open, onClose, onOk, title = "Delete Item", description = "Are you sure you want to delete this item?" }: DeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Apagar</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja deletar ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOk}>Sim</Button>
        <Button onClick={onClose} autoFocus>
          Não 
        </Button>
      </DialogActions>
    </Dialog>
  );
}
