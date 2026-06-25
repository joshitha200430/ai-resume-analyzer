import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const steps = [
  {
    step: "1",
    title: "Upload Resume",
    desc: "Upload your PDF or DOCX resume securely to the analyzer.",
  },
  {
    step: "2",
    title: "AI Analysis",
    desc: "The backend extracts resume text, detects skills, and computes ATS insights.",
  },
  {
    step: "3",
    title: "Get Results",
    desc: "See ATS score, matched skills, missing skills, job roles, and improvement suggestions.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        How It Works
      </Typography>

      <Grid container spacing={3}>
        {steps.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                {item.step}
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>
              <Typography color="text.secondary">{item.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;