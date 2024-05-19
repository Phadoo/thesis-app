import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import HomePage from "./pages/HomePage";
import StatisticsPage from "./pages/StatisticsPage";
import StatisticsPageV2 from "./pages/StatisticsPageV2";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import PredictPage from "./pages/PredictPage";
import PredictPageV2 from "./pages/PredictPageV2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/statistics",
    element: <StatisticsPageV2 />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/predict",
    element: <PredictPageV2 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
