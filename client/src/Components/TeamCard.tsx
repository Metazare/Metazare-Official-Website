import React from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SocialMediaButton from './SocialMediaButton';
import { TeamType } from '../Hooks/Firebase/useTypes';

function TeamCard({name,description,roles,image,website,github,facebook}:TeamType) {
  return (
    <div style={{ width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      <Avatar variant="circular" sx={{ width: '85px', height: '85px', marginBottom: '1em' }} />
      <Typography variant="h6" color="white">
        {name}
      </Typography>
      <Typography variant="subtitle2" color="white">
        {roles}
      </Typography>
      <Typography variant="body2" fontWeight={300} mt={2} textAlign={'center'} color="white">
        {description}
      </Typography>
      <Box display="flex" mt={2} gap={1}>
        {facebook !== undefined && facebook !== "" && <SocialMediaButton type={'facebook'} link={facebook} />}
        {github !== undefined && github !== "" &&  <SocialMediaButton type={'github'} link={github} />}
        {website !== undefined &&  website !== "" &&  <SocialMediaButton type={'website'} link={website}/>}
      </Box>
    </div>
  );
}

export default TeamCard;