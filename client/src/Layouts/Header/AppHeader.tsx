import { useState } from "react"
import { useAuth } from "../../Hooks/useAuth"
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router-dom';



function AppHeader() {
  const{user,signout} = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment !== '');

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" sx={{padding:{md:"1.8em 1.5em 1.5em",xs:"1.8em 2.5em 1.5em"}}}>
      <Box flexGrow={1} >
        <Typography variant="h6" color="primary" sx={{textTransform:"uppercase",fontWeight:"700"}}>{pathSegments[pathSegments.length - 1]}</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          {pathSegments.map((segment, index) => {
            return <Typography variant="body1" color="initial" sx={{opacity:".5","::first-letter":{textTransform:"uppercase"}}}>{segment}</Typography>
          })}
        </Breadcrumbs>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Typography variant="body1" sx={{opacity:".8",gap:"5px"}} color="initial">{user.displayName}</Typography>
        <Box >
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={signout}>Sign out</MenuItem>
          </Menu>
        </Box>
        <IconButton onClick={handleClick}>
          <Avatar variant="circular" src="" alt="" sx={{width:'35px', height:'35px'}}/>
        </IconButton>
      </Box>
    </Box>
  )
}

export default AppHeader