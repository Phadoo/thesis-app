import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import logo from "../../assets/Logo_H2.png";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDashboardClick = (event) => {
    event.preventDefault(); // Prevent the default action of the button
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    setDialogOpen(false);
    navigate("/dashboard");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.primary.main, // Apply secondary color
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="Logo" style={{ height: 60 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/" sx={{ mx: 2 }}>
            Home
          </Button>
          <Button color="inherit" onClick={handleDashboardClick} sx={{ mx: 2 }}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/contact" sx={{ mx: 2 }}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>
      <ConfirmationDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default Navbar;
