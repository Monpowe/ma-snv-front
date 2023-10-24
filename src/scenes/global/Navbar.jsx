

import { Menu as MenuIcon, Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, InputBase } from '@mui/material'
import FlexBetween from '../../components/FlexBetween';
import React from 'react';
import { useTheme } from '@emotion/react'

const Navbar = ({setIsSidebarOpen, isSidebarOpen}) => {
    console.log(isSidebarOpen);

    const theme = useTheme();
  return (
    <AppBar
        sx={{
            position:"static",
            background:theme.palette.primary.main,
            boxShadow:"none"
        }}
    >
        <Toolbar sx={{justifyContent:"space-between", color:'blue'}}>
            <FlexBetween gap="1em">
                <IconButton onClick={()=>setIsSidebarOpen((isOpen)=>!isOpen)}>
                    <MenuIcon sx={{fontSize:'25px', color:'white'}}/>
                </IconButton>
                <FlexBetween sx={{background:'white',padding:'0.1rem 0.5rem 0.1rem 1rem',borderRadius:'0.3rem'}}>
                    <InputBase placeholder="Search..." />
                    <IconButton onClick={()=>console.log('Search')}>
                        <SearchIcon/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween>
            <   IconButton onClick={()=>console.log('Search')}>
                    <PersonIcon sx={{color:'white'}} />
                </IconButton>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar