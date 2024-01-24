import Box from '@mui/material/Box'
import NavItem from './NavItem'
import { useState } from 'react';
import Logo from '../../Images/Accent.png'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WorkIcon from '@mui/icons-material/Work';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Sidebar() {
  const [sideBar,setSideBar] = useState(false)
  return (
    <Box sx={{width:"250px",background:"white",boxShadow:"0 0 15px rgba(0,0,0,.4)",minHeight:"100vh",flexDirection:"column",display: { md: "flex", xs: sideBar ? "block" : "none" }}}>
      <Box display="flex" justifyContent={"center"} sx={{padding:"2em 0 3em"}}>
        <img  width={"90%"} src={Logo} alt="logo"  loading='lazy'/>
      </Box>
      <NavItem type='title' icon={<SpaceDashboardIcon/>} title='Dashboard' link='admin/'/>
      <NavItem type='title' icon={<FolderCopyIcon/>} title='Contents' link='admin/contents'/>
      <NavItem type='title' icon={<WorkIcon/>} title='Services' link='admin/services'/>
      <NavItem type='title' icon={<Inventory2Icon/>} title='Projects' link='admin/projects'/>
      <NavItem type='title' icon={<PeopleAltIcon/>} title='Our Team' link='admin/team'/>
    </Box>
  )
}

export default Sidebar