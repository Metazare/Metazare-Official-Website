import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import {useFormik } from 'formik'
import { ProjectType } from '../../../../Hooks/Firebase/useTypes'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFirebase from '../../../../Hooks/useFirebase'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LensIcon from '@mui/icons-material/Lens';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs  from 'dayjs';
import ProjectCard from '../../../../Components/ProjectCard'

type Props={
  data:any
  modalClose:() => void
  updateFunc: (data: ProjectType,id:any) => void
}
function UpdateProject({modalClose,updateFunc,data}:Props) {
  const {downloadURL,uploadFile} =useFirebase();

  const [uploadFileValue,setUploadFileValue] = useState<any>();

  useEffect(()=>{
    if(downloadURL){
      updateFunc({...UpdateProjectForm.values,image:downloadURL},data.id);
    }
  },[downloadURL])
  const [formPage,setFormPage] = useState(1)
  const FormButton = ({ num , toolTip}: { num: number,toolTip:string}) => {
    return (
      <Tooltip title={toolTip}>
        <IconButton sx={formPage === num ? { opacity: "1" } : { opacity: ".5" }} >
          {formPage === num ?
            <RadioButtonCheckedIcon color='primary'/>
          : 
            formPage < num ? 
            <RadioButtonUncheckedIcon/> :
            <LensIcon sx={{scale:".7"}}/> 
          }
        </IconButton>
      </Tooltip> 
    );
  };
  const UpdateProjectForm = useFormik({
    initialValues:{
      date:data.description,
      description:data.description,
      title:data.title,
      image:data.image,
      id:data.id,
      type: data.type,
      createdAt:data.createdAt,
    },
    onSubmit:(values:ProjectType) =>{
      switch (formPage) {
        case 1:
          setFormPage(2)
          break;
        case 2:
          setFormPage(3)
          break;
        case 3:
          if(uploadFileValue){
            uploadFile(uploadFileValue,"Project");
          }else{
            updateFunc(values,data.id)
            modalClose();
          }
          break;
        default:
          break;
      }
      
    }
  })

  return (
    <Box sx={{minWidth:{md:"500px",xs:"300px"}}}>
      <Typography variant="h5" fontWeight={600} color="primary">Add Services</Typography>
      <Box display="flex" alignItems={"center"} margin={".5em 0 1em"}>
        <FormButton num={1} toolTip={"Basic Information"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={2} toolTip={"Image Upload"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={3} toolTip={"Preview"}/>
      </Box>
      <form onSubmit={(e)=>{e.preventDefault(); UpdateProjectForm.handleSubmit()}} >
        {formPage === 1 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
          <TextField
            fullWidth
            id="title"
            name='title'
            value={UpdateProjectForm.values.title}
            onChange={UpdateProjectForm.handleChange}
            error={UpdateProjectForm.touched.title && UpdateProjectForm.errors.title !== undefined}
            helperText={UpdateProjectForm.touched.title && UpdateProjectForm.errors.title}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Description</Typography>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            id="description"
            name='description'
            value={UpdateProjectForm.values.description}
            onChange={UpdateProjectForm.handleChange}
            error={UpdateProjectForm.touched.description && UpdateProjectForm.errors.description !== undefined}
            helperText={UpdateProjectForm.touched.description && UpdateProjectForm.errors.description}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                value={dayjs(data.date)}
                onChange={(newValue) => {
                  UpdateProjectForm.setFieldValue("date",dayjs(newValue).valueOf());
                  console.log(dayjs(newValue).valueOf())
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </>}
        {formPage === 2 && <>
          <label htmlFor="image">
            <Box display="flex" flexDirection={"column"}  height={"300px"} justifyContent={"center"} alignItems={"center"} sx={{padding:"1em",border:"1px dashed #1976d2",borderRadius:"8px",gap:".5em",cursor:"pointer",transition:"all .3s ease-in",opacity:".6",":hover":{opacity:"1"}}}>
              {uploadFileValue? 
                <> 
                  <Box display="flex" width={"80%"} height={"300px"} sx={{overflow:"hidden", borderRadius:"8px"}} justifyContent={"center"} alignItems={"start"}>
                    <img width={"400px"} src={URL.createObjectURL(uploadFileValue)} alt="" />
                  </Box>
                  <Typography variant="subtitle2" textAlign={"center"} fontSize={"10px"} color="initial">Click again if you want to change</Typography>
                </>:<>
                  <Box display="flex" width={"80%"} height={"300px"} sx={{overflow:"hidden", borderRadius:"8px"}} justifyContent={"center"} alignItems={"start"}>
                    <img width={"400px"} src={data.image} alt="" />
                  </Box>
                  <Typography variant="subtitle2" textAlign={"center"} fontSize={"10px"} color="initial">Click again if you want to change</Typography>
                </>}
            </Box>            
          </label>
          <Typography variant="subtitle2" color="error" textAlign={"center"} mt={".8em"}>{UpdateProjectForm.touched.image && UpdateProjectForm.errors.image !== undefined && UpdateProjectForm.touched.image && UpdateProjectForm.errors.image}</Typography>
          <TextField
            name="image"
            id='image'
            fullWidth
            type='file'
            onChange={async(e:any)=>{
              setUploadFileValue(e.target.files[0])
            }}
            inputProps={{
              accept: '.jpg, .png',
            }}
            sx={{display:"none"}}
          />
        </>}
        {formPage === 3 &&<>
        <Box display="flex" justifyContent={"center"} sx={{padding:"2em 0"}}>
          <ProjectCard variant='view' data={{...UpdateProjectForm.values,image:uploadFileValue? URL.createObjectURL(uploadFileValue) :data.image}} deleteFunc={()=>{}} updateFunc={()=>{}}/>
        </Box>
        </>}


        <Grid container spacing={2} mt={1}>
          <Grid item xs={5}>
            <Button fullWidth variant="contained" color="primary"  sx={{marginTop:"1.5em"}} onClick={()=>{modalClose()}}>
              cancel
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button fullWidth variant="contained" color="primary"  sx={{marginTop:"1.5em"}} type='submit'>
              {formPage !== 3? "Next":"Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    // <Box sx={{width:{md:"500px",sm:"400px",xs:"300px"}}}>
    //   <Typography variant="h5" fontWeight={600} color="primary">Update Projects</Typography>
    //   <form onSubmit={(e)=>{e.preventDefault(); UpdateProject.handleSubmit()}}>
    //     <Grid container spacing={1} mt={"10px"}>
    //       <Grid item xs={12}>
    //         <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
    //         <TextField
    //           fullWidth
    //           id="title"
    //           name='title'
    //           value={UpdateProject.values.title}
    //           onChange={UpdateProject.handleChange}
    //         />
    //       </Grid>
    //       <Grid item md={6} xs={12} >
    //         <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Image</Typography>
    //         <TextField
    //           fullWidth
    //           type='file'
    //           onChange={async(e:any)=>{
    //             setUploadFileValue(e.target.files[0]);
    //             // UpdateProject.setFieldValue('imageUrl', uploadFile(e.target.files[0], 'services'));
    //           }}
    //           inputProps={{
    //             accept: '.jpg',
    //           }}
    //         />
    //       </Grid>
    //       <Grid item md={6} xs={12}>
    //         <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Type</Typography>
    //         <FormControl fullWidth>
    //           <Select
    //             id="type"
    //             name='type'
    //             value={UpdateProject.values.type}
    //             onChange={UpdateProject.handleChange}
    //           >
    //             <MenuItem value={"Mobile Application"}>Mobile Application</MenuItem>
    //             <MenuItem value={"Web Application"}>Web Application</MenuItem>
    //             <MenuItem value={"Games"}>Games</MenuItem>
    //             <MenuItem value={"UI/UX Design"}>UI/UX Design</MenuItem>
    //             <MenuItem value={"Logo Design"}>Logo Design</MenuItem>
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //       <Grid xs={12} mb={"40px"}>
    //       </Grid>
          
    //       <Grid item xs={5}>
    //         <Button variant="contained" color="primary" onClick={()=>{modalClose()}} fullWidth>
    //           Close
    //         </Button>
    //       </Grid>
    //       <Grid item xs={7}>
    //         <Button variant="contained" color="primary" onClick={()=>{
    //           if(uploadFileValue){
    //             uploadFile(uploadFileValue,"Project");
    //           }else{
    //             UpdateProject.handleSubmit();
    //           }
    //         }} fullWidth>
    //           Update
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Box>
  )
}

export default UpdateProject