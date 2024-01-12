import React from 'react'
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box'
import Sidebar from '../Header/Sidebar';
import AppHeader from '../Header/AppHeader';
function AppBase() {
  return <>
    <Box display="flex">
        <Sidebar/>
      <Box flexGrow={1}>
        <AppHeader/>
        <Outlet/>
      </Box>
    </Box>
  </>
}

export default AppBase