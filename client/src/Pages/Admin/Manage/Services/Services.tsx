
// MUI
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';

// Components
import AddServices from './AddServices'
import useModal from '../../../../Hooks/Firebase/useModal';
import useServices from '../../../../Hooks/Firebase/useServices';
import { useEffect } from 'react';
function Services() {
  const {data:services,loading:serviceLoading,getServicesList} = useServices();
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
        <IconButton aria-label="" onClick={()=>{setOpenModal(<AddServices modalClose={closeModal}/>)}}>
          <AddIcon color='primary'/>
        </IconButton>
      </Box>
      
    </Container>




    {ModalComponent()}
  </>
}

export default Services