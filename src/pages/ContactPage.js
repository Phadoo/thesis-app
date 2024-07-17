import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

import Navbar from "../components/NavbarV3/Navbar_Home";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/send-email",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };
  return (
    <>
      <Navbar />
      <Box // Add a wrapping Box component
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)", // Adjust height for the navbar
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Got a question?
                  </Typography>
                  <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                    Contact Us
                  </Typography>
                  <Typography variant="body1">
                    We're here to help and answer any question that you might
                    have. We look forward to hearing from you.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { mb: 2, width: "100%" },
                    "& .MuiButton-root": { mt: 2 },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    required
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Send Message
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ContactUs;
