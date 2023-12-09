import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

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

  useEffect(() => {
    fetch(apiUrl, {
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
  }, [startBreak]);

  return (
    <Typography variant="subtitle1" sx={{ my: 2 }}>
      <Box as="span" sx={{ fontWeight: 600 }}>
        AI Report:
      </Box>{" "}
      {report}
    </Typography>
  );
};

export default DeviceChart;
