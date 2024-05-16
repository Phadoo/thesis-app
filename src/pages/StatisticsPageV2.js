import React, { useState } from "react";
import "./StatPage.css"; // Import the CSS file
import Sidebar from "../components/Sidebar/Sidebar";
import Datagrid from "../components/Datagrid/Datagrid";
import Statbox from "../components/Statbox/Statbox";
import Detailbox from "../components/Detailbox/Detailbox";
import { Box, Typography, useTheme } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import WaterIcon from "@mui/icons-material/Water";

export default function StatisticsPage() {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelectedRow = (row) => {
    setSelectedRow(row);
  };

  const {
    temperature,
    ph,
    tds,
    turbidity,
    location,
    update_text,
    status,
    chlorine,
    nitrate,
    zinc,
  } = selectedRow || {};

  return (
    <Box className="container">
      <Box className="sidebar">
        <Sidebar />
      </Box>
      <Box className="main-content">
        <Box>
          <Datagrid onRowSelection={handleSelectedRow} />
        </Box>

        {/* STATS */}
        <Box
          className="stats-container"
          display="grid"
          gridTemplateColumns="repeat(9, 1fr)"
          gridAutoRows="130px"
          gap="10px"
        >
          {/* ROW 1 */}
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
                    temperature ? `${Math.round(parseFloat(temperature))}°` : ""
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
                <Statbox title={ph ? `${Math.round(parseFloat(ph))}` : ""} />
              </Box>
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box gridColumn="span 4" backgroundColor="#B0B0B0">
            <Typography style={{ fontSize: "13px", padding: "8px" }}>
              TDS
            </Typography>
            <Box display="flex" alignItems="center" gap="10px" mt="10px">
              <Box ml="30px">
                <Statbox title={tds ? `${Math.round(parseFloat(tds))}` : ""} />
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
                    turbidity ? `${Math.round(parseFloat(turbidity))}` : ""
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* DETAILS */}
        <Box
          className="detail-container"
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
              <Detailbox title="Last Update" description={update_text} />
            </Box>
            <Box>
              <Detailbox title="Status" description={status} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
