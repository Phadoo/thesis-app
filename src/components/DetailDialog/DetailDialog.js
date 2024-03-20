import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Typography, Box } from "@mui/material";

export default function DetailDialog(props) {
  const { onClose, open, params } = props;
  const { chlorine, nitrate, zinc } = params || {};

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Physicochemical Parameters</DialogTitle>
      <Box>
        <Typography>Chlorine: {chlorine}</Typography>
        <Typography>Nitrate: {nitrate}</Typography>
        <Typography>Zinc: {zinc}</Typography>
      </Box>
      <Button variant="contained" disableElevation onClick={handleClose}>
        Close
      </Button>
    </Dialog>
  );
}

DetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
