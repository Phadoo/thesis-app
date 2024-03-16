import { Box, Typography } from "@mui/material";

const DetailBox = ({ title, description }) => {
  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h1" fontWeight="bold" fontSize="15px" style={{ textDecoration: 'underline' }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h1" fontSize="15px">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailBox;
