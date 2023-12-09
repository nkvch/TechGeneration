import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

const DeviceChart = ({ temperature, humidity, brightness, startBreak }) => {
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const apiKey = "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";

  const requestData = {
    prompt: `Based on the temperature of ${temperature}°C, humidity of ${humidity}%, and light level of ${brightness}%,generate short report, 180 chars long max about working environment space from given data and output report about how good or how bad is this environment and what should be improved to work better.`,
    max_tokens: 200,
    n: 1,
  };

  const [report, setReport] = useState("");

  const generateReport = async () => {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setReport(data.choices[0].text.trim());
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
        AI Report
      </Typography>
      <Button size="small" onClick={generateReport} variant="outlined">
        Generate
      </Button>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {report}
      </Typography>
    </Box>
  );
};

export default DeviceChart;
