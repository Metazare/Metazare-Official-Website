import React from 'react'
import IconButton from '@mui/material/IconButton';

// Icon
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';


function SocialMediaButton({ type, link }: { type: string; link: string }) {
  return (
    <IconButton
      style={{
        transformOrigin: 'center',
        transition: 'transform 0.3s ease', // Add a smooth transition effect
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.5)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      href={link}
    >
    {type === 'facebook' ? <FacebookOutlinedIcon style={{ color: 'white' }} /> : null}
    {type === 'twitter' ? <TwitterIcon style={{ color: 'white' }} /> : null}
    {type === 'github' ? <GitHubIcon style={{ color: 'white' }} /> : null}
    {/* Add more conditions for other icons as needed */}
  </IconButton>
  );
}

export default SocialMediaButton 