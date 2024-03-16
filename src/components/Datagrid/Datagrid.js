import React from "react";
import "./Datagrid.css";
import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";

const rows = [
  { id: 1, col1: "Carmona, Cavite", col2: "Jan 28, 2024", col3: "Potable" },
  { id: 2, col1: "Cabuyao, Laguna", col2: "Dec 25, 2024", col3: "Not Potable" },
  {
    id: 3,
    col1: "Sta. Rosa, Laguna",
    col2: "Dec 25, 2024",
    col3: "Not Potable",
  },
];

const columns = [
  {
    field: "col1",
    headerName: "PLACE",
    width: 250,
  },
  {
    field: "col2",
    headerName: "DATE",
    width: 250,
  },
  {
    field: "col3",
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

function Datagrid() {
  return (
    <div style={{ height: "85vh", width: 900 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }}
      />
    </div>
  );
}

export default Datagrid;
