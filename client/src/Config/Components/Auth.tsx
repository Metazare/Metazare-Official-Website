import React,{useEffect, useState} from 'react';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button'

// Firebase
import useFirebaseAuth from './useFirebaseAuth';


export const Auth = () =>{
  const {auth,signIn,signInWithGoogle,signout} = useFirebaseAuth();
  const [credentials,setCredentials] = useState({
    email:"",
    password:""
  })
  useEffect(()=>{
    console.log(auth.currentUser?.displayName)
  },[credentials.email])

  return (
    <Container maxWidth="md">
      <form 
        onSubmit={(e)=>{
          e.preventDefault();
          signIn(credentials.email,credentials.password)
        }}>
        <input type="text" placeholder="Email..." 
          onChange={(e)=>{
            setCredentials({...credentials, email:e.target.value})
          }}
        />
        <input type="text" placeholder="Password..." 
          onChange={(e)=>{
            setCredentials({...credentials, password:e.target.value})
          }}
        />
      <button type='submit'>Sign In</button>
      </form>
      
      <Button variant="text" color="primary" onClick={signInWithGoogle}>
        Sign in with google
      </Button>
      <Button variant="text" color="primary" onClick={signout}>
        Logout
      </Button>
    </Container>
  )
}