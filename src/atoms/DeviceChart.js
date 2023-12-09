import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LineChart, ResponsiveContainer } from "recharts";
import { Line, XAxis, YAxis } from "recharts";

const DeviceChart = ({ levels }) => {
  const theme = useTheme();
  const currendDate = new Date();
  const currentHour = currendDate.getHours();
  const hoursLevels = levels ? Object.values(levels).slice(-24) : [];

  let data = [];

  for (let i = 0; i <= 24; i++) {
    const hour = (i + currentHour) % 24;
    const time = hour < 10 ? "0" + hour + ":00" : hour + ":00";

    data = [...data, { time, amount: hoursLevels[i] }];
  }

  return (
    <Box sx={{ p: 2, height: 200 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: -20 }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body1}
          />
          <YAxis
            allowDecimals={false}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body1}
          ></YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DeviceChart;
