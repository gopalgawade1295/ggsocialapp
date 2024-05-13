import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import img1 from '../assets/images/phone-5112194_1280.png';
import img2 from '../assets/images/image.jpg';
import { FlexCenterBox, SButton1, SButton2, TileBox } from '../assets/styles/Styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, InputAdornment, IconButton, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Alert from '../components/Alert';

const Register = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [description, setDescription] = useState("");
    const currmode = useSelector((store) => store.auth.mode);
    const navigate = useNavigate();

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

    const formOne = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
            firstName: "",
            lastName: "",
            picturePath: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Please enter valid email")
                .required("Please enter email"),
            password: Yup.string()
                .required("Please enter password")
                .min(8, "Password must be 8 characters long")
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[a-z]/, "Password requires a lowercase letter")
                .matches(/[A-Z]/, "Password requires an uppercase letter")
                .matches(/[^\w]/, "Password requires a special charator"),
            confirm_password: Yup.string()
                .required("Please enter confirm password")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            firstName: Yup.string()
                .required("Please enter first name"),
            lastName: Yup.string()
                .required("Please enter last name"),
            picturePath: Yup.mixed()
                .notRequired()
                .test(
                    "FILE_FORMAT",
                    "Invalid format",
                    (value) =>
                        !value ||
                        (value &&
                            [
                                "image/png",
                            ].includes(value?.type))
                )
                .test(
                    "FILE_SIZE",
                    "Please upload file < 5mb",
                    (value) => !value || (value && value?.size / 1024 < 5120)
                ),
        }),

        onSubmit: async (values) => {
            try {
                setMessage("Please wait!");
                setDescription("Please do not close the window or go back");
                setOpen(true);

                await axios.post(
                    `${process.env.REACT_APP_SECRET_KEY}auth/register`,
                    {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        picturePath: await ImageConvert(values.picturePath)
                    }
                );

                setTimeout(() => {
                    setOpen(false)
                    setMessage("");
                    setDescription("");
                }, [2000])

                setMessage("Success!");
                setDescription("Login Successfully.");
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000])
                formOne.resetForm();
                navigate('/login')

            } catch (err) {
                setMessage("Error!");
                setDescription(err?.response?.data?.data);
                setOpen(true);
                console.log(err)

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
                                Register
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%', mb: 1 }}>
                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 450 }}>
                                First Name<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                placeholder='Enter First Name'
                                sx={{
                                    //maxWidth: '350px',
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px"
                                    }
                                }}
                                id="firstName"
                                name="firstName"
                                onChange={formOne.handleChange}
                                value={formOne.values.first}
                            />

                            <Typography variant='caption' sx={{ color: 'red' }}>
                                {formOne.touched.firstName && formOne.errors.firstName ?
                                    <>{formOne.errors.firstName}</> :
                                    <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 450 }}>
                                Last Name<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                placeholder='Enter Last Name'
                                sx={{
                                    //maxWidth: '350px',
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px"
                                    }
                                }}
                                id="lastName"
                                name="lastName"
                                onChange={formOne.handleChange}
                                value={formOne.values.lastName}
                            />

                            <Typography variant='caption' sx={{ color: 'red' }}>
                                {formOne.touched.lastName && formOne.errors.lastName ?
                                    <>{formOne.errors.lastName}</> :
                                    <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 450 }}>
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

                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 450 }}>
                                Password<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type={showPassword1 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ ml: "auto" }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword1((show) => !show)}
                                                edge="end"
                                                sx={{ color: "#B3B6B7", ml: "auto" }}
                                            >
                                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
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

                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 450 }}>
                                Confirm Password<span className='SpanRed'>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type={showPassword2 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ ml: "auto" }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword2((show) => !show)}
                                                edge="end"
                                                sx={{ color: "#B3B6B7", ml: "auto" }}
                                            >
                                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter Password"
                                id="confirm_password"
                                name="confirm_password"
                                onChange={formOne.handleChange}
                                value={formOne.values.confirm_password}
                            />

                            <Typography variant='caption' sx={{ color: 'red' }}>
                                {formOne.touched.confirm_password && formOne.errors.confirm_password ?
                                    <>{formOne.errors.confirm_password}</> :
                                    <>&emsp;</>
                                }
                            </Typography>
                        </Box>

                        <FlexCenterBox>
                            <SButton1 onClick={formOne.handleSubmit}>
                                <Typography variant='body2'>
                                    Submit
                                </Typography>
                            </SButton1>

                            <SButton2 onClick={() => { formOne.handleReset() }}>
                                <Typography variant='body2'>
                                    Clear
                                </Typography>
                            </SButton2>
                        </FlexCenterBox>

                        <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
                            <Typography variant='body2'>
                                Don't have an account yet?

                                <span
                                    className='SpanNavigation'
                                    onClick={() => navigate('/login')}>
                                    &nbsp;Login
                                </span>
                            </Typography>
                        </Box>
                    </TileBox>
                </Grid >
            </Grid >

            <Alert
                open={open}
                message={message}
                description={description}
            />
        </div >
    )
}

export default Register
