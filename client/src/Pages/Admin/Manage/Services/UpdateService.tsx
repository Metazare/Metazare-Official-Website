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
  updateFunc:   (data: ServiceType, id: any) => void
  data: ServiceType
  id:any
}
function UpdateService({modalClose,updateFunc,data,id}:Props) {
  const {downloadURL,uploadFile} = useFirebase();
  const [uploadFileValue,setUploadFileValue] = useState<any>();

  useEffect(()=>{
    if(downloadURL){
      updateFunc({...UpdateServiceForm.values,imageUrl:downloadURL},id);
    }
  },[downloadURL])


  const UpdateServiceForm = useFormik({
    initialValues:{
      title:data.title,
      description: data.description,
      tools: data.tools,
      imageUrl:data.imageUrl,
      status:"active"
    },
    
    onSubmit:(values) =>{
      updateFunc(values,id);
      modalClose();
    }
  })




  return (
    <Box >
      <Typography variant="h5" fontWeight={600} color="primary">Update Services</Typography>
      <form style={{marginTop:"25px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              fullWidth
              required
              id="title"
              label="Title"
              value={UpdateServiceForm.values.title}
              onChange={UpdateServiceForm.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              fullWidth
              required
              id="description"
              label="Description"
              value={UpdateServiceForm.values.description}
              onChange={UpdateServiceForm.handleChange}
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
              value={UpdateServiceForm.values.tools}
              onChange={(event, newValue) => {
                UpdateServiceForm.setFieldValue('tools', newValue);
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
                setUploadFileValue(e.target.files[0]);
              }}
              inputProps={{
                accept: '.jpg',
              }}
            />
          </Grid>
          <Grid item md={4} xs={12} mt={3}>
            <Button variant="contained" color="primary" fullWidth onClick={()=>{modalClose()}}>
              cancel
            </Button>
          </Grid>
          <Grid item md={8} xs={12} mt={3}>
            <Button variant="contained" color="primary" onClick={()=>{
              if(uploadFileValue){
                uploadFile(uploadFileValue,"Service");
              }else{
                UpdateServiceForm.handleSubmit();
              }
            }} fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    
  )
}

export default UpdateService