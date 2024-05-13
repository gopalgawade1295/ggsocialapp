import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, InputAdornment, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { login } from '../redux/authSlice';
import { FlexCenterBox, SButton1, SButton2, TileBox } from '../assets/styles/Styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import img1 from '../assets/images/phone-5112194_1280.png';
import img2 from '../assets/images/image.jpg';
import Alert from '../components/Alert';

const Login = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currmode = useSelector((store) => store.auth.mode);

    const formOne = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Please enter valid email")
                .required("Please enter email"),
            password: Yup.string()
                .required("Please enter password")
        }),

        onSubmit: async (values) => {
            try {
                setMessage("Please wait!");
                setDescription("Please do not close the window or go back");
                setOpen(true);

                const res = await axios.post(
                    `${process.env.REACT_APP_SECRET_KEY}auth/login`,
                    {
                        email: values.email,
                        password: values.password
                    }
                );

                const data = await res.data;
                dispatch(login({ user: data.data.user, token: data.data.token }))

                setTimeout(() => {
                    setOpen(false)
                    setMessage("");
                    setDescription("");
                }, [2000])

                //const data = await res.data
                setMessage("Success!");
                setDescription("Login Successfully.");
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000])
                formOne.resetForm();
                navigate('/')

            } catch (err) {
                setMessage("Error!");
                setDescription(err?.response?.data?.data);
                setOpen(true);

                setTimeout(() => {
                    setOpen(false)
                    setMessage("");
                    setDescription("");
                }, [2000])
            }
        },
    });

    return (
        <div className='DivMax'>
            <Grid container spacing={2}>
                <Grid item lg={8} md={6} sm={12} xs={12}>
                    <FlexCenterBox>
                        <img
                            src={currmode === 'light' ? img1 : img2}
                            height={400}
                            width={350}
                            alt=''
                        />
                    </FlexCenterBox>
                </Grid>

                <Grid item lg={4} md={6} sm={12} xs={12} >
                    <TileBox sx={{ backgroundColor: 'background.default' }}>
                        <Box textAlign='center'>
                            <Typography variant='h6' sx={{ mb: 0.5 }}>
                                Login
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%', mb: 1 }}>
                            <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                Email<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type="email"
                                placeholder='Enter Email'
                                sx={{
                                    //maxWidth: '350px',
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px"
                                    }
                                }}
                                id="email"
                                name="email"
                                onChange={formOne.handleChange}
                                value={formOne.values.email}
                            />

                            <Typography variant='caption' sx={{ color: 'red' }}>
                                {formOne.touched.email && formOne.errors.email ?
                                    <>{formOne.errors.email}</> :
                                    <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                Password<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                sx={{
                                    //maxWidth: '350px',
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ ml: "auto" }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword((show) => !show)}
                                                edge="end"
                                                sx={{ color: "#B3B6B7", ml: "auto" }}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                onChange={formOne.handleChange}
                                value={formOne.values.password}
                            />

                            <Typography variant='caption' sx={{ color: 'red' }}>
                                {formOne.touched.password && formOne.errors.password ?
                                    <>{formOne.errors.password}</> :
                                    <>&emsp;</>
                                }
                            </Typography>
                        </Box>

                        <FlexCenterBox>
                            <SButton1 onClick={formOne.handleSubmit}>
                                <Typography variant='subtitle1'>
                                    Submit
                                </Typography>
                            </SButton1>

                            <SButton2 onClick={() => { formOne.handleReset() }}>
                                <Typography variant='subtitle1'>
                                    Clear
                                </Typography>
                            </SButton2>
                        </FlexCenterBox>

                        <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
                            <Typography variant='body2'>
                                Don't have an account yet?

                                <span
                                    className='SpanNavigation'
                                    onClick={() => navigate('/register')}>
                                    &nbsp;Register now
                                </span>
                            </Typography>
                        </Box>
                    </TileBox>
                </Grid>
            </Grid>

            <Alert
                open={open}
                message={message}
                description={description}
            />
        </div>
    )
}

export default Login
