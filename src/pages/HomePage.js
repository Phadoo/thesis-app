import React from "react";
import Button from "@mui/material/Button";
import DetailDialog from "../components/DetailDialog/DetailDialog"

export default function HomePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Dialog Test
      </Button>
      <DetailDialog open={open} onClose={handleClose} />
    </div>
  );
}
