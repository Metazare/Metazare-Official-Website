import { useEffect } from 'react';

// MUI
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';

// Components
import AddServices from './AddServices'
import useModal from '../../../../Hooks/Firebase/useModal';
import useServices from '../../../../Hooks/Firebase/useServices';
import ServiceCard from '../../../../Components/ServiceCard';
function Services() {
  const {data:services,loading:serviceLoading,getServicesList, postService} = useServices();
  const {setOpenModal,ModalComponent,closeModal} = useModal();

  useEffect(()=>{
    getServicesList();
  },[])
  
  if(serviceLoading) return <>Loading...</>
  return <>
    <Container maxWidth="lg" sx={{padding:"3em"}}>
      <Box display="flex" gap={3}>
        <Box flexGrow={1}>
        </Box>
        <IconButton aria-label="" onClick={()=>{setOpenModal(<AddServices modalClose={closeModal} postFunc={postService}/>)}}>
          <AddIcon color='primary'/>
        </IconButton>
      </Box>
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