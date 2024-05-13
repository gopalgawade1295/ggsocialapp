import React from 'react';
import { Box, Grid, InputAdornment, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, outlinedInputClasses, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';

const Alert = ({ open, message, description }) => {
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            aria-labelledby="responsive-dialog-title"
            sx={{ textAlign: 'center' }}
        >
            <DialogTitle
                id="responsive-dialog-title"
                sx={{ mb: 0, pb: 0 }}
            >
                <Typography variant='h5'>
                    {message}
                </Typography>
            </DialogTitle>

            <DialogTitle id="responsive-dialog-title">
                {message?.includes("wait") ?
                    <CircularProgress color="success" /> :
                    message?.includes("Success") ?
                        <img
                            src={success}
                            height={'40px'}
                            weight={'40px'}
                            alt=''
                        /> :
                        message?.includes("Error") ?
                            <img
                                src={error}
                                height={'40px'}
                                weight={'40px'}
                                alt=''
                            /> :
                            null
                }
            </DialogTitle>

            <DialogContent
                sx={Smalldialog ?
                    { minWidth: '100px' } :
                    { minWidth: '320px' }
                }
            >
                <DialogContentText>
                    <Typography variant='body1'>
                        {description}
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default Alert
