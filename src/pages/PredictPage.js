import React, { useState } from "react";
import axios from "axios";

import { Box, Typography } from "@mui/material";

const PredictionForm = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData)); // Log formData to console
      const response = await axios.post(
        "http://localhost:5000/predict",
        JSON.stringify(formData)
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography>Water Potability Prediction</Typography>
        <input
          type="text"
          name="Temperature"
          placeholder="Temperature"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="pH"
          placeholder="pH"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Total Dissolved Solids"
          placeholder="Total Dissolved Solids"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Turbidity"
          placeholder="Turbidity"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Nitrate"
          placeholder="Nitrate"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Chlorides"
          placeholder="Chlorides"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Zinc"
          placeholder="Zinc"
          required="required"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Total Fecal Coliform"
          placeholder="Total Fecal Coliform"
          required="required"
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Water Quality: {prediction}</p>}
    </div>
  );
};

export default PredictionForm;
