import React from "react";

import DashboardIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/statistics",
  },
  {
    title: "Predict",
    icon: <SupervisorAccountIcon />,
    link: "/predict",
  },
];
