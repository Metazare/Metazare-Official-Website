import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import TeamCard from './TeamCard';
import useTeam from '../Hooks/Firebase/useTeam';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CustomSlider() {
  const { data: team, loading: loadingTeam } = useTeam();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: team? team.length > 3? 3:team.length :"0",
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
        {team?.map((member:any, index:any) => (
          <Box key={member.id} display="flcex" justifyContent="center" alignItems={"center"}>
            <TeamCard
              name={member.name}
              roles={member.roles}
              gmail={member.gmail}
              description={member.description}
              image={member.image}
              facebook={member.facebook}
              github={member.github}
              website={member.website}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default CustomSlider;
