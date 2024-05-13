import React, { useEffect, useState, useRef } from 'react'
import { SButton1, SButton2, ContainerBox, SaveButtonBox, GroupButtonBox, ProfileImgBox } from '../assets/styles/Styles'
import { Box, Grid, TextField, Typography, styled } from '@mui/material'
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import useFetchUserDetails from '../hooks/FetchUserDetails';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Account = () => {
    const usersaved = useSelector((store) => store.auth.user);
    const user = useFetchUserDetails(usersaved?._id || "");
    const token = useSelector((store) => store.auth.token);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [profile, setProfile] = useState({
        first: "",
        last: "",
        email: "",
        location: "",
        occupation: ""
    })
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setProfile({
            ...profile,
            first: user?.firstName,
            last: user?.lastName,
            email: user?.email,
            location: user?.location,
            occupation: user?.occupation
        });
        setProfileImg(user?.picturePath);
    }, [user])


    const InputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const ClearImage = () => {
        InputRef.current.value = "";
        setImage(null);
        setPreview();
    }

    const EditProfileDetails = async () => {
        setMessage("Please wait!");
        setOpen(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_SECRET_KEY}/users/edit/${usersaved._id}`,
                {
                    firstName: profile.first,
                    lastName: profile.last,
                    email: profile.email,
                    location: profile.location,
                    occupation: profile.occupation,
                    picturePath: profileImg
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            setTimeout(() => {
                setOpen(false)
                setMessage("");
            }, [2000]);

            setMessage("Success!");
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                setMessage("");
            }, [2000])
        }
        catch (err) {
            setMessage("Error!");
            setOpen(true);

            setTimeout(() => {
                setOpen(false)
                setMessage("");
            }, [2000])
        }
    }

    const ImageConvert = (e) => {
        if (e) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
                fileReader.onerror = (err) => {
                    reject(err);
                }
            })
        }
    }

    const EditProfilePhoto = async () => {
        setMessage("Please wait!");
        setOpen(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_SECRET_KEY}/users/edit/${usersaved._id}`,
                {
                    firstName: profile.first,
                    lastName: profile.last,
                    email: profile.email,
                    location: profile.location,
                    occupation: profile.occupation,
                    picturePath: await ImageConvert(image)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            setTimeout(() => {
                setOpen(false)
                setMessage("");
            }, [2000]);

            setMessage("Success!");
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                setMessage("");
            }, [2000])
        }
        catch (err) {
            setMessage("Error!");
            setOpen(true);

            setTimeout(() => {
                setOpen(false)
                setMessage("");
            }, [2000])
        }
    }

    return (
        <div style={{ padding: '12px', minHeight: '91vh' }}>
            <Box sx={{ width: '100%', textAlign: 'left' }}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    Back to

                    <span
                        className='SpanNavigation'
                        onClick={() => navigate('/')}>
                        &nbsp;Home
                    </span>
                </Typography>
            </Box>

            <Box
                sx={{
                    maxWidth: '800px',
                    height: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                <Box sx={{ mt: 1 }}>
                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                        Edit Profile
                    </Typography>
                </Box>
                <br />

                <Box
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: 'background.default',
                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <ProfileImgBox>
                                <Box sx={{ mb: 3.5 }}>
                                    <img
                                        src={preview ? preview : profileImg}
                                        height={"237px"}
                                        width={"237px"}
                                        alt=''
                                    />
                                </Box>

                                <SButton1
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file && file.type.substring(0, 5) === "image") {
                                            setImage(file);
                                        } else {
                                            setImage(null);
                                        }
                                    }}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                </SButton1>

                                <GroupButtonBox>
                                    <Box sx={{ m: 1 }}>
                                        <SButton1 onClick={() => EditProfilePhoto()}>
                                            Save
                                        </SButton1>
                                    </Box>

                                    <Box sx={{ m: 1 }}>
                                        <SButton2 onClick={() => { setImage(null); setPreview(); }}>
                                            Clear
                                        </SButton2>
                                    </Box>
                                </GroupButtonBox>
                            </ProfileImgBox>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Box sx={{ p: 1, borderLeft: '1px solid #C4C4C4' }}>
                                <Box sx={{ p: 0.5, pb: 1, pt: 0 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                        First Name
                                    </Typography>

                                    <TextField
                                        type="text"
                                        fullWidth
                                        size="small"
                                        placeholder='Enter First Name'
                                        sx={{
                                            maxWidth: '350px',
                                            "& input::placeholder": { fontSize: "14px" },
                                            "& .MuiInputBase-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        value={profile.first ? profile.first : ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, first: e.target.value })
                                        }
                                    />
                                </Box>

                                <Box sx={{ p: 0.5, pb: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                        Last Name
                                    </Typography>

                                    <TextField
                                        type="text"
                                        fullWidth
                                        size="small"
                                        placeholder='Enter Last Name'
                                        sx={{
                                            maxWidth: '350px',
                                            "& input::placeholder": { fontSize: "14px" },
                                            "& .MuiInputBase-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        value={profile.last ? profile.last : ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, last: e.target.value })
                                        }
                                    />
                                </Box>

                                <Box sx={{ p: 0.5, pb: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                        Email
                                    </Typography>

                                    <TextField
                                        type="email"
                                        fullWidth
                                        size="small"
                                        placeholder='Enter Email'
                                        sx={{
                                            maxWidth: '350px',
                                            "& input::placeholder": { fontSize: "14px" },
                                            "& .MuiInputBase-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        value={profile.email ? profile.email : ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, email: e.target.value })
                                        }
                                    />
                                </Box>

                                <Box sx={{ p: 0.5, pb: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                        Location
                                    </Typography>

                                    <TextField
                                        type="text"
                                        fullWidth
                                        size="small"
                                        placeholder='Enter Location'
                                        sx={{
                                            maxWidth: '350px',
                                            "& input::placeholder": { fontSize: "14px" },
                                            "& .MuiInputBase-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        value={profile.location ? profile.location : ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, location: e.target.value })
                                        }
                                    />
                                </Box>

                                <Box sx={{ p: 0.5, pb: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                        Occupation
                                    </Typography>

                                    <TextField
                                        type="text"
                                        fullWidth
                                        size="small"
                                        placeholder='Enter Occupation'
                                        sx={{
                                            maxWidth: '350px',
                                            "& input::placeholder": { fontSize: "14px" },
                                            "& .MuiInputBase-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        value={profile.occupation ? profile.occupation : ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, occupation: e.target.value })
                                        }
                                    />
                                </Box>

                                <SaveButtonBox>
                                    <SButton1 onClick={() => EditProfileDetails()}>
                                        Save
                                    </SButton1>
                                </SaveButtonBox>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Alert
                open={open}
                message={message}
                description={""}
            />
        </div>
    )
}

export default Account
