import { useEffect,useState } from 'react'
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
import Box from '@mui/material/Box'



type Props = {
  modalClose:() => void
  postFunc: (data: ServiceType) => void
}
function AddServices({modalClose,postFunc}:Props) {
  const {downloadURL,uploadFile} = useFirebase();
  const [uploadFileValue,setUploadFileValue] = useState<any>();

  useEffect(()=>{
    if(downloadURL){
      postFunc({...addServiceForm.values,imageUrl:downloadURL});
      modalClose();
    }
  },[downloadURL])

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
                setUploadFileValue(e.target.files[0])
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
            <Button variant="contained" color="primary" onClick={()=>{
              if(uploadFileValue){
                uploadFile(uploadFileValue,"Service");
              }
            }}fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    
  )
}

export default AddServices