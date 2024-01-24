import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


type Props={
  title:string,
  page:string
  setPage: React.Dispatch<React.SetStateAction<string>>
  
}

const style ={
  width:"100%",
  padding:".5em .5em",
  transition:"all ease-in .4s",
  cursor:"pointer",
  ":hover":{
    background:"#d9d9d9",
    opacity:"1"
  }
}


export default function MenuSettings({title,page,setPage}:Props) {
  return (
    <Box display="flex" onClick={()=>{setPage(title)}} sx={page === title?{...style,opacity:1}:{...style,opacity:".4"}}>
      <Typography variant="body1" color={page === title?"primary":"inital"} sx={{fontWeight:"500"}}>{title}</Typography>
    </Box>
  )
}
