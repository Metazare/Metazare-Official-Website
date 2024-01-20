import { useEffect,useState } from 'react'
import useServices from '../../../../Hooks/Firebase/useServices'
import {useFormik } from 'formik';
import useFirebase from '../../../../Hooks/useFirebase';
import {ServiceType} from '../../../../Hooks/Firebase/useTypes'

// MUI
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'



type Props = {
  modalClose:() => void
  postFunc: (data: ServiceType) => void
}
function AddServices({modalClose,postFunc}:Props) {
  const {downloadURL,uploadFile} = useFirebase();
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
        postFunc({...values,imageUrl:downloadURL});
        resetForm();
        modalClose();
      }
    }
  })
  return (
    <Box >
      <Typography variant="h5" fontWeight={600} color="primary">Add Services</Typography>
      <form onSubmit={addServiceForm.handleSubmit} style={{marginTop:"25px"}}>
        <Grid container spacing={2}>
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
              fullWidth
              type='file'
              onChange={async(e:any)=>{
                addServiceForm.setFieldValue('imageUrl', uploadFile(e.target.files[0], 'services'));
              }}
              inputProps={{
                accept: '.jpg',
              }}
            />
          </Grid>
          <Grid item md={4} xs={12} mt={3}>
            <Button variant="contained" color="primary" fullWidth>
              cancel
            </Button>
          </Grid>
          <Grid item md={8} xs={12} mt={3}>
            <Button type='submit' variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    
  )
}

export default AddServices