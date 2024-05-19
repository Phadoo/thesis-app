import React from "react";
import Button from "@mui/material/Button";
import DetailDialog from "../components/DetailDialog/DetailDialog";

import SidebarV3 from "../components/SidebarV3/SidebarV3";
import Sidebar from "../components/Sidebar/Sidebar";

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
      <Sidebar />
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Dialog Test
      </Button>
      <DetailDialog open={open} onClose={handleClose} />
    </div>
  );
}
