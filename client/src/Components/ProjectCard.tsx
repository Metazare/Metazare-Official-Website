import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


function ProjectCard() {
  return <>
    <Box>
      <Paper variant="elevation" elevation={1} sx={{width:"350px",height:"300px",borderRadius:"8px",overflow:"hidden"}}> 
        <img height={"100%"} src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp" alt="" />
      </Paper>
      <Box mt={2} padding={"0 .5em"}>
        <Typography variant="body1" color="initial">iCertify Website</Typography>
      </Box>
    </Box>
  </>
}

export default ProjectCard