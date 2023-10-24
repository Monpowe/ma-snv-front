
import React from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "./global/Navbar";
import Sidebar from './global/Sidebar';

const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <Box display={isNonMobile ? "flex":"block"} width="100%" height="100%">
      <Sidebar 
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
      />
      <Box width="100%">
        <Navbar 
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
    
  )
}

export default Layout