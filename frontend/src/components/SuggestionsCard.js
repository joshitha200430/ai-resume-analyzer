import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const SuggestionsCard = ({ suggestions = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        AI Suggestions
      </Typography>

      {suggestions.length > 0 ? (
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemText primary={`• ${suggestion}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">No suggestions available.</Typography>
      )}
    </Paper>
  );
};

export default SuggestionsCard;