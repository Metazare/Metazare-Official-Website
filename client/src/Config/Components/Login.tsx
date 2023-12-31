// Icons & Images
import GoogleIcon from '@mui/icons-material/Google';
import Logo from '../../Images/Accent.png'
// MUI
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'

// Utilities
import useFirebaseAuth from './useFirebaseAuth';
import { useFormik } from 'formik';


export const Auth = () =>{
  const {auth,signUp,signInWithGoogle,signout} = useFirebaseAuth();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:values =>{
      signUp(values.email,values.password)
    }
  })

  return (
    <Container maxWidth="sm" sx={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}} >
      <Paper variant="elevation" elevation={2} sx={{padding:"1em"}} >
        <img style={{width:"60%",margin:"25px auto 45px",display:"block"}}  src={Logo} alt="" />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='email'
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='password'
                id="password"
                label="Password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type='submit' fullWidth color="primary">
                Sign Up
              </Button>
            </Grid>
          </Grid>
          
          
        </form>
        <Box display="flex" alignItems={"center"} gap={3} mt={2} mb={2} sx={{opacity:".5"}}>
          <hr style={{flexGrow:"1"}}/>
          <Typography variant="subtitle2" color="initial">Or</Typography>
          <hr style={{flexGrow:"1"}}/>
        </Box>
        <Button variant="text" onClick={signInWithGoogle} fullWidth startIcon={<GoogleIcon color='error'/>} sx={{color:"black"}}>
          Sign up with Google
        </Button>
      </Paper>
    </Container>
  )
}