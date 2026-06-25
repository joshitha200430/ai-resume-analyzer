import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UploadSection from "../components/UploadSection";
import ATSScoreCard from "../components/ATSScoreCard";
import SkillsCard from "../components/SkillsCard";
import JobsCard from "../components/JobsCard";
import SuggestionsCard from "../components/SuggestionsCard";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <FeaturesSection />
        <UploadSection setResult={setResult} />

        {result && (
          <>
            <ATSScoreCard score={result.ats_score} />
            <SkillsCard
              matchedSkills={result.matched_skills}
              missingSkills={result.missing_skills}
            />
            <JobsCard jobs={result.job_recommendations} />
            <SuggestionsCard suggestions={result.suggestions} />
          </>
        )}

        <HowItWorks />
      </Container>

      <Footer />
    </Box>
  );
};

export default Dashboard;