import React from "react";
import { connect } from "react-redux";
import { signoutUser } from "store/usersActions";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, Avatar, List, ListItem, Typography } from "@mui/material";
import { ListItemText, ListItemAvatar } from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import CreateDialog from "molecules/CreateDialog";

const SideBar = ({ signoutUser, auth, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer {...props}>
      <List>
        <ListItem sx={{ mb: 12 }}>
          <Typography variant="h5">Productivity Manager</Typography>
        </ListItem>
        <ListItem
          sx={{ textTransform: "uppercase" }}
          selected={location.pathname === "/board"}
          onClick={() => navigate("/board")}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <Dashboard />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="Productivity Cubes" />
        </ListItem>
        <CreateDialog />
      </List>
      <List>
        <ListItem
          sx={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
          onClick={signoutUser}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <Logout />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToPorps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToPorps)(SideBar);
