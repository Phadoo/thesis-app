import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Navigation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to go to the Dashboard?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'gray' }}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={{ color: 'gray' }} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
