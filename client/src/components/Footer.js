import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FlexEnd, FooterBox } from '../assets/styles/Styles';

const Footer = () => {
    return (
        <FooterBox>
            <Typography variant='h5' sx={{ p: 1, fontFamily: 'Dancing Script' }}>
                GG-Social App
            </Typography>

            <Box sx={{ p: 1, textAlign: 'right' }}>
                <FlexEnd>
                    <Typography variant='body2' sx={{ p: 1 }}>
                        How to reach me?
                    </Typography>

                    <a href='https://in.linkedin.com/in/gopalgawde1295'>
                        <Typography variant='body2' sx={{ p: 1 }}>
                            <LinkedInIcon />
                        </Typography>
                    </a>

                    <a href='https://github.com/gopalgawade1295'>
                        <Typography variant='body2' sx={{ p: 1 }}>
                            <GitHubIcon />
                        </Typography>
                    </a>
                </FlexEnd>

                <Typography variant='cation' sx={{ p: 1 }}>
                    *This project is made for learning purpose only.
                </Typography>
            </Box>
        </FooterBox>
    )
}

export default Footer
