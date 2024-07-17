// /src/App.js
import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/NavbarV3/Navbar_Home"; // Assuming Navbar is in /src/components/Navbar.js

function App() {
  return (
    <>
      <Container>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </Container>
    </>
  );
}

export default App;
