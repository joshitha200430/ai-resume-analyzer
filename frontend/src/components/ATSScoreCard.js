import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const ATSScoreCard = ({ score }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        ATS Score
      </Typography>

      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "20px auto 0",
          boxShadow: 3,
        }}
      >
        {score}%
      </Box>
    </Paper>
  );
};

export default ATSScoreCard;