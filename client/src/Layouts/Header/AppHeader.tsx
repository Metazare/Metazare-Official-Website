import { useState } from "react"
import { useAuth } from "../../Hooks/useAuth"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container'


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
    <Box display="flex" sx={{padding:{md:"1.8em 1.5em 1.5em",xs:"1.8em 2.5em 1.5em"}}}>
      <Box flexGrow={1} >
        <Typography variant="h6" color="primary">Projects</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
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