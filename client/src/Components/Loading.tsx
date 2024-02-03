import React from 'react'
import Box from '@mui/material/Box'
import loadingGif from '../Images/Loading.gif'
export default function Loading() {
  return (
    <Box display="flex" minHeight={"700px"} justifyContent={"center"} alignItems={"center"}>
      <img src={loadingGif} width={"45px"} height={"45px"} alt="" />
    </Box>
  )
}
