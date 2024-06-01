import React, { useState, useEffect, useMemo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { removeDevice, removeData } from "store/devicesActions";
import { firebaseConnect } from "react-redux-firebase";
import { Typography, LinearProgress, Avatar, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import { Box, Card, CardHeader, CardContent } from "@mui/material";
import { ViewInAr, MoreVert, Delete, Refresh } from "@mui/icons-material";
import DeviceChart from "atoms/DeviceChart";
import AiReport from "atoms/AiReport";

const DeviceCard = ({ removeDevice, removeData, device, controller }) => {
  const [options, setOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOptions(!options);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOptions(false);
  };

  const [workSeconds, setWorkSeconds] = useState(
    controller &&
      Math.floor((new Date().getTime() - controller.StartWork) / 1000)
  );
  const [breakSeconds, setBreakSeconds] = useState(
    controller &&
      Math.floor((new Date().getTime() - controller.StartBreak) / 1000)
  );

  const workSecondsPercents = useMemo(() => {
    return Math.floor((workSeconds / 30) * 100) <= 100
      ? Math.floor((workSeconds / 30) * 100)
      : 100
  }, [workSeconds]);

  const breakSecondsPercents = useMemo(() => {
    return Math.floor((breakSeconds / 10) * 100) <= 100
      ? Math.floor((breakSeconds / 10) * 100)
      : 100;
  }, [breakSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkSeconds(
        controller &&
          Math.floor((new Date().getTime() - controller.StartWork) / 1000)
      );
      setBreakSeconds(
        controller &&
          Math.floor((new Date().getTime() - controller.StartBreak) / 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [controller]);

  const ifWork = controller && controller.StartWork > controller.StartBreak;

  console.log('%persents', workSecondsPercents, breakSecondsPercents);

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }} variant="outlined">
      <CardHeader
        title={
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
              Cube: {device.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
              Description: {device.description}
            </Typography>
          </>
        }
        subheader={
          <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>Key: {device.key}</Typography>
        }
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <ViewInAr />
          </Avatar>
        }
        action={
          <>
            <Tooltip title="Options">
              <IconButton onClick={handleOptionsClick} size="small">
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              open={options}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => removeDevice(device.id)}>
                <Tooltip title="Delete Device">
                  <Delete color="error" />
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={() => removeData(device.key)}>
                <Tooltip title="Reset Data">
                  <Refresh />
                </Tooltip>
              </MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        {controller && (
          <>
            {ifWork ? (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
                  Work Time: {workSeconds} minutes
                </Typography>
                <LinearProgress
                  color="primary"
                  sx={{ mt: 2, height: 15, borderRadius: 15 }}
                  variant="determinate"
                  value={workSecondsPercents ?? 0}
                />
              </>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: "success.main" }}>
                  Break Time: {breakSeconds} minutes
                </Typography>
                <LinearProgress
                  color="success"
                  sx={{ mt: 2, height: 15, borderRadius: 15 }}
                  variant="determinate"
                  value={breakSecondsPercents ?? 0}
                />
              </>
            )}
            <AiReport
              temperature={controller.Temperature}
              humidity={controller.Humidity}
              brightness={controller.Brightness}
              startBreak={controller.StartBreak}
            />
            <Card variant="outlined" sx={{ width: "100%", py: 1, mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mx: 1, color: "text.secondary" }}>
                Work Quality Level:{" "}
                {controller.Levels ? Object.values(controller.Levels).pop() : 0}{" "}
                \ 5
              </Typography>
            </Card>
            <Box sx={{ my: 2, display: "flex", gap: 1 }}>
              <Card variant="outlined" sx={{ p: 1, width: "100%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Actually Temperature: {controller.Temperature.toFixed(2) ?? 0}
                  °C
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 1, width: "100%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Actually Humidity: {controller.Humidity.toFixed(2) ?? 0}%
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 1, width: "100%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Actually Brightness: {controller.Brightness.toFixed(2) ?? 0}%
                </Typography>
              </Card>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
              Work quality in hours:
            </Typography>
            <DeviceChart levels={controller.Levels} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state, props) => {
  console.log(state.firebase.data);
  const controller = state.firebase.data[props.device.key];
  console.log(controller);
  return {
    controller,
  };
};
const mapDispatchToProps = (dispatch) => ({
  removeDevice: (id) => dispatch(removeDevice(id)),
  removeData: (key) => dispatch(removeData(key)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => [props.device.key])
)(DeviceCard);