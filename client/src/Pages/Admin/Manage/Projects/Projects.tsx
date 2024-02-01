import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ProjectCard from '../../../../Components/ProjectCard'
import useProject from '../../../../Hooks/Firebase/useProject'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import useModal from '../../../../Hooks/Firebase/useModal'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AddProjects from './AddProjects'
import { ProjectType } from '../../../../Hooks/Firebase/useTypes'
import Button from '@mui/material/Button'



export default function Projects() {
  const {data:projects,loading:loadingProjects,error:errorProjects,postProject} = useProject();
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  const [tabValue, setTabValue] = React.useState('Mobile Application');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  if(loadingProjects) return <>Loading.....</>
  if(errorProjects) return <>Error.....</>
  return <>
  <Box  width={"100%"} sx={{padding:{md:".5em 1.5em 1.5em",xs:"1.8em 2.5em 1.5em"}}}>
    <Box display="flex" sx={{borderBottom: 1, borderColor: 'divider' }} >
      <Box sx={{flexGrow:"1", width: '100%'}}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab value="Mobile Application" label="Mobile Application" />
          <Tab value="Web Application" label="Web Application" />
          <Tab value="Games" label="Games" />
          <Tab value="UI/UX Design" label="UI/UX Design" />
          <Tab value="Logo Design" label="Logo Design" />
        </Tabs>
      </Box>
      <IconButton onClick={()=>{setOpenModal(<AddProjects modalClose={closeModal} addFunc={postProject}/>)}}>
        <AddIcon/>
      </IconButton>
    </Box>
  </Box>
  <Container maxWidth="lg"  sx={{padding:"2em"}}>
    <Box display="flex" flexWrap="wrap" gap={2}>
      {tabValue === "Mobile Application" && projects?.filter((project:any) => project.type === "Mobile Application").map((project:any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
      {tabValue === "Web Application" && projects?.filter((project:any) => project.type === "Web Application").map((project:any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
      {tabValue === "Games" && projects?.filter((project:any) => project.type === "Games").map((project:any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
      {tabValue === "UI/UX Design" && projects?.filter((project:any) => project.type === "UI/UX Design").map((project:any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
      {tabValue === "Logo Design" && projects?.filter((project:any) => project.type === "UI/UX Design").map((project:any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
      
    </Box>
    {ModalComponent()} 
  </Container>
  </>
  
}
