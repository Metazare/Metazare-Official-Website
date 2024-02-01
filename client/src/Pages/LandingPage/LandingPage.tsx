import React, { useEffect } from 'react'

// Images

// Icons 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MarkunreadIcon from '@mui/icons-material/Markunread';

// Components
import ServiceCard from '../../Components/ServiceCard';
import ProjectCard from '../../Components/ProjectCard';
import Grid from '@mui/material/Grid'
import SocialMediaButton from '../../Components/SocialMediaButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Components
import Slider from '../../Components/Slider';
// Layouts
import Footer from '../../Layouts/Footer/Footer';

// Utilities
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Logo from '../../Images/Accent.png';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useServices from '../../Hooks/Firebase/useServices';
import useContent from '../../Hooks/Firebase/useContent';
import useFAQ from '../../Hooks/Firebase/useFAQ';



function LandingPage() {
  const {data:services,loading:loadingServices,getServicesList} = useServices();
  const {data:information,loading:loadingInformation,getBasicInformation} = useContent();
  const {data:faqs,loading:loadingFAQ,getFAQ} = useFAQ();
  useEffect(()=>{
    getServicesList()
    getBasicInformation()
    getFAQ()
  },[])
  if(loadingServices && loadingInformation && loadingFAQ) return <>loading</>
  return <>
    <Container maxWidth="lg" sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"600px"}}>
      <img src={Logo} alt="" width={"60%"}/>
      <Box display="flex" gap={2} mt={2} >
        <Typography variant="subtitle1" color="initial">About Us</Typography>
        <Typography variant="subtitle1" color="initial">Contact</Typography>
        <Typography variant="subtitle1" color="initial">Services</Typography>
        <Typography variant="subtitle1" color="initial">Projects</Typography>
      </Box>

    </Container>
    <section style={{ width: "100%",position:"relative" }}>
      <svg style={{zIndex:"-20",position:"absolute",top:"0",left:"0",height:"100%"}} width="100%"  viewBox="0 0 1440 596" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 595.136V0C191.838 38.9383 443.91 62.5681 720 62.5681C996.091 62.5681 1248.16 38.9383 1440 4.36563e-06V595.136C1248.16 556.198 996.091 532.568 720 532.568C443.91 532.568 191.838 556.198 0 595.136Z" fill="#0071BC" />
      </svg>
      <Box width={"100%"} sx={{padding:"100px 2em "}}>
        <Container maxWidth="lg" sx={{padding:"2em"}}>
          <Box display="flex" justifyContent={"space-between"} mb={3}>
            <svg width="80" height="40" viewBox="0 0 80 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="31" r="5" fill="white"/>
              <circle cx="34" cy="5" r="5" fill="white"/>
              <circle cx="44" cy="44" r="5" fill="white"/>
              <circle cx="75" cy="25" r="5" fill="white"/>
              <path d="M5 31L34 5L43 45.5L75 25.5" stroke="white"/>
            </svg>
            <svg width="72" height="40" viewBox="0 0 72 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="4.5" cy="5" rx="4.5" ry="5" transform="matrix(-1 0 0 1 72 26)" fill="white"/>
              <ellipse cx="4.5" cy="5" rx="4.5" ry="5" transform="matrix(-1 0 0 1 45.9004 0)" fill="white"/>
              <ellipse cx="4.5" cy="5" rx="4.5" ry="5" transform="matrix(-1 0 0 1 36.9004 39)" fill="white"/>
              <ellipse cx="4.5" cy="5" rx="4.5" ry="5" transform="matrix(-1 0 0 1 9 20)" fill="white"/>
              <path d="M67.5 31L41.4 5L33.3 45.5L4.5 25.5" stroke="white"/>
            </svg>
          </Box>
          <Box padding={"0 2em"}>
            <Typography variant="h5" mb={".5em"} textAlign={"center"} fontWeight={600} sx={{color:"white"}}>About Us</Typography>
            <Typography variant="body1" fontWeight={300} lineHeight={"2em"} margin={"auto"} maxWidth={"900px"} textAlign={"center"}  sx={{color:"white"}}>{information != null &&information[0]?.aboutUs}</Typography>
          </Box>
          <Box display="flex" justifyContent={"space-between"} mt={3}>
            <svg width="55" height="25" viewBox="0 0 55 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.5" cy="4.5" r="4.5" fill="#D9D9D9"/>
              <circle cx="23" cy="29" r="6" fill="#D9D9D9"/>
              <circle cx="48.5" cy="19.5" r="6.5" fill="#D9D9D9"/>
            </svg>
            <svg width="53" height="25" viewBox="0 0 53 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.5" cy="4.5" r="4.5" transform="matrix(-1 0 0 1 53 0)" fill="#D9D9D9"/>
              <circle cx="6" cy="6" r="6" transform="matrix(-1 0 0 1 37 24)" fill="#D9D9D9"/>
              <circle cx="6.5" cy="6.5" r="6.5" transform="matrix(-1 0 0 1 13 13)" fill="#D9D9D9"/>
            </svg>
          </Box>
        </Container>
      </Box>
    </section>
    <section style={{marginTop:"150px"}}>
      <Container maxWidth="lg">
        <Typography variant="h5" color="primary" mb={"5em"} fontWeight={600} textAlign={"center"}>Our Services</Typography>
        <Box display="flex" flexDirection={"column"} gap={"5em"} alignItems={"center"}>
          {services?.map((service: any,index:unknown) => (
            <ServiceCard key={service.id} title={service.title} description={service.description} tools={service.tools} index={index} imageUrl={service.imageUrl}/>
          ))}
        </Box>
      </Container>
    </section>
    <section style={{marginTop:"150px"}}>
      <Container maxWidth="lg">
        <Typography variant="h5" color="primary" mb={"4em"} fontWeight={600} textAlign={"center"}>Portfolio</Typography>
        <Box display="flex" flexWrap={"wrap"} gap={"2em"} justifyContent={"center"}>
         
        </Box>
      </Container>
    </section>
    <section style={{background:"#1A1918",width:"100%", padding:"5em 0 4em",marginTop:"150px"}}>
      <Container maxWidth="lg">
        <Typography variant="h5" color="primary" mb={"4em"} fontWeight={600} textAlign={"center"}>Meet Our Team</Typography>
        <Slider/>
      </Container>
    </section>
    <section style={{marginTop:"150px"}}>
      <Container maxWidth="lg">
        <Typography variant="h5" color="primary" mb={"4em"} fontWeight={600}>Frequently Ask Questions</Typography>
          {faqs?.map((faq: any,index:unknown) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{faq?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {faq?.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        
      </Container>
    </section>
    <section style={{marginTop:"150px",background:"#0071BC", padding:"5em 0 3em"}}>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item md={7}>
            <Box display="flex" flexDirection={"column"} height={"100%"}>
              <Typography variant="h5" color="white" fontWeight={600}>GET IN TOUCH</Typography>
              <Typography variant="body1" color="white">We are here to serve you</Typography>
              <Box flexGrow={1}>
                {information != null && information[0]?.location === ""?"":
                  <Box display="flex" gap={1} alignItems={"center"} mt={2}>
                    <LocationOnIcon style={{color:"white"}}/>
                    <Typography variant="body2" fontWeight={300} color="white">{information != null && information[0]?.location}</Typography>
                  </Box>
                }
                {information != null && information[0]?.phone === ""?"":
                  <Box display="flex" gap={1} alignItems={"center"} mt={1}>
                    <CallIcon style={{color:"white"}}/>
                    <Typography variant="body2" fontWeight={300} color="white">{information != null && information[0]?.phone}</Typography>
                  </Box>
                }
                {information != null && information[0]?.email === ""?"":
                  <Box display="flex" gap={1} alignItems={"center"} mt={1}>
                    <MarkunreadIcon style={{color:"white"}}/>
                    <Typography variant="body2" fontWeight={300} color="white">{information != null && information[0]?.email}</Typography>
                  </Box>
                } 
              </Box>
              <Box display="flex" gap={1} mt={"5em"} alignItems={"center"}>
                <Typography variant="subtitle1" color="white" >Links:</Typography>
                {information != null && information[0]?.facebook === ""?"":
                  <SocialMediaButton type={'facebook'} link={information != null && information[0]?.facebook} />
                }
                {information != null && information[0]?.github === ""?"":
                  <SocialMediaButton type={'facebook'} link={information != null && information[0]?.github} />
                }
              </Box>
            </Box>
          </Grid>
          <Grid item md={5}>
            <Typography variant="body1" color="white">Hey! We are looking forward to start a project with you.</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item  xs={12}>
                <TextField
                  fullWidth
                  id='Email'
                  placeholder='Your Email'
                  variant='outlined'
                  style={{background:"white",border:"none",borderRadius:"8px"}}
                />
              </Grid>
              <Grid item  xs={12}>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  id='Email'
                  placeholder='Your Email'
                  variant='outlined'
                  style={{background:"white",border:"none",borderRadius:"8px"}}
                />
              </Grid>
              <Grid item  xs={4}>
                <Button variant="contained" sx={{background:"white", color:"black"}}>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
    <Footer/>
  </>
}

export default LandingPage  