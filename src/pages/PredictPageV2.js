import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

import SidebarV3 from "../components/SidebarV3/SidebarV3";

const PredictionForm = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      setPrediction(null);
      setError(error.response.data.error);
    }
  };

  return (
    <Box display="flex" className="container">
      <SidebarV3 />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Water Bacteria Prediction
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for your features */}
          <TextField
            name="Temperature"
            label="Temperature"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="pH"
            label="pH"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Total Dissolved Solids"
            label="Total Dissolved Solids"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Turbidity"
            label="Turbidity"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Nitrate"
            label="Nitrate"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Chlorides"
            label="Chlorides"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Zinc"
            label="Zinc"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="Total Fecal Coliform"
            label="Total Fecal Coliform"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          {/* Add more form fields as needed */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Predict
          </Button>
        </form>
        {prediction && (
          <Typography variant="h5">Prediction: {prediction}</Typography>
        )}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PredictionForm;
