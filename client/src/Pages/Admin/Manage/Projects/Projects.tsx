import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ProjectCard from '../../../../Components/ProjectCard'
import useProject from '../../../../Hooks/Firebase/useProject'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';



export default function Projects() {
  const {data:projects,loading:loadingProjects,error:errorProjects,getProjectList} = useProject();
  if(loadingProjects) return <>Loading.....</>
  if(errorProjects) return <>Error.....</>
  return (
    <Container maxWidth="lg"  sx={{padding:"3em"}}>
      <Box display="flex" mb={"2em"}>
        <Box flexGrow={1}>
          <Typography variant="h6" color="initial">Total Projects({projects?.length}) </Typography>
        </Box>
        <IconButton onClick={()=>{}}>
          <AddIcon/>
        </IconButton>
      </Box>
      <Box display="flex" flexWrap={"wrap"}>
        {projects?.map(()=>{
          <ProjectCard/>
        })}
      </Box>
    </Container>
  )
}
