import "./Datagrid.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import DetailDialog from "../DetailDialog/DetailDialog";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function Datagrid({ onRowSelection }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogParams, setDialogParams] = useState(null);

  const determinePotability = (status) => {
    if (!status) {
      return ""; // Return an empty string if status is empty or null
    }
    if (status === "No Bacteria Presence") {
      return "Yes";
    }
    return "No";
  };

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
        // Modify the data to include the potable field
        const modifiedData = response.data.map((row) => ({
          ...row,
          potable: determinePotability(row.status),
        }));
        setData(modifiedData);
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

  const getInterpretation = (status, row) => {
    const { temperature, tds, turbidity, ph, chlorine, nitrate, zinc } = row;
    let interpretation = `The status indicates ${status}.`;
    if (status === "No Bacteria Presence") {
      if (temperature < 10 || temperature > 22) {
        interpretation += " Temperature level indicates non-potability.";
      }
      if (tds >= 300) {
        interpretation += " High TDS indicates non-potability.";
      }
      if (turbidity > 5) {
        interpretation += " High turbidity indicates non-potability.";
      }
      if (ph < 6.5 || ph > 8.5) {
        interpretation += " pH level indicates non-potability.";
      }
      if (chlorine > 4) {
        interpretation += " Chlorine content indicates non-potability.";
      }
      if (nitrate > 10) {
        interpretation += " Nitrate content indicates non-potability.";
      }
      if (zinc > 5) {
        interpretation += " Zinc content indicates non-potability.";
      }
      interpretation +=
        " Although the model predicted that there are no bacteria present. Attributes may suggest that the sample is not potable.";
    }
    if (
      status === "Significant Bacteria Presence" ||
      status === "Minimal Bacteria Presence"
    ) {
      if (temperature < 10 || temperature > 22) {
        interpretation += " Temperature level indicates non-potability.";
      }
      if (tds >= 300) {
        interpretation += " High TDS indicates non-potability.";
      }
      if (turbidity > 5) {
        interpretation += " High turbidity indicates non-potability.";
      }
      if (ph < 6.5 || ph > 8.5) {
        interpretation += " pH level indicates non-potability.";
      }
      if (chlorine > 4) {
        interpretation += " Chlorine content indicates non-potability.";
      }
      if (nitrate > 10) {
        interpretation += " Nitrate content indicates non-potability.";
      }
      if (zinc > 5) {
        interpretation += " Zinc content indicates non-potability.";
      }
    }
    return interpretation;
  };

  const rows = data;

  const columns = [
    {
      field: "location",
      headerName: "PLACE",
      width: 250,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 280,
      renderCell: (params) => (
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Interpretation:</Typography>
              {getInterpretation(params.value, params.row)}
            </React.Fragment>
          }
          followCursor
        >
          <span>{params.value}</span>
        </HtmlTooltip>
      ),
    },
    {
      field: "potable",
      headerName: "POTABLE?",
      width: 180,
    },
    {
      field: "actions",
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
