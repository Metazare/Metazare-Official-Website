import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import {Formik, useFormik } from 'formik'
import { ProjectType } from '../../../../Hooks/Firebase/useTypes'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFirebase from '../../../../Hooks/useFirebase'

import dayjs from 'dayjs';
type Props={
  modalClose:() => void
  addFunc: (data: ProjectType) => void
}
function AddProjects({modalClose,addFunc}:Props) {
  const {downloadURL,uploadFile} =useFirebase();

  const [uploadFileValue,setUploadFileValue] = useState<any>();


  useEffect(()=>{
    if(downloadURL){
      AddProject.handleSubmit()
    }
  },[downloadURL])

  const AddProject = useFormik({
    initialValues:{
      title:"",
      image:"",
      id:"",
      type: "Mobile Application",
      createdAt: new Date().getTime(),
    },
    onSubmit:(values:ProjectType) =>{
      addFunc({...values,image:downloadURL});
      modalClose();
    }
  })

  return (
    <Box minWidth={"300px"}>
      <Typography variant="h5" fontWeight={600} color="primary">Add Projects</Typography>
      <form onSubmit={(e)=>{e.preventDefault(); AddProject.handleSubmit()}}>
        <Grid container spacing={1} mt={"10px"}>
          <Grid item xs={12}>
            <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Title</Typography>
            <TextField
              fullWidth
              id="title"
              name='title'
              value={AddProject.values.title}
              onChange={AddProject.handleChange}
            />
          </Grid>
          <Grid item md={6} xs={12} >
            <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Image</Typography>
            <TextField
              fullWidth
              type='file'
              onChange={async(e:any)=>{
                setUploadFileValue(e.target.files[0]);
                // AddProject.setFieldValue('imageUrl', uploadFile(e.target.files[0], 'services'));
              }}
              inputProps={{
                accept: '.jpg',
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography mt={1} mb={".5em"} variant="subtitle2" color="initial">Type</Typography>
            <FormControl fullWidth>
              <Select
                id="type"
                name='type'
                value={AddProject.values.type}
                onChange={AddProject.handleChange}
              >
                <MenuItem value={"Mobile Application"}>Mobile Application</MenuItem>
                <MenuItem value={"Web Application"}>Web Application</MenuItem>
                <MenuItem value={"Games"}>Games</MenuItem>
                <MenuItem value={"UI/UX Design"}>UI/UX Design</MenuItem>
                <MenuItem value={"Logo Design"}>Logo Design</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} mb={"40px"}>
          </Grid>
          
          <Grid item xs={5}>
            <Button variant="contained" color="primary" onClick={()=>{modalClose()}} fullWidth>
              Close
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button variant="contained" color="primary" onClick={()=>{
              uploadFile(uploadFileValue,"Project");
            }} fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AddProjects