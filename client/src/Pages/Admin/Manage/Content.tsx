import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import useInformation from '../../../Hooks/Firebase/useInformation'
import Typography from '@mui/material/Typography'
function Content() {
  const {data:information, loading:loadingInformation,error:informationError,getInformation} = useInformation();
  useEffect(()=>{
    getInformation();
  },[])
  if(loadingInformation)return<>loading</>
  return (
    <Container maxWidth="lg" sx={{padding:"3em"}}>
      <Typography variant="h6" color="initial">About Us</Typography>
      {information != null && information[0]?.aboutUs}
    </Container>
  )
}

export default Content