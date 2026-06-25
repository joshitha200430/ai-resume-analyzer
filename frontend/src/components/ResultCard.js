import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Analysis Result
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box mb={3}>
          <Typography variant="h6">ATS Score</Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {result.ats_score}%
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Matched Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {result.matched_skills?.length > 0 ? (
              result.matched_skills.map((skill, index) => (
                <Chip key={index} label={skill} color="success" />
              ))
            ) : (
              <Typography>No matched skills found.</Typography>
            )}
          </Stack>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Missing Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {result.missing_skills?.length > 0 ? (
              result.missing_skills.map((skill, index) => (
                <Chip key={index} label={skill} color="warning" />
              ))
            ) : (
              <Typography>No missing skills detected.</Typography>
            )}
          </Stack>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Job Recommendations
          </Typography>
          {result.job_recommendations?.length > 0 ? (
            result.job_recommendations.map((job, index) => (
              <Typography key={index}>• {job}</Typography>
            ))
          ) : (
            <Typography>No recommendations available.</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            AI Suggestions
          </Typography>
          {result.suggestions?.length > 0 ? (
            result.suggestions.map((tip, index) => (
              <Typography key={index}>• {tip}</Typography>
            ))
          ) : (
            <Typography>No suggestions available.</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ResultCard;