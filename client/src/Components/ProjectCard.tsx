import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ProjectType } from '../Hooks/Firebase/useTypes'
import dayjs from 'dayjs'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useModal from '../Hooks/Firebase/useModal'
import UpdateProject from '../Pages/Admin/Manage/Projects/UpdateProject'
import Tooltip from '@mui/material/Tooltip'


interface Props{
  data:ProjectType
  variant:string
  deleteFunc:(id: any) => void
  updateFunc:(data:any,id:any) => void
}


function ProjectCard({variant,data,deleteFunc,updateFunc}:Props) {
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  return <>
    {variant !== "admin"? <>
      <a href={data.link} style={{textDecoration:"none"}} target="_blank">
        <Box>
          <Paper className='Card' variant="elevation" elevation={1} sx={{display:"flex",alignItems:"center",width:{md:"270px",sm:"350px",xs:"100%"}, height:{md:"200px",sm:"300px",xs:"300px"},overflow:"hidden",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",position:"relative"}}> 
            <img loading='lazy' width={"100%"} height={"auto"} src={data.image} alt="" style={{zIndex:"1"}}/>
          </Paper>
          <Box mt={".5em"} padding={"0 .5em"}>
            <Typography variant="body1" color="initial" sx={{opacity:".9",width:{md:"270px",sm:"350px",xs:"100%"}}}>{data.title}</Typography>
            <Typography variant="subtitle2" color="initial" sx={{opacity:".7",fontSize:"11px"}}>{dayjs(data.date).format('MMM D, YYYY' )}</Typography>
          </Box>
        </Box>
      </a>
    </>:<>
      <Box>
        <Paper className='Card' variant="elevation" elevation={1} sx={{display:"flex",alignItems:"center",width:{md:"270px",sm:"350px",xs:"100%"}, height:{md:"200px",sm:"300px",xs:"300px"},overflow:"hidden",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",position:"relative"}}> 
          <img loading='lazy' width={"100%"} height={"auto"} src={data.image} alt="" style={{zIndex:"1"}}/>
          {variant ==="admin" &&<>
            <Box className="EditModal" position={"absolute"} width={"100%"} height={"100%"} sx={{zIndex:"2",top:"0",left:"0",display:"none",gap:"1em",alignItems:"center",justifyContent:"center",background:"#000000db"}}>
              <Tooltip title="Edit">
                <IconButton onClick={()=>{setOpenModal(<UpdateProject data={data} updateFunc={updateFunc} modalClose={closeModal}/>)}}>
                  <EditIcon sx={{color:"white"}}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={()=>{deleteFunc(data.id)}}>
                  <DeleteIcon sx={{color:"white"}}/>
                </IconButton>
              </Tooltip>
            </Box>
          </>}
        </Paper>
        <Box mt={".5em"} padding={"0 .5em"}>
          <Typography variant="body1" color="initial" sx={{opacity:".9",width:{md:"270px",sm:"350px",xs:"100%"}}}>{data.title}</Typography>
          <Typography variant="subtitle2" color="initial" sx={{opacity:".7",fontSize:"11px"}}>{dayjs(data.date).format('MMM D, YYYY' )}</Typography>
        </Box>
      </Box>
    </>}
    {ModalComponent()} 
  </>
}

export default ProjectCard