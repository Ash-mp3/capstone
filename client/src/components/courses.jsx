import Logo from "../assets/Registration_App_Logo.png";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import '../css/courses.css'; 
import ArrowCarrot from '../assets/dropdown.svg'
//import { ReactRoutes } from "./components/ReactRoutes";
//This is for user course page

const settings = ['Account', 'Your Courses', 'Logout'];

function Courses() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="Courses">

      <AppBar position="static" style={{backgroundColor: '#474787'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            <img id="logoImage" src={Logo} alt="logo"/>
            <Typography
              id = 'typoCourse'
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
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Courses
            </Typography>
            <Box id="avatarDropDown" sx={{ flexGrow: 2 }}>
            
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Logo" src={Logo} />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div id="listOfAvailable">
        <Accordion>
          <AccordionSummary
            expandIcon={<img style={{height: 'auto', width: '10%'}} src={ArrowCarrot}/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>TEST</AccordionDetails>
        </Accordion>
      </div>

      <footer id="typicalFooter" className="w-full h-[25px] flex justify-center items-center absolute bottom-0">
          <p>Help</p>
          <p>@2023 - MtecPro</p>
          <p>About</p>
      </footer>
  
    </div>

  );
}
export default Courses;

/// Stuff i need to get working once database is in -- set logout features, account and profile pages.