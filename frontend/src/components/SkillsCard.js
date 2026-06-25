import React from "react";
import { Paper, Typography, Grid, Chip, Box } from "@mui/material";

const SkillsCard = ({ matchedSkills = [], missingSkills = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Skills Analysis
      </Typography>

      <Grid container spacing={4}>
        {/* Matched Skills */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Matched Skills
          </Typography>

          {matchedSkills.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {matchedSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="success"
                  variant="filled"
                />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No matched skills found.</Typography>
          )}
        </Grid>

        {/* Missing Skills */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Missing Skills
          </Typography>

          {missingSkills.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {missingSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="warning"
                  variant="outlined"
                />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No missing skills.</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SkillsCard;