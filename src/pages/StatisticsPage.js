import React from "react";

import "../App.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Datagrid from "../components/Datagrid/Datagrid";
import Statbox from "../components/Statbox/Statbox";
import Detailbox from "../components/Detailbox/Detailbox";

import { Box, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import WaterIcon from "@mui/icons-material/Water";

export default function StatisticsPage() {
  return (
    <Box className="container">
      <Box>
        <Box display="flex">
          <Sidebar />
          <Box m="20px">
            <Box>
              <Datagrid />
            </Box>
          </Box>

          {/* STATS */}

          <Box display="flex" flexDirection="column" gap="10px">
            <Box
              mt="20px"
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
                      <Statbox title="69°" />
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
                      <Statbox title="11" />
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
                      <Statbox title="420" unit="ppm" />
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
                      <Statbox title="88" unit="ntu" />
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
                  <Detailbox
                    title="Location"
                    description="Block 21 Lot 8, Phase 1, St. Joseph Village 6, Cabuyao, Laguna"
                  />
                </Box>
                <Box>
                  <Detailbox
                    title="Last Update"
                    description="January 21, 2024"
                  />
                </Box>
                <Box>
                  <Detailbox title="Status" description="Potable" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
