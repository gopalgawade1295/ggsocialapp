import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, mode } from '../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Badge, Toolbar, Typography, Avatar, styled, Menu, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuBox, SButton1 } from '../assets/styles/Styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useFetchUserDetails from '../hooks/FetchUserDetails';

const StyledBadge = styled(Badge)(({ theme }) => ({
    cursor: 'pointer',
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid #FFFFFF',
            content: '""',
        },
    }
}));

const Appbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((store) => store.auth.user);
    const userimg = useFetchUserDetails(user?._id || "");
    const open = Boolean(anchorEl);
    const currmode = useSelector((store) => store.auth.mode);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (
        <div>
            <AppBar
                elevation={0}
                sx={{ backgroundColor: 'background.paper', color: 'text.primary', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}
            >
                <Toolbar>
                    <Typography
                        variant='h5'
                        onClick={() => navigate('/')}
                        sx={{ fontFamily: 'Dancing Script', cursor: 'pointer' }}
                    >
                        GG-Social App
                    </Typography>

                    <Box sx={{ ml: 'auto' }}>
                        <IconButton
                            sx={{ bgcolor: 'background.default' }}
                            onClick={() => dispatch(mode({ currmode: 'light' ? 'dark' : 'dark' ? 'light' : 'light' }))}
                        >
                            {currmode === 'light' ?
                                <LightModeIcon /> :
                                <DarkModeIcon />
                            }
                        </IconButton>

                        {user ?
                            <>
                                <SButton1 onClick={() => navigate(`/profile?id=${user._id}`)}>
                                    My Posts
                                </SButton1>

                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={userimg?.picturePath} />
                                </StyledBadge>

                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 2,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuBox onClick={() => Logout()}>
                                        <LogoutIcon fontSize='small' sx={{ mr: 1 }} />

                                        <Typography variant='body1'>
                                            Logout
                                        </Typography>
                                    </MenuBox>

                                    <MenuBox onClick={() => navigate('/account')}>
                                        <SettingsIcon fontSize='small' sx={{ mr: 1 }} />

                                        <Typography variant='body1'>
                                            Account
                                        </Typography>
                                    </MenuBox>
                                </Menu>
                            </> :
                            <SButton1
                                onClick={() => !user ? location.pathname === '/login' ?
                                    navigate('/register') :
                                    navigate('/login') :
                                    Logout()
                                }>
                                {location.pathname === '/login' ? "Register" : "Login"}
                            </SButton1>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Appbar
