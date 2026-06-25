import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          AI Resume Analyzer
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">How It Works</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;