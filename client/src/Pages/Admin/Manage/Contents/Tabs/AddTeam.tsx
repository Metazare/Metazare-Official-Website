import React, { useEffect, useState } from 'react'
import { TeamType } from '../../../../../Hooks/Firebase/useTypes'
import { useFormik } from 'formik'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import Tooltip from '@mui/material/Tooltip'
import TeamCard from '../../../../../Components/TeamCard'
import useFirebase from '../../../../../Hooks/useFirebase'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Avatar from '@mui/material/Avatar'



interface Props{
  modalClose:  () => void
  addFunc: (data: TeamType) => void
}
export default function AddTeam({modalClose,addFunc}:Props) {

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
  const {downloadURL,uploadFile} =useFirebase();
  const [uploadFileValue,setUploadFileValue] = useState<any>();
  useEffect(()=>{
    if(downloadURL){
      addFunc({...formik.values,image:downloadURL})
      modalClose();
    }
  },[downloadURL])

  const formik = useFormik({
    initialValues:{
      name:"",
      roles:"",
      description:"",
      gmail:"",
      github:"",
      facebook:"",
      website:"",
      image:downloadURL,
    },
    validate: (values) => {
      let errors: { [key: string]: string } = {};
    
      switch (formPage) {
        case 1:
          if (!values.name) {
            errors = { ...errors, name: "Name is required" };
          }
          if (!values.roles) {
            errors = { ...errors, roles: "Roles are required" };
          }
          if (!values.description) {
            errors = { ...errors, description: "Description is required" };
          }
          break;
        case 2:
          if (!values.gmail) {
            errors = { ...errors, gmail: "Gmail is required" };
          }
          break;
        case 3:
          if (!uploadFileValue) {
            errors = { ...errors, image: "You need to upload image first" };
          }
          break
        default:
          break;
      }
      return errors;
    },
    onSubmit:(values)=>{
      switch (formPage) {
        case 1:
          setFormPage(2)
          break;
        case 2:
          setFormPage(3)
          break;

        case 3:
          setFormPage(4)
          break
        case 4:
          uploadFile(uploadFileValue,"Team")
          break;
        default:
          break;
      }
    }
  })

  return (
    <Box minWidth={"400px"}>
      <Typography variant="h5" fontWeight={600} color="primary">Add Services</Typography>
      <Box display="flex" alignItems={"center"} margin={".5em 0 1em"}>
        <FormButton num={1} toolTip={"Basic Information"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={2} toolTip={"Social Media"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={3} toolTip={"Upload Image"}/>
        <hr style={{flexGrow:1}} />
        <FormButton num={4} toolTip={"Preview"}/>
      </Box>
      <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
        {formPage === 1 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Name</Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name !== undefined}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Roles</Typography>
          <TextField
            fullWidth
            id="roles"
            name="roles"
            value={formik.values.roles}
            onChange={formik.handleChange}
            error={formik.touched.roles && formik.errors.roles !== undefined}
            helperText={formik.touched.roles && formik.errors.roles}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Description</Typography>
          <TextField
            multiline
            fullWidth
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && formik.errors.description !== undefined}
            helperText={formik.touched.description && formik.errors.description}
          />
        </>}
        {formPage === 2 && <>
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Your Gmail</Typography>
          <TextField
            sx={{marginBottom:"1em"}}
            multiline
            fullWidth
            id="gmail"
            name="gmail"
            value={formik.values.gmail}
            onChange={formik.handleChange}
            error={formik.touched.gmail && formik.errors.gmail !== undefined}
            helperText={formik.touched.gmail && formik.errors.gmail}
          />
          <hr />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Facebook Link</Typography>
          <TextField
            multiline
            fullWidth
            id="facebook"
            name="facebook"
            value={formik.values.facebook}
            onChange={formik.handleChange}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Github Link</Typography>
          <TextField
            multiline
            fullWidth
            id="github"
            name="github"
            value={formik.values.github}
            onChange={formik.handleChange}
          />
          <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Personal Website Link</Typography>
          <TextField
            multiline
            fullWidth
            id="website"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
          />
        </>}
        
        {formPage === 3 && <>
          <label htmlFor="image">
            <Box display="flex" flexDirection={"column"}  height={"300px"} justifyContent={"center"} alignItems={"center"} sx={{border:"1px dashed #1976d2",borderRadius:"8px",gap:".5em",cursor:"pointer",transition:"all .3s ease-in",opacity:".6",":hover":{opacity:"1"}}}>
              {uploadFileValue? 
                <>
                  <Box display="flex">
                    <Avatar variant="circular" src={URL.createObjectURL(uploadFileValue)}  sx={{ width: '200px', height: '200px' }} />
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
          <Typography variant="subtitle2" color="error" textAlign={"center"} mt={".8em"}>{formik.touched.image && formik.errors.image !== undefined && formik.touched.image && formik.errors.image}</Typography>
          <TextField
            name="image"
            id='image'
            fullWidth
            type='file'
            onChange={async(e:any)=>{
              setUploadFileValue(e.target.files[0])
            }}
            inputProps={{
              accept: '.jpg',
            }}
            sx={{display:"none"}}
          />
        </>}
        {formPage === 4 && <>
          <Box minHeight={"300px"} sx={{background:"#1A1918",borderRadius:"8px", padding:"2em 1em"}} mt={1}>
            <TeamCard name={formik.values.name} roles={formik.values.roles} gmail={formik.values.gmail} description={formik.values.description} image={URL.createObjectURL(uploadFileValue)} facebook={formik.values.facebook} github={formik.values.github} website={formik.values.website}/>
          </Box>
        </>}


        <Grid container spacing={2} mt={2}>
          <Grid item xs={5}>
            <Button fullWidth variant="contained" color="primary"  sx={{marginTop:"1.5em"}} onClick={()=>{modalClose()}}>
              cancel
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button fullWidth variant="contained" color="primary" type='submit' sx={{marginTop:"1.5em"}}>
              {formPage !== 4? "Next":"Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
