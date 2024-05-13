import React from 'react';
import { FlexCenterBox, FlexStartBox, ProfileContainer } from '../assets/styles/Styles';
import PlaceIcon from '@mui/icons-material/Place';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Typography } from '@mui/material';
import profileimg from '../assets/images/user-4-512 (1).png';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileBox = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <ProfileContainer sx={{ backgroundColor: 'background.default' }}>
                <FlexCenterBox>
                    <img
                        src={user?.picturePath ? user.picturePath : profileimg}
                        alt=''
                        height={120}
                        width={120}
                        style={{ borderRadius: '50%' }}
                    />
                </FlexCenterBox>

                <Typography variant='body1' sx={{ fontWeight: 600, mb: 0.75 }}>
                    {user?.firstName} {user?.lastName}
                </Typography>

                <Box sx={{ color: 'text.secondary' }}>
                    <FlexStartBox>
                        <PlaceIcon fontSize='small' sx={{ mr: 0.5, color: '#979A9A' }} />

                        <Typography variant='body2'>
                            {user?.location ? user?.location : 'Somewhere on 🌎'}
                        </Typography>
                    </FlexStartBox>

                    <FlexStartBox>
                        <WorkOutlineIcon fontSize='small' sx={{ mr: 0.5, color: '#979A9A' }} />

                        <Typography variant='body2'>
                            {user?.occupation ? user?.occupation : "-"}
                        </Typography>
                    </FlexStartBox>

                    <FlexStartBox>
                        <MailOutlineIcon fontSize='small' sx={{ mr: 0.5, color: '#979A9A' }} />

                        <Typography variant='body2'>
                            {user?.email}
                        </Typography>
                    </FlexStartBox>

                    <hr />

                    <Typography variant='body2'>
                        Impressions: {user?.impressions}
                    </Typography>

                    <Typography variant='body2'>
                        Profile Views: {user?.viewedProfile}
                    </Typography>

                    {location.pathname.includes('profile') ?
                        <Box sx={{ width: '100%', textAlign: 'right' }}>
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                Back to

                                <span
                                    className='SpanNavigation'
                                    onClick={() => navigate('/')}>
                                    &nbsp;Home
                                </span>
                            </Typography>
                        </Box> :
                        null
                    }
                </Box>
            </ProfileContainer>
        </div>
    )
}

export default ProfileBox
