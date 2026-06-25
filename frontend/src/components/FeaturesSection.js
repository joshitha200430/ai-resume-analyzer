import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const features = [
  {
    title: "ATS Score",
    description:
      "Measure how well your resume aligns with modern Applicant Tracking Systems.",
    icon: <InsightsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    title: "Skill Analysis",
    description:
      "Identify matched skills, missing technologies, and resume improvement areas.",
    icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    title: "Job Recommendations",
    description:
      "Get role suggestions based on the technologies and experience found in your resume.",
    icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Features
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box mb={2}>{feature.icon}</Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;