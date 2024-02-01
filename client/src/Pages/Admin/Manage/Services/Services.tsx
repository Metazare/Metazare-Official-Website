import { useEffect,useState } from 'react';

// MUI
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Components
import AddServices from './AddServices'
import useModal from '../../../../Hooks/Firebase/useModal';
import useServices from '../../../../Hooks/Firebase/useServices';
import ServiceCard from '../../../../Components/ServiceCard';
import Typography from '@mui/material/Typography'
function Services() {
  const {data:services,loading:serviceLoading,getServicesList, postService} = useServices();
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  const [tabValue, setTabValue] = useState('Mobile Application');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  useEffect(()=>{
    getServicesList();
  },[])
  
  if(serviceLoading) return <>Loading...</>
  return <>
   <Box  width={"100%"} sx={{padding:{md:".5em 1.5em 1.5em",xs:"1.8em 2.5em 1.5em"}}}>
    <Box display="flex" sx={{borderBottom: 1, borderColor: 'divider' }} >
      <Box sx={{flexGrow:"1", width: '100%'}}>
        <Typography variant="subtitle1" color="initial" sx={{opacity:".7"}}>Total Services: ({services? services.length:"0" })</Typography>
      </Box>
      <IconButton aria-label="" onClick={()=>{setOpenModal(<AddServices modalClose={closeModal} postFunc={postService}/>)}}>
          <AddIcon color='primary'/>
        </IconButton>
    </Box>
  </Box>
    <Container maxWidth="lg" sx={{padding:"3em"}}>
      <Box display="flex" flexDirection={"column"}>
        {services?.map((service: any,index:unknown) => (
          <ServiceCard key={service.id} title={service.title} description={service.description} tools={service.tools} index={index} imageUrl={service.imageUrl}/>
        ))}
      </Box>
    </Container>

    {ModalComponent()}
  </>
}

export default Services