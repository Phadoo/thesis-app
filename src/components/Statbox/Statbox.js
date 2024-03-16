import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, unit }) => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="40px"
      >
        <Box>
          <Typography variant="h1" fontSize="40px">
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography fontWeight="lighter" fontSize="15px">
          {unit}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
