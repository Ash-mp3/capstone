import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from './assets/Registration_App_Logo.png';
import SearchBar from './SearchBarCom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import handleStatus from '../controllers/handleStatus';

const pages = ['Courses'];
// let settings = ['Profile', 'Courses', 'Logout', 'admin'];


function ResponsiveAppBar({ isLoggedIn, onSearch }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [authorizeStatus, setAuthorizeStatus] = useState("loading...")
  const [userRole, setUserRole] = useState('student')
  const [userName, setUserName] = useState()
  const [settings, setSettings] = useState(['Profile', 'Courses', 'Logout'])

  useEffect(() => {
    if (userRole === 'admin') {
      setSettings(['admin', 'Courses', 'Logout'])
    } else if (userRole === 'student') {
      setSettings(['Profile', 'Courses', 'Logout'])
    }
  }, [userRole])

  const handleOpenNavMenu = (event) => {
    
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const checkUserRole = async () => {
    
      try {
      fetch(`/api/profileInfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => {
        setAuthorizeStatus(handleStatus(res))
        if(res.ok){
          return(res.json())
        }
      }).then((data) => {
        setUserRole(data.user_role)
        setUserName(data.username)
      })
      } catch (err) {
        console.error('err');
      }   
  }
  
  checkUserRole()
  const location = useLocation();

  let title;
  switch(location.pathname) {
    case '/registration':
      title = 'Registration';
      break;
    case '/Login' && '/':
      title = 'Login';
      break;
    case '/login':
      title = 'Login';
      break;
    case '/courses':
      title = 'Courses';
      break;
    case '/profile':
      title = 'Profile';
      break;
    case '/admin':
      title = 'Administrator';
      break;
    // Add more cases as needed
    default:
      title = 'Capstone Project'; 
  }

  if (!isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/Login' || location.pathname === '/')) {
    return (
      <AppBar position="static">
        <Container maxWidth="xl" class="bg-[#474787]">
          <Toolbar disableGutters>
            <Avatar id='logoImage' src={Logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" class="bg-[#474787]">
        <Toolbar disableGutters>
          <Avatar id='logoImage' src={Logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {location.pathname !== '/courses' && location.pathname !== '/admin' && location.pathname !== '/profile' &&(
              <Link to="/courses">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Courses
                </Button>
              </Link>
            )}
          </Box>
          {location.pathname !== '/profile' &&
            <SearchBar onSearch={onSearch}></SearchBar>
          }
          <Box className ='ml-14' sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Profile Pic" >{userName ? userName.charAt(0).toUpperCase() : ''}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={`/${setting.toLowerCase()}`} key={setting}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
