import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'

import { ServiceType } from '../Hooks/Firebase/useTypes'
import useModal from '../Hooks/Firebase/useModal'
import UpdateService from '../Pages/Admin/Manage/Services/UpdateService'

import {useTransform } from 'framer-motion'
import { motion } from "framer-motion"
import useMotionScroll from '../Hooks/useMotionScroll'
type Props = {
  data:ServiceType
  id:any
  index:number
  admin?:boolean
  editFunc: (data: ServiceType, id: any) => void
  deleteFunc: (id:any)=> void
};

function ServiceCard({id,data,index,admin,editFunc,deleteFunc}:Props) {
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  const {ref,scrollYProgress} = useMotionScroll();
  const scaleProgress = useTransform(scrollYProgress,[0,1],[0.8,1])
  const opacityProgress = useTransform(scrollYProgress,[0,1],[0.6,1])

  return (
    <motion.div 
      ref={ref} 
      style={{
        scale:scaleProgress,
        opacity:opacityProgress,
        width:"100%"
      }}
      >
      <Box  display="flex"  sx={index%2==0?{width:"100%",flexDirection:{md:"row",xs:"column"} ,maxWidth:{md:"unset",xs:"100%"}}:{width:"100%",flexDirection:{md:"row-reverse",xs:"column"},maxWidth:{md:"unset",xs:"100%"}}} gap={5} alignItems={"center"} >
        <Box sx={{width:{md:"400px",xs:"100%"}}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Paper variant="elevation" className='ServiceCardImage' elevation={3}  sx={{background:"#D2D2D2",height:{md:"300px",sm:"400px", xs:"280px"},width:{md:"340px",xs:"90%"}}}>
            <Box className={"Card"} width={"100%"} height={"100%"} overflow={"hidden"} borderRadius={"5px"} display={"flex"} alignItems={"center"} sx={{position:"relative"}}>
              <img width={"100%"} src={data.imageUrl} alt="" />
              {admin?
                <Box className="EditModal" position={"absolute"} width={"100%"} height={"100%"} sx={{zIndex:"2",top:"0",left:"0",display:"none",gap:"1em",alignItems:"center",justifyContent:"center",background:"#000000db"}}>
                  <Tooltip title="Edit">
                    <IconButton onClick={()=>{setOpenModal(<UpdateService data={data} id={id} modalClose={closeModal} updateFunc={editFunc}/>)}}>
                      <EditIcon sx={{color:"white"}}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={()=>{deleteFunc(id)}}>
                      <DeleteIcon sx={{color:"white"}}/>
                    </IconButton>
                  </Tooltip>
                </Box>:""
              }
            </Box>
          </Paper>
        </Box>
        <Box flexGrow={1}  display={"block"} justifyContent={"end"} sx={{width:{md:"auto",xs:"90%"}}} >
          <Box sx={{width:{md:"auto",xs:"100%"},minWidth:"300px"}} >
            <Typography variant="h6"  color="initial">{data.title}</Typography>
            <Typography variant="body2"  mt={1} color="initial">{data.description}</Typography>
            <Typography variant="subtitle1" mt={2} fontWeight={600} color="initial">Tools</Typography>
            <Box display="flex" flexWrap={"wrap"} gap={1} mt={1}>
              {data.tools?.map((items,index) => (
                <>
                  <Chip key={index} label={items} variant="outlined" />
                </>
              ))}
            </Box>
          </Box>
        </Box>
        {ModalComponent()}
      </Box>
    </motion.div>
  )
}

export default ServiceCard