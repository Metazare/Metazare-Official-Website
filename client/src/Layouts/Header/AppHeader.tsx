import { useAuth } from "../../Hooks/useAuth"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


function AppHeader() {
  const{user,signout} = useAuth();
  return (
    <Box display="flex" sx={{padding:"1em"}}>
      <Box flexGrow={1}>
        
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {user?.email}
        <Button variant="text" color="primary" onClick={signout}>
          Signout
        </Button>
      </Box>
    </Box>
  )
}

export default AppHeader