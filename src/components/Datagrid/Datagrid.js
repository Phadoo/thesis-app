import "./Datagrid.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function Datagrid() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_all_data");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const rows = [];

  const columns = [
    {
      field: "location",
      headerName: "PLACE",
      width: 250,
    },
    {
      field: "update_text",
      headerName: "DATE",
      width: 250,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 250,
    },
    {
      field: "col4",
      headerName: "ACTIONS",
      width: 100,
      renderCell: () => {
        return (
          <Button
            variant="outlined"
            size="small"
            style={{ color: "black", borderColor: "black" }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: "85vh", width: 900 }}>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }}
      />
    </div>
  );
}

export default Datagrid;
