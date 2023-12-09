import React from "react";
import { useApp } from "assets/useApp";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { format } from "date-fns";
import MainLayout from "pages/MainLayout";
import DeviceCard from "molecules/DeviceCard";

const BoardView = ({ devices }) => {
  const [sidebar, setSidebar] = useApp();

  return (
    <MainLayout
      navbar={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: { xs: 1.2, sm: 2.2 },
          }}
        >
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" }, mr: 2 }}
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            Data: {format(new Date(), "do MMMM Y")}
          </Typography>
        </Box>
      }
    >
      <Grid sx={{ p: 2 }} container spacing={2}>
        {devices &&
          devices.map((device) => (
            <Grid item xs={12} key={device.name}>
              <DeviceCard device={device} />
            </Grid>
          ))}
      </Grid>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  devices: state.firestore.ordered.devices,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(["devices"])
)(BoardView);
