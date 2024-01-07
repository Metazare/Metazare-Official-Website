import React from 'react'
import ProjectCard from './ProjectCard'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import TeamCard from './TeamCard'

function Slider() {
  return (
    <Box  position={"relative"} sx={{background:"red"}}>
      <IconButton aria-label="" onClick={()=>{}}>
        <KeyboardArrowLeftIcon/>
      </IconButton>
      <IconButton aria-label="" onClick={()=>{}}>
        <KeyboardArrowRightIcon/>
      </IconButton>
      <Box display="flex" gap={3}>
        <Box>
          <TeamCard/>
        </Box>
        <Box>
          <TeamCard/>
        </Box>
        <Box>
          <TeamCard/>
        </Box>
      </Box>
    </Box>
  )
}

export default Slider