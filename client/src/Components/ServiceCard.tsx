import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'



type Props = {
  title: string;
  description?: string;
  tools?: string[]; 
  key:string
  index:any
  imageUrl:string
};

function ServiceCard({title,description,tools,key,index,imageUrl}:Props) {
  
  return (
    <Box  key={key} display="flex"  sx={index%2==0?{width:"100%",flexDirection:{md:"row",xs:"column"} ,maxWidth:{md:"unset",xs:"450px"}}:{flexDirection:{md:"row-reverse",xs:"column"},maxWidth:{md:"unset",xs:"450px"}}} gap={5} alignItems={"center"} justifyContent={"center"}>
      <Box sx={{width:{md:"400px",xs:"100%"}}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Paper variant="elevation" className='ServiceCardImage' elevation={3}  sx={{background:"#D2D2D2",height:{md:"300px",xs:"400px"},width:{md:"340px",xs:"90%"}}}>
          <Box width={"100%"} height={"100%"} overflow={"hidden"} borderRadius={"5px"}>
            <img width={"100%"} src={imageUrl} alt="" />
          </Box>
        </Paper>
      </Box>
      <Box flexGrow={1}  display={"flex"} justifyContent={"end"}  >
        <Box sx={{width:{md:"700px",xs:"unset"}}} >
          <Typography variant="h6"  color="initial">{title}</Typography>
          <Typography variant="body2"  mt={2} color="initial">{description}</Typography>
          <Typography variant="subtitle1" mt={2} fontWeight={600} color="initial">Tools</Typography>
          <Box display="flex" flexWrap={"wrap"} gap={1} mt={1}>
            {tools?.map((items,index) => (
              <>
                <Chip key={index} label={items} variant="outlined" />
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ServiceCard