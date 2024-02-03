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
import Typography from '@mui/material/Typography'
import Loading from '../../../../Components/Loading';

function Services() {
  const {data:services,loading:serviceLoading, postService} = useServices();
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  
  if(serviceLoading) return <Loading/>

  return <>
   <Box  width={"100%"} sx={{padding:{md:".5em 1.5em 1.5em",xs:"1.8em 2.5em 1.5em"}}}>
    <Box display="flex" sx={{borderBottom: 1, borderColor: 'divider' }} alignItems={"center"} >
      <Box sx={{flexGrow:"1", width: '100%'}}>
        <Typography variant="subtitle1" color="initial" sx={{opacity:".7"}}>Total Services: ({services? services.length:"0" })</Typography>
      </Box>
      <IconButton aria-label="" onClick={()=>{setOpenModal(<AddServices modalClose={closeModal} postFunc={postService}/>)}}>
          <AddIcon color='primary'/>
        </IconButton>
    </Box>
  </Box>
    <Container maxWidth="lg" sx={{padding:"3em"}}>
      <Box display="flex" flexDirection={"column"} sx={{gap:{md:"10em",xs:"3em"}}}>
        {services?.map((service: any,index:number) => (
          <ServiceCard key={service.id} index={index} data={service} admin={true}/>
        ))}
      </Box>
    </Container>
    {ModalComponent()}
  </>
}

export default Services