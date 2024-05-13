import { Avatar, Box, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { users } from '../redux/usersSlice';
import { friends } from '../redux/friendsSlice';
import { posts } from '../redux/postSlice';
import InputEmoji from "react-input-emoji";
import { useNavigate } from 'react-router-dom';
import Userslist from '../components/Userslist';
import ProfileBox from '../components/ProfileBox';
import { FlexCenterBox, FlexSpaceBetweenBox, FlexStartBox, MessageBox, PostsBox, ProfileContainer, ProfileContainerMax, ProfileContainerMin, SButton1 } from '../assets/styles/Styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useFetchUserDetails from '../hooks/FetchUserDetails';
import Alert from '../components/Alert';

const Home = () => {
    const usersaved = useSelector((store) => store.auth.user);
    const user = useFetchUserDetails(usersaved?._id || "");
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [postImg, setPostImg] = useState("")
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const token = useSelector((store) => store.auth.token);
    const friendslist = useSelector((store) => store.friends.friends);
    const postslist = useSelector((store) => store.post.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Fetch Users
    const getUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}users/all/${usersaved._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await res?.data;
            dispatch(users({ users: data.data }));
        }
        catch (err) {
            console.log(err);
        }
    }

    //Fetch Posts
    const getPosts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}posts`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await res?.data;
            dispatch(posts({ posts: data?.data }))
        }
        catch (err) {
            console.log(err)
        }
    }

    //Fetch Friends
    const getFriends = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}users/${usersaved._id}/friends`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await res?.data;
            dispatch(friends({ friends: data.data }))
        }
        catch (err) {
            console.log(err)
        }
    }

    //Add/Remove friend
    const addremoveFriend = async (id, friendID) => {
        try {
            await axios.patch(`${process.env.REACT_APP_SECRET_KEY}users/${id}/${friendID}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            getUsers();
            getFriends();
        }
        catch (err) {
            console.log(err);
        }
    }

    //Delete post
    const deletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SECRET_KEY}posts/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            getPosts();
        }
        catch (err) {
            console.log(err);
        }
    }

    //Like post
    const likePost = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_SECRET_KEY}posts/${id}/like`, {
                userId: usersaved._id
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
            getPosts();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
        getFriends();
        getPosts();
    }, [])

    const handleOnEnter = (text) => {
        setDescription(text)
    }

    //Add post
    const addPost = async () => {
        setMessage("Please wait!");
        setOpen(true);
        try {
            await axios.post(`${process.env.REACT_APP_SECRET_KEY}posts`, {
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                occupation: user.occupation,
                description: description,
                userPicturePath: user.picturePath,
                picturePath: await ImageConvert(postImg),
                userId: usersaved._id
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
            setDescription("");
            setPostImg("");
            getPosts();
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

    return (
        <div style={{ padding: "12px" }}>
            <Grid container spacing={2}>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ProfileBox user={user} />
                        </Grid>

                        <Grid item xs={12}>
                            <Userslist
                                user={user}
                                addremoveFriend={addremoveFriend}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ProfileContainerMin sx={{ backgroundColor: 'background.default' }}>
                                <InputEmoji
                                    value={description}
                                    onChange={setDescription}
                                    cleanOnEnter
                                    onEnter={handleOnEnter}
                                    placeholder="Type a message"
                                />

                                <FlexCenterBox sx={{ m: 1 }}>
                                    <label htmlFor='uploadphoto'>
                                        <SButton1
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Photo

                                            <input
                                                id='uploadphoto'
                                                type='file'
                                                style={{ display: 'none' }}
                                                onChange={(e) => setPostImg(e.target.files[0])}
                                            />
                                        </SButton1>
                                    </label>

                                    <SButton1
                                        onClick={() => description === "" && postImg === "" ?
                                            console.log("") :
                                            addPost()
                                        }>
                                        Save
                                    </SButton1>
                                </FlexCenterBox>
                            </ProfileContainerMin>
                        </Grid>

                        <Grid item xs={12}>
                            <ProfileContainerMax sx={{ backgroundColor: 'background.default' }}>
                                <PostsBox>
                                    {postslist?.map((v) => {
                                        return (
                                            <Box key={v._id} sx={{ p: 1, py: 0 }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <FlexSpaceBetweenBox sx={{ width: '100%' }}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={1}
                                                            sx={{cursor:'pointer'}}
                                                            onClick={() => navigate(`/profile?id=${v._id}`)}
                                                        >
                                                            <Avatar
                                                                alt=""
                                                                src={v?.userPicturePath}
                                                                sx={{ width: 24, height: 24 }}
                                                            />

                                                            <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                                {v?.firstName} {v?.lastName}
                                                            </Typography>
                                                        </Stack>

                                                        {v.userId !== usersaved._id ?
                                                            <IconButton onClick={() => addremoveFriend(user._id, v.userId)}>
                                                                {friendslist?.map(v => v._id).includes(v.userId) ?
                                                                    <PersonRemoveIcon
                                                                        fontSize='small'
                                                                        sx={{ color: '#00C07F' }}
                                                                    /> :
                                                                    <PersonAddAlt1Icon
                                                                        fontSize='small'
                                                                        sx={{ color: '#00C07F' }}
                                                                    />
                                                                }
                                                            </IconButton> :
                                                            <IconButton onClick={() => deletePost(v._id)}>
                                                                <DeleteOutlineIcon fontSize='small' />
                                                            </IconButton>
                                                        }
                                                    </FlexSpaceBetweenBox>
                                                </Box>

                                                {v?.description ?
                                                    <MessageBox>
                                                        <Typography variant='body1'>
                                                            {v?.description}
                                                        </Typography>
                                                    </MessageBox> :
                                                    null
                                                }

                                                {v?.picturePath ?
                                                    <FlexCenterBox>
                                                        <img src={v?.picturePath} height={250} />
                                                    </FlexCenterBox> :
                                                    null
                                                }

                                                {Object.keys(v.likes).length === 0 ?
                                                    <FavoriteBorderIcon
                                                        fontSize='small'
                                                        onClick={() => likePost(v._id, v.userId)}
                                                        sx={{ ml: 1, cursor: 'pointer' }}
                                                    /> :
                                                    <FlexStartBox>
                                                        <FavoriteIcon
                                                            fontSize='small'
                                                            onClick={() => likePost(v._id, v.userId)}
                                                            sx={{
                                                                ml: 1,
                                                                mr: 0.5,
                                                                color: '#E74C3C',
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                        {Object.keys(v.likes).length}
                                                    </FlexStartBox>
                                                }
                                                <hr />
                                            </Box>
                                        )
                                    }).sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))}
                                </PostsBox>
                            </ProfileContainerMax>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ProfileContainer sx={{ backgroundColor: 'background.default' }}>
                                <Typography variant='body1' sx={{ m: 1 }}>
                                    Friends
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
                                    {friendslist.filter((v) => v._id !== usersaved._id)
                                        .filter((v) => name === "" ? v : v.firstName.toLowerCase().includes(name.toLowerCase()))
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
                                                        <PersonRemoveIcon
                                                            fontSize='small'
                                                            sx={{ color: '#00C07F' }}
                                                        />
                                                    </IconButton>
                                                </FlexSpaceBetweenBox>
                                            )
                                        })}
                                </Box>
                            </ProfileContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Alert
                open={open}
                message={message}
                description={""}
            />
        </div>
    )
}

export default Home
