import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import {useFormik } from 'formik'
import { ProjectType } from '../../../../Hooks/Firebase/useTypes'
import Button from '@mui/material/Button'

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
  modalClose:() => void
  addFunc: (data: ProjectType) => void
}
function AddProjects({modalClose,addFunc}:Props) {
  const {downloadURL,uploadFile} =useFirebase();
  const [uploadFileValue,setUploadFileValue] = useState<any>();

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
  useEffect(()=>{
    if(downloadURL){
      addFunc({...AddProjectForm.values,image:downloadURL})
      modalClose();
    }
  },[downloadURL])

  const AddProjectForm = useFormik({
    initialValues:{
      title:"",
      date: dayjs(dayjs()).valueOf(),
      description:"",
      image:"",
      id:"",
      type: "Mobile Application",
      createdAt: new Date().getTime(),
    },
    validate: (values) => {
      let errors: { [key: string]: string } = {};
    
      switch (formPage) {
        case 1:
          if (!values.title) {
            errors = { ...errors, title: "Title is required" };
            errors = { ...errors, description: "description is required" };
            errors = { ...errors, date: "date is required" };
          }
          break;
        case 2:
          if (!uploadFileValue) {
            errors = { ...errors, image: "You need to upload image first" };
          }
          break;
        default:
          break;
      }
      return errors;
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
          uploadFile(uploadFileValue,"Project");
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
      <form onSubmit={(e)=>{e.preventDefault(); AddProjectForm.handleSubmit()}} >
        {formPage === 1 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
          <TextField
            fullWidth
            id="title"
            name='title'
            value={AddProjectForm.values.title}
            onChange={AddProjectForm.handleChange}
            error={AddProjectForm.touched.title && AddProjectForm.errors.title !== undefined}
            helperText={AddProjectForm.touched.title && AddProjectForm.errors.title}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Description</Typography>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            id="description"
            name='description'
            value={AddProjectForm.values.description}
            onChange={AddProjectForm.handleChange}
            error={AddProjectForm.touched.description && AddProjectForm.errors.description !== undefined}
            helperText={AddProjectForm.touched.description && AddProjectForm.errors.description}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                value={dayjs(AddProjectForm.values.date)}
                onChange={(newValue) => {
                  AddProjectForm.setFieldValue("date",dayjs(newValue).valueOf());
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
                  <Box display="flex" gap={".5em"}>
                    <FileUploadIcon color='primary'/>
                    <Typography variant="body1" color="primary">Upload Image</Typography>
                  </Box>
                </>}
            </Box>            
          </label>
          <Typography variant="subtitle2" color="error" textAlign={"center"} mt={".8em"}>{AddProjectForm.touched.image && AddProjectForm.errors.image !== undefined && AddProjectForm.touched.image && AddProjectForm.errors.image}</Typography>
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
          <ProjectCard variant='view' data={{...AddProjectForm.values,image:URL.createObjectURL(uploadFileValue)}} deleteFunc={()=>{}} updateFunc={()=>{}}/>
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
              {formPage !== 3? "Next":"Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AddProjects