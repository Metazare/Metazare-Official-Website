import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  type: "title" | "subTitle";
  icon: any;
  title: string;
  link: string;
};

const Style = {
  display: "block",
  width: "100%",
  padding: ".5em 1em",
  color: "#5C5C5C",
  background: "white",
  '&:hover': {
    background: '#D9D9D9',
    opacity: "1",
    color: "#5C5C5C",
  },
  transition: "background .3s ease-in-out",
  textDecoration: "none",
};

const ActiveStyle = {
  width: "100%",
  color: "#ffffff",
  background: "#70AE45",
  '&:hover': {
    background: '#70AE45',
  },
};

function NavItem({ type, icon, title, link }: Props) {
  return (
    <Typography
      variant={type === "title" ? "h6" : "subtitle1"}
      component={RouterLink}
      to={link}
      color="initial"
      sx={window.location.pathname === link ? { ...Style, ...ActiveStyle } : { ...Style }}
    >
      <Box display="flex" gap={"10px"} alignItems={"center"}>
        {icon} {title}
      </Box>
    </Typography>
  );
}

export default NavItem;