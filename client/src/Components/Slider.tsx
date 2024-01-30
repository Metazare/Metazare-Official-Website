import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import TeamCard from './TeamCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CustomSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box position="relative" padding={"0 2em"}>
      <Slider {...settings}>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
        <Box sx={{display: 'flex !important', alignItems: 'center', justifyContent: 'center' }}>
          {/* <TeamCard /> */}
        </Box>
      </Slider>
    </Box>
  );
}

export default CustomSlider;
