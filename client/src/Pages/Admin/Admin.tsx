import React, { useEffect } from 'react'
import useFirebaseAuth from '../../Hooks/Firebase/useFirebaseAuth';
import { useAuth } from '../../Hooks/useAuth';

function Admin() {
  const {user} = useAuth();
  useEffect(()=>{
    console.log("Ito po")
    console.log(user)
  },[])
  return (
    <div>{user?.email}</div>
  )
}

export default Admin