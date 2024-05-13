import styled from "@emotion/styled";
import { Box, Button, IconButton, Typography } from '@mui/material';

export const SButton1 = styled(Button)({
    background: '#00C07F',
    color: '#FFFFFF',
    marginLeft: '8px',
    textTransform: 'none',
    '&:hover': {
        background: '#00ac72',
        color: '#FFFFFF'
    }
})

export const SButton2 = styled(Button)({
    background: '#FFFFFF',
    color: '#00C07F',
    marginLeft: '8px',
    textTransform: 'none',
    border: "1px solid #00C07F",
    '&:hover': {
        background: '#FFFFFF',
        color: '#00ac72',
        border: "1px solid #00ac72"
    }
})

export const TileBox = styled(Box)({
    height: '100%',
    width: '95%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #DCDCDC',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
})

export const FlexCenterBox = styled(Box)({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
})

export const MenuBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    cursor: 'pointer'
})

export const ProfileContainer = styled(Box)({
    backgroundColor: 'background.secondary',
    color: 'text.primary',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
    minHeight: '300px'
})

export const ProfileContainerMin = styled(Box)({
    backgroundColor: 'background.secondary',
    color: 'text.primary',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
})

export const ProfileContainerMax = styled(Box)({
    backgroundColor: 'background.secondary',
    color: 'text.primary',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
    height: '640px'
})

export const FlexStartBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '4px'
})

export const FlexSpaceBetweenBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px'
})

export const PostsBox = styled(Box)({
    textAlign: 'left',
    height: '580px',
    overflow: 'auto'
})

export const MessageBox = styled(Box)({
    textAlign: 'left',
    maxHeight: '150px',
    padding: '8px',
    overflow: 'auto'
})

export const ContainerBox = styled(Box)({
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems:'center'
})

export const SaveButtonBox = styled(Box)({
    width: '100%',
    maxWidth: '350px',
    padding: '4px',
    paddingTop: '8px'
})

export const GroupButtonBox = styled(Box)({
    width: '100%',
    maxWidth: '350px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center'
})

export const ProfileImgBox = styled(Box)({
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
})

export const FlexEnd = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
})

export const FooterBox = styled(Box)({
    background: '#00C07F',
    padding: '16px',
    color: '#FFFFFF',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
})
