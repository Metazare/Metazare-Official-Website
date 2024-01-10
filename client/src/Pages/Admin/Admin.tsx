import React from 'react'
import useFirebaseAuth from '../../Hooks/Firebase/useFirebaseAuth';
function Admin() {
  const {user} = useFirebaseAuth();
  return (
    <div>{}</div>
  )
}

export default Admin