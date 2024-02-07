import { useFormik } from 'formik';
import useContent from '../../../../../Hooks/Firebase/useContent';
import Loading from '../../../../../Components/Loading';
// Mui
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useEffect } from 'react';


export default function BasicInformation() {
  const {data:information,loading:informationLoading,error:informationError,getBasicInformation,updateBasicInformation} = useContent();
  const formik = useFormik({
    initialValues:{
      aboutUs: "",
      location:"",
      phone:"",
      email:"",
      termsCondition:"",
      id:""
    },
    onSubmit:values =>{
      updateBasicInformation(formik.values,formik.values.id)
    }
  })
  useEffect(()=>{
    if(information !== null){
      formik.setFieldValue("aboutUs",information[0].aboutUs)
      formik.setFieldValue("location",information[0].location)
      formik.setFieldValue("phone",information[0].phone)
      formik.setFieldValue("email",information[0].email)
      formik.setFieldValue("termsCondition",information[0].termsCondition)
      formik.setFieldValue("id",information[0].id)
    }
  },[information])
  if(informationLoading) return <Loading/>
  return (
    <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
      <Typography variant="subtitle2" sx={{opacity:".9"}} mb={2} color="initial">Basic Information</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            id="aboutUs"
            label="About Us"
            name="aboutUs"
            value={formik.values.aboutUs}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            id="location"
            label="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Box display="flex" justifyContent={"end"}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
    
  )
}
