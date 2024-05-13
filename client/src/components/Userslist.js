import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FlexSpaceBetweenBox, ProfileContainer } from '../assets/styles/Styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const Userslist = ({ user, addremoveFriend }) => {
    const [name, setName] = useState('');
    const userslist = useSelector((store) => store.users.users);
    const usersaved = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    return (
        <div>
            <ProfileContainer sx={{ backgroundColor: 'background.default' }}>
                <Typography variant='body1' sx={{ m: 1, fontWeight: 600 }}>
                    Peoples
                </Typography>

                <TextField
                    size="small"
                    fullWidth
                    type="text"
                    placeholder='Search'
                    sx={{
                        //maxWidth: '350px',
                        "& input::placeholder": { fontSize: "14px" },
                        "& .MuiInputBase-root": {
                            fontSize: "14px"
                        },
                        mb: 1
                    }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <Box sx={{ height: '210px', overflow: 'auto' }}>
                    {userslist?.filter((v) => v._id !== usersaved._id)
                        .filter((v) => name === "" ?
                            v :
                            v.firstName.toLowerCase().includes(name.toLowerCase()))
                        .map((v) => {
                            return (
                                <FlexSpaceBetweenBox key={v._id}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        sx={{cursor:'pointer'}}
                                        onClick={() => navigate(`/profile?id=${v._id}`)}
                                    >
                                        <Avatar
                                            alt=""
                                            src={v?.picturePath}
                                            sx={{ width: 24, height: 24 }}
                                        />

                                        <Typography variant='body2'>
                                            {v?.firstName} {v?.lastName}
                                        </Typography>
                                    </Stack>

                                    <IconButton onClick={() => addremoveFriend(user._id, v._id)}>
                                        <PersonAddAlt1Icon
                                            fontSize='small'
                                            sx={{ color: '#00C07F' }}
                                        />
                                    </IconButton>
                                </FlexSpaceBetweenBox>
                            )
                        })}
                </Box>
            </ProfileContainer>
        </div>
    )
}

export default Userslist
