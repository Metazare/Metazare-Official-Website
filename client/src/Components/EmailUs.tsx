import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import useEmailUs from '../Hooks/Firebase/useEmailUs'
import { EmailUsType } from '../Hooks/Firebase/useTypes'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function EmailUs() {
  const {postEmail} = useEmailUs();
  const sendEmailForm = useFormik({
    initialValues:{
      name:"",
      email:"",
      message:"",
      createdAt: new Date().getTime(),
    },onSubmit: (values:EmailUsType, { resetForm }) =>{
      postEmail(values)
      resetForm()
      setOpen(true)
    }
  })
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
 
  return (
    
    <form onSubmit={sendEmailForm.handleSubmit}>
      <Grid container spacing={2} mt={1}>
        <Grid item  xs={12}>
          <TextField
            fullWidth
            id='name'
            name="name"
            placeholder='Your Name'
            variant='outlined'
            value={sendEmailForm.values.name}
            onChange={sendEmailForm.handleChange}
            required
            style={{background:"white",border:"none",borderRadius:"8px"}}
          />
        </Grid>
        <Grid item  xs={12}>
          <TextField
            required
            type='email'
            fullWidth
            id='Email'
            name="email"
            placeholder='Your Email'
            variant='outlined'
            value={sendEmailForm.values.email}
            onChange={sendEmailForm.handleChange}
            style={{background:"white",border:"none",borderRadius:"8px"}}
          />
        </Grid>
        <Grid item  xs={12}>
          <TextField
            required
            multiline
            rows={3}
            fullWidth
            id='message'
            name="message"
            placeholder='Your Message'
            variant='outlined'
            value={sendEmailForm.values.message}
            onChange={sendEmailForm.handleChange}
            style={{background:"white",border:"none",borderRadius:"8px"}}
          />
        </Grid>
        <Grid item  xs={12}>
          <Box display="flex" justifyContent={"end"}>
            <Button variant="contained" type='submit' sx={{background:"white", color:"black",":hover":{color:"white"}}}>Submit</Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        message="Email set, We will react back to you as soon as possible"
      />
    </form>
  )
}
