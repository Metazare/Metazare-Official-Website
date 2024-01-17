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
import Alert from '@mui/material/Alert';

// Utilities
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth';


function Login() {
  const {error,signInWithGoogle,signIn} = useAuth();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:values =>{
      signIn(values.email,values.password)
    }
  })

  useEffect(()=>{
  },[])

  return (
    <Container maxWidth="sm" sx={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}} >
    <Paper variant="elevation" elevation={2} sx={{padding:"1em"}} >
      <a href="/"><img style={{width:"60%",margin:"35px auto 40px",display:"block"}}  src={Logo} alt="" /></a>
      <form onSubmit={formik.handleSubmit}>
        {error !== null && <Alert variant='filled' severity="error" sx={{marginBottom:"30px"}}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            
            <TextField
              required
              type='email'
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
              required
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box display="flex" alignItems={"center"} gap={3} mt={3} mb={3} sx={{opacity:".5"}}>
        <hr style={{flexGrow:"1"}}/>
        <Typography variant="subtitle2" color="initial">Or</Typography>
        <hr style={{flexGrow:"1"}}/>
      </Box>
      <Button variant="text" onClick={signInWithGoogle} fullWidth startIcon={<GoogleIcon color='error'/>} sx={{color:"black"}}>
        Sign in with Google
      </Button>
    </Paper>
  </Container>
  )
}
export default Login