import React from "react";
import "../../App.css";
import logo from "../../assets/icon.ico";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo" />
      <MenuIcon />
    </div>
  );
};

export default Navbar;
