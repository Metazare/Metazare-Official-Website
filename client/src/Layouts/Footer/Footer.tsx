import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import { motion } from "framer-motion"

// Image
import Logo from '../../Images/White.png'
const Footer: React.FC = () => {
  return (
    <footer >
      <Box sx={{background:"#0F1B3F",padding:"3em 1em 2em"}}>
        <Container maxWidth="lg">
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
          
          <Box padding={"0 2em"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <motion.div 
              style={{display:"flex",justifyContent:"center"}}
              initial={{ scale: 0.5,translateY: 40, opacity: 0.1 }}
              whileInView={{ scale: 1,translateY: 1,  opacity: 1 }}
              transition={{
                duration: .8,
                ease: "backInOut",
              }}
            >
              <img src={Logo} width={"40%"} alt="" />
            </motion.div>
            
            <Box display="flex" gap={2} mt={3}>
            <Typography variant="subtitle1" color="initial" component={"a"} sx={{textDecoration:"none",color:"white",transition:"all .3s ease-in",":hover":{scale:"1.2",color:"#1976d2"}}} href='#AboutUs'>About Us</Typography>
            <Typography variant="subtitle1" color="initial" component={"a"} sx={{textDecoration:"none",color:"white",transition:"all .3s ease-in",":hover":{scale:"1.2",color:"#1976d2"}}} href='#Contact'>Contact</Typography>
            <Typography variant="subtitle1" color="initial" component={"a"} sx={{textDecoration:"none",color:"white",transition:"all .3s ease-in",":hover":{scale:"1.2",color:"#1976d2"}}} href='#Services'>Services</Typography>
            <Typography variant="subtitle1" color="initial" component={"a"} sx={{textDecoration:"none",color:"white",transition:"all .3s ease-in",":hover":{scale:"1.2",color:"#1976d2"}}} href='#Projects'>Projects</Typography>
            </Box>
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
      <Box sx={{background:"#0B1533",padding:"3em 1em 2em"}}>
        <Typography variant="body1" fontWeight={400} color="white" textAlign={"center"}>©{new Date().getFullYear()} MetazareStudios</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
