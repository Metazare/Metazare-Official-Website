import { useEffect } from 'react'
import useServices from '../../Hooks/Firebase/useServices'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {isObject, useFormik } from 'formik';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


function TryPulling() {
  const {data,getServicesList,postService} = useServices();

  useEffect(()=>{
    getServicesList();
  },[])
  
  const addServiceForm = useFormik({
    initialValues:{
      title:"",
      description:"",
      tools:["react","firebase"],
      imageUrl:"wew",
      status:"active"
    },
    onSubmit:(values, { resetForm }) =>{
      postService(values)
      resetForm()
    }
  })

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" color="primary">Add Services</Typography>
      <Grid container spacing={0}>
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
              <Button type='submit' variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Typography variant="h6" color="primary">List of Services</Typography>
      <Box display={"flex"} gap={2}>
        {isObject(data)&&(data).map((service: any) => (
          <Paper variant="elevation" elevation={3}>
            <div key={service.id}>
              <Typography variant="body1" color="initial">{service.title}</Typography>
              <Typography variant="body1" color="initial">{service.tools}</Typography>
            </div>
          </Paper>
        ))}
      </Box>
    </Container>
  )
}

export default TryPulling