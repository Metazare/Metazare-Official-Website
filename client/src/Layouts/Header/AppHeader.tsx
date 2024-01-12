import { useState } from "react"
import { useAuth } from "../../Hooks/useAuth"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function AppHeader() {
  const{user,signout} = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" sx={{padding:"1em"}}>
      <Box flexGrow={1}>
        
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
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