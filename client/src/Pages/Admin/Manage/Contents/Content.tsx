import  { useEffect, useState } from 'react'

import useContent from '../../../../Hooks/Firebase/useContent'

// Tabs
import BasicInformation from './Tabs/BasicInformation'
import FAQ from './Tabs/FAQ'
import Team from './Tabs/Team'

// Components
import MenuSettings from './MenuSettings'
import Loading from '../../../../Components/Loading'

// mui
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

function Content() {
  const {data:information, loading:loadingInformation,error:informationError,getBasicInformation} = useContent();
  const [page,setPage] = useState("Basic Information")
  useEffect(()=>{
    getBasicInformation();
  },[])
  if(loadingInformation)return <Loading/>
  return (
    <Container maxWidth="lg" sx={{padding:"3em",display:{md:"flex",xs:"block"},gap:'3'}}>
      <Box  sx={{display:"flex",flexDirection:{md:"column",xs:"row"},width:{md:"250px",xs:"unset"}}} mb={2}>
        <MenuSettings  title={"Basic Information"} page={page} setPage={()=>{setPage("Basic Information")}}/>
        <MenuSettings  title={"Frequently Ask Question"} page={page} setPage={()=>{setPage("Frequently Ask Question")}}/>
        <MenuSettings  title={"Our Team"} page={page} setPage={setPage}/>
      </Box>
      <Box sx={{flexGrow:"1",padding:".4em 1em",display:"flex",flexDirection:"column",gap:"4em"}}>
        {page === "Basic Information"?<BasicInformation/>:""}
        {page === "Frequently Ask Question" ? <FAQ/>:""}
        {page === "Our Team" ? <Team/>:""}
      </Box> 
    </Container>
  )
}

export default Content