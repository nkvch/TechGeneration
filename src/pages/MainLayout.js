import React from "react";
import { useApp } from "assets/useApp";
import { Box, AppBar, Divider, Toolbar } from "@mui/material";
import SideBar from "organisms/SideBar";

const MainLayout = ({ children, navbar }) => {
  const width = { xs: 200, sm: 150, md: 200 };
  const appbar = { sm: `calc(100% - 150px)`, md: `calc(100% - 200px)` };
  const [sidebar, setSidebar] = useApp();

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar
        sx={{
          display: { xs: "block", sm: "none" },
          width,
          "& .MuiDrawer-paper": {
            bgcolor: "secondary.dark",
            justifyContent: "space-between",
            width,
          },
        }}
        variant="temporary"
        open={sidebar}
        onClose={() => setSidebar(!sidebar)}
      />
      <SideBar
        sx={{
          display: { xs: "none", sm: "block" },
          width,
          "& .MuiDrawer-paper": {
            bgcolor: "secondary.dark",
            justifyContent: "space-between",
            width,
          },
        }}
        variant="permanent"
      />
      <AppBar
        sx={{ width: appbar, bgcolor: "secondary.light" }}
        color="inherit"
        elevation={0}
      >
        {navbar}
        <Divider />
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
