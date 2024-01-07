import React from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SocialMediaButton from './SocialMediaButton';

function TeamCard() {
  return (
    <div style={{ width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      <Avatar variant="circular" sx={{ width: '85px', height: '85px', marginBottom: '1em' }} />
      <Typography variant="h6" color="white">
        Dianne Chrystalin Brandez
      </Typography>
      <Typography variant="subtitle2" color="white">
        Team Leader, Game & System Developer
      </Typography>
      <Typography variant="body2" fontWeight={300} mt={2} textAlign={'center'} color="white">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took. o
      </Typography>
      <Box display="flex" mt={2} gap={1}>
        <SocialMediaButton type={'facebook'} link={'https://www.facebook.com/HaroldGraphsPH'} />
        <SocialMediaButton type={'twitter'} link={'https://www.twitter.com'} />
        <SocialMediaButton type={'github'} link={'https://www.github.com'} />
      </Box>
    </div>
  );
}

export default TeamCard;