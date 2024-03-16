import React from "react";

import "../App.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Datagrid from "../components/Datagrid/Datagrid";
import Statbox from "../components/Statbox/Statbox";
import Detailbox from "../components/Detailbox/Detailbox";
import SidebarV2 from "../components/SidebarV2/SidebarV2";

import { Box, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export default function StatisticsPage() {
  const dashboard = [1, 2, 3, 4, 5];
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
              backgroundColor="gray"
              borderRadius="5px"
              height="50vh"
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
                  backgroundColor="blue"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Statbox title="Temperature" unit="Celsius" />
                </Box>
                <Box
                  gridColumn="span 4"
                  backgroundColor="yellow"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  hello
                </Box>

                {/* ROW 2 */}

                <Box
                  gridColumn="span 4"
                  backgroundColor="purple"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  hello
                </Box>
                <Box
                  gridColumn="span 4"
                  backgroundColor="pink"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  hello
                </Box>
              </Box>
            </Box>
            <Box backgroundColor="gray" borderRadius="5px" height="45vh">
              <Box m="15px" ml="30px">
                Details
              </Box>
              <Box display="flex" flexDirection="column">
                <Box>
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
