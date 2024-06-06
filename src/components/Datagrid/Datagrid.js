import "./Datagrid.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import DetailDialog from "../DetailDialog/DetailDialog";

function Datagrid({ onRowSelection }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogParams, setDialogParams] = useState(null);

  const handleClickOpen = (params, row) => {
    const { chlorine, nitrate, zinc } = row;
    setDialogParams({ ...params, chlorine, nitrate, zinc });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogParams(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_all_data");
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

  const handleRowClick = (params) => {
    console.log("Row clicked:", params.row);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);

    if (onRowSelection) {
      const selectedRow =
        newSelection.length > 0
          ? rows.find((row) => row.id === newSelection[0])
          : null;
      onRowSelection(selectedRow);
    }

    console.log(newSelection);
  };

  const rows = data;

  const columns = [
    {
      field: "location",
      headerName: "PLACE",
      width: 380,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 330,
    },
    {
      field: "col4",
      headerName: "ACTIONS",
      width: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Button
            variant="outlined"
            size="small"
            style={{ color: "black", borderColor: "black" }}
            onClick={() => handleClickOpen(params, row)}
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
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        onRowSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }}
      />
      <DetailDialog open={open} onClose={handleClose} params={dialogParams} />
    </div>
  );
}

export default Datagrid;
