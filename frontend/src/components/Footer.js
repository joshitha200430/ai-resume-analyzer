import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8,
        py: 3,
        textAlign: "center",
        backgroundColor: "#0f172a",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © 2026 AI Resume Analyzer • Built with React + Flask
      </Typography>
    </Box>
  );
};

export default Footer;