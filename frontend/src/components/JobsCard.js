import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const JobsCard = ({ jobs = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Job Recommendations
      </Typography>

      {jobs.length > 0 ? (
        <List>
          {jobs.map((job, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemText primary={`• ${job}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">No job recommendations available.</Typography>
      )}
    </Paper>
  );
};

export default JobsCard;