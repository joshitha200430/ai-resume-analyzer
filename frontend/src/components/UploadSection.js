import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadSection = ({ setResult }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend. Make sure Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      id="upload-section"
      elevation={4}
      sx={{
        p: 5,
        borderRadius: 5,
        mb: 5,
        textAlign: "center",
        background: "linear-gradient(180deg, #ffffff, #f8fafc)",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upload Resume
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Supported formats: PDF, DOCX
      </Typography>

      <Box
        sx={{
          border: "2px dashed #94a3b8",
          borderRadius: 4,
          p: 4,
          mb: 3,
          backgroundColor: "#f8fafc",
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 50, color: "#2563eb", mb: 1 }} />

        <Typography variant="body1" mb={2}>
          Drag & drop your resume here or choose a file
        </Typography>

        <Button variant="outlined" component="label">
          Choose Resume
          <input
            hidden
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </Button>

        {selectedFile && (
          <Typography sx={{ mt: 2 }}>
            Selected File: <strong>{selectedFile.name}</strong>
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleAnalyze}
        disabled={loading}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: "bold",
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Resume"}
      </Button>
    </Paper>
  );
};

export default UploadSection;