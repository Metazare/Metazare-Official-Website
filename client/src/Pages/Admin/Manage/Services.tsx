import { useEffect,useState } from 'react'
import useServices from '../../../Hooks/Firebase/useServices'
import {useFormik } from 'formik';
import useFirebase from '../../../Hooks/useFirebase';

// MUI
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography'


function Services() {
  const {downloadURL,uploadFile} = useFirebase();
  const {data:services,loading:loadingServices,getServicesList,postService} = useServices();

  useEffect(()=>{
    getServicesList()
    // console.log(services)
  },[])

  const addServiceForm = useFormik({
    initialValues:{
      title:"",
      description:"",
      tools: [],
      imageUrl:downloadURL,
      status:"active"
    },
    
    onSubmit:(values, { resetForm }) =>{
      if(downloadURL){
        postService({...values,imageUrl:downloadURL});
        resetForm();
      }
    }
  })
  if(loadingServices)return <>"Loading..."</>

  return (
    <Container maxWidth="lg" sx={{padding:"3em"}}>
      <form onSubmit={addServiceForm.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              fullWidth
              required
              id="title"
              label="Title"
              value={addServiceForm.values.title}
              onChange={addServiceForm.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              fullWidth
              required
              id="description"
              label="Description"
              value={addServiceForm.values.description}
              onChange={addServiceForm.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="initial">Tools</Typography>
            <Autocomplete
              fullWidth
              multiple
              id="tags-outlined"
              options={[]}
              defaultValue={[]}
              freeSolo
              value={addServiceForm.values.tools}
              onChange={(event, newValue) => {
                addServiceForm.setFieldValue('tools', newValue);
              }}
              renderTags={(value: any, getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label=""
                  placeholder="tools..."
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='file'
              onChange={async(e:any)=>{
                addServiceForm.setFieldValue('imageUrl', uploadFile(e.target.files[0], 'services'));
              }}
              inputProps={{
                accept: '.jpg',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant="contained" color="primary" sx={{float:"right"}}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Services