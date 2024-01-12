import Box from '@mui/material/Box'
import NavItem from './NavItem'
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useState } from 'react';

function Sidebar() {
  const [sideBar,setSideBar] = useState(true)
  return (
    <Box sx={{width:"300px",background:"white",boxShadow:"0 0 15px rgba(0,0,0,.4)",minHeight:"100vh",flexDirection:"column",display: { md: "flex", xs: sideBar ? "block" : "none" }}}>
      <NavItem type='title' icon={<RoomServiceIcon/>} title='Services' link='admin/services'/>
    </Box>
  )
}

export default Sidebar