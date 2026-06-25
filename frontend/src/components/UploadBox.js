import React from "react";
import { Box, Button, Typography } from "@mui/material";

function UploadBox({ selectedFile, setSelectedFile, handleUpload, loading }) {
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "2px dashed #90caf9",
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#f9fbff",
        mb: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Resume
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Supported formats: PDF, DOCX
      </Typography>

      <Button variant="contained" component="label" sx={{ mr: 2 }}>
        Choose File
        <input
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </Button>

      {selectedFile && (
        <Typography variant="body2" mt={2}>
          Selected File: <strong>{selectedFile.name}</strong>
        </Typography>
      )}

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </Box>
    </Box>
  );
}

export default UploadBox;