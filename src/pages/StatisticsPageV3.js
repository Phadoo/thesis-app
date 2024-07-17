import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import WaterIcon from "@mui/icons-material/Water";

import SidebarV3 from "../components/SidebarV3/SidebarV3";
import Datagrid from "../components/Datagrid/Datagrid";
import Statbox from "../components/Statbox/Statbox";
import Detailbox from "../components/Detailbox/Detailbox";

export default function StatisticsPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [csvData, setCsvData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    status: "",
    temperature: "",
    ph: "",
    tds: "",
    turbidity: "",
    nitrate: "",
    zinc: "",
    chlorine: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_all_data");
        const formattedData = response.data.map((item) => ({
          ID: item.id,
          Location: item.location,
          Status: item.status,
          Temperature: item.temperature,
          pH: item.ph,
          TDS: item.tds,
          Turbidity: item.turbidity,
          Nitrate: item.nitrate,
          Zinc: item.zinc,
          Chlorine: item.chlorine,
        }));
        setCsvData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectedRow = (row) => {
    setSelectedRow(row);
    setFormData({
      id: row?.ID || "",
      location: row?.Location || "",
      status: row?.Status || "",
      temperature: row?.Temperature || "",
      ph: row?.pH || "",
      tds: row?.TDS || "",
      turbidity: row?.Turbidity || "",
      nitrate: row?.Nitrate || "",
      zinc: row?.Zinc || "",
      chlorine: row?.Chlorine || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_and_update",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Handle the result here, e.g., update the UI or display a success message
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { temperature, ph, tds, turbidity, location, status } = selectedRow || {};

  return (
    <Box display="flex">
      <CssBaseline />
      {!isSmallScreen && (
        <Box width={isSmallScreen ? "100%" : "330px"}>
          <SidebarV3 />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: isSmallScreen ? '100%' : `calc(100% - 330px)`,
          ml: isSmallScreen ? 0 : '330px',
        }}
      >
        <AppBar position="fixed" sx={{ width: `calc(100% - ${isSmallScreen ? 0 : '330px'})`, ml: isSmallScreen ? 0 : '330px' }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Statistics
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container style={{ maxWidth: "1300px", paddingTop: "30px" }}>
          <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
            <Datagrid onRowSelection={handleSelectedRow} />

            {/* STATS */}
            <Box display="flex" flexDirection="column" gap="10px" ml={isSmallScreen ? 0 : "20px"} mt={isSmallScreen ? "20px" : 0}>
              <Box
                backgroundColor="#D9D9D9"
                borderRadius="15px"
                boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                height="350px"
              >
                <Box m="15px" ml="30px">
                  Stats
                </Box>
                <Box
                  ml="30px"
                  display="grid"
                  gridTemplateColumns={isSmallScreen ? "repeat(2, 1fr)" : "repeat(9, 1fr)"}
                  gridAutoRows="130px"
                  gap="10px"
                >
                  <Box
                    gridColumn="span 4"
                    backgroundColor="#B0B0B0"
                    height="130px"
                    width="130px"
                  >
                    <Typography style={{ fontSize: "13px", padding: "8px" }}>
                      Temperature
                    </Typography>
                    <Box display="flex" alignItems="center" gap="10px" mt="15px">
                      <Box ml="5px">
                        <ThermostatIcon style={{ fontSize: 40 }} />
                      </Box>
                      <Box>
                        <Statbox
                          title={
                            temperature
                              ? `${Math.round(parseFloat(temperature))}°`
                              : ""
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 4" backgroundColor="#B0B0B0">
                    <Typography style={{ fontSize: "13px", padding: "8px" }}>
                      pH
                    </Typography>
                    <Box display="flex" alignItems="center" gap="10px" mt="15px">
                      <Box ml="13px">
                        <SpeedIcon style={{ fontSize: 40 }} />
                      </Box>
                      <Box>
                        <Statbox
                          title={ph ? `${Math.round(parseFloat(ph))}` : ""}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 4" backgroundColor="#B0B0B0">
                    <Typography style={{ fontSize: "13px", padding: "8px" }}>
                      TDS
                    </Typography>
                    <Box display="flex" alignItems="center" gap="10px" mt="10px">
                      <Box ml="30px">
                        <Statbox
                          title={tds ? `${Math.round(parseFloat(tds))}` : ""}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 4" backgroundColor="#B0B0B0">
                    <Typography style={{ fontSize: "13px", padding: "8px" }}>
                      Turbidity
                    </Typography>
                    <Box display="flex" alignItems="center" gap="10px" mt="10px">
                      <Box ml="10px">
                        <WaterIcon style={{ fontSize: 40 }} />
                      </Box>
                      <Box>
                        <Statbox
                          title={
                            turbidity
                              ? `${Math.round(parseFloat(turbidity))}`
                              : ""
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* DETAILS */}
              <Box
                backgroundColor="#D9D9D9"
                borderRadius="15px"
                minHeight="300px"
                boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
              >
                <Box m="15px" ml="30px">
                  Details
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  maxWidth="270px"
                  ml="30px"
                  gap="20px"
                >
                  <Box mt="5px">
                    <Detailbox title="Location" description={location} />
                  </Box>
                  <Box>
                    <Detailbox title="Status" description={status} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt="20px" display="flex" flexDirection={isSmallScreen ? "column" : "row"} gap="10px">
            <CSVLink data={csvData} filename="data.csv">
              <Button variant="contained">Download CSV</Button>
            </CSVLink>
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>Edit Data</Button>
          </Box>

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap="10px"
                mt="20px"
              >
                <TextField
                  label="ID"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="pH"
                  name="ph"
                  value={formData.ph}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Nitrate"
                  name="nitrate"
                  value={formData.nitrate}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Zinc"
                  name="zinc"
                  value={formData.zinc}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Chlorine"
                  name="chlorine"
                  value={formData.chlorine}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
