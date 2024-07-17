import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactPage";
import StatisticsPageV2 from "./pages/StatisticsPageV2";
import NotFoundPage from "./pages/NotFoundPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001D4A",
    },
    secondary: {
      main: "#D9D9D9",
    },
    footer: {
      main: "#EFFAFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F3E7", // Apply background color globally
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Default text color
          '&:hover': {
            color: '#F08629', // Text color on hover
          },
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard",
    element: <StatisticsPageV2 />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This applies MUI baseline styles globally */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
