import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const HeroSection = () => {
  const handleScroll = () => {
    const section = document.getElementById("upload-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
        color: "white",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Upgrade Your Resume with AI
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
          Get ATS score, matched skills, missing skills, job recommendations,
          and smart suggestions instantly.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleScroll}
          sx={{
            backgroundColor: "white",
            color: "#1d4ed8",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;