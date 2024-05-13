import { Outlet, createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Appbar from './components/Appbar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, ThemeProvider, Toolbar, createTheme, outlinedInputClasses } from '@mui/material';
import Profile from './screens/Profile';
import Footer from './components/Footer';
import { deepOrange } from '@mui/material/colors';
import Account from './screens/Account';

const App = () => {
  const user = useSelector(store => store.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const mode = useSelector((store) => store.auth.mode);

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          text: {
            primary: '#000000',
            secondary: '#000000',
          },
          background: {
            default: '#FFFFFF',
            paper: '#FFFFFF'
          },
        }
        : {
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
          background: {
            default: '#424242',
            paper: '#000000'
          },
        }),
    },
    typography: {
      allVariants: {
        fontFamily: 'Open Sans',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: '1px solid #DCDCDC',
            borderRadius: "12px",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              border: '1px solid #DCDCDC',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              border: '1px solid #DCDCDC',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'background.paper', color: 'text.primary', minHeight: '100vh' }}>
          <Appbar />
          <Toolbar />
          <br />
          {location.pathname === '/' ?
            <Home /> :
            null
          }
          <Outlet />
        </Box>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/account',
        element: <Account />
      }
    ]
  }
  
])
