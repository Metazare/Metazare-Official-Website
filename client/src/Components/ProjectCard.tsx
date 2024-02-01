import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ProjectType } from '../Hooks/Firebase/useTypes'
import dayjs from 'dayjs'
interface Props{
  data:ProjectType
}

function ProjectCard({data}:Props) {
  return <>
    <Box sx={{cursor:"pointer"}}>
      <Paper variant="elevation" elevation={1} sx={{width:{md:"270px",sm:"350px",xs:"100%"}, height:{md:"200px",sm:"300px",xs:"300px"},overflow:"hidden",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}> 
        <img  width={"100%"} height={"auto"} src={data.image} alt="" />
      </Paper>
      <Box mt={".5em"} padding={"0 .5em"}>
        <Typography variant="body1" color="initial" sx={{opacity:".9"}}>{data.title}</Typography>
        <Typography variant="subtitle2" color="initial" sx={{opacity:".7",fontSize:"11px"}}>{dayjs(data.createdAt).format('MMM D, YYYY h:mm A'  )}</Typography>
      </Box>
    </Box>
  </>
}

export default ProjectCard