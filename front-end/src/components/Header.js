import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logoutUser } from "../redux/apiRequest";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        logoutUser(dispatch);
        navigate('/');
        window.location.reload();
    }
 
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} src={props.data.image}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={()=>navigate(`/profiles/${props.data.username}`)}>
                <Avatar src={props.data.image} /> Profile               
            </MenuItem>
          
            <MenuItem onClick={()=>navigate(`/settings`)}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={()=>navigate(`/password`)}>
                <ListItemIcon>
                    <LockIcon fontSize="small" />
                </ListItemIcon>
                Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

function Header (){
    const accessToken = localStorage.getItem('token'); 
    const data = useSelector((state) => state.auth.getUser.userLogin);
    const dispatch = useDispatch();
    const path = useLocation().pathname;

    useEffect(() => {
        if(accessToken){
            getUser(dispatch);
        }
        window.scrollTo(0, 0);
    }, [accessToken, dispatch,]);

    if(accessToken && data){    
        return(
            <div>
                <nav className="navbar bg-white navbar-expand">
                    <div className=" container">
                        <Link to='/' style={{ textDecoration: 'none'}}>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 600, paddingTop: 1, alignContent: 'center' }}>
                                mridula
                            </Typography>
                        </Link>
                        <ul className="nav navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page">
                                    {path==='/' ? <HomeIcon /> : <HomeOutlinedIcon />}    
                                </Link>
                            </li>
                            <li className=" nav-item">
                                <Link to='/editor' className="nav-link">
                                    {(path==='/editor') ? <AddBoxIcon /> : <AddBoxOutlinedIcon />}
                                </Link>
                            </li>
                            <li className=" nav-item">
                                <AccountMenu 
                                    data={data}
                                />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    } else if(!data && !accessToken){
        return(
            <Card sx={{ borderRadius: 0 }}>
                <Grid container justifyItems={'center'} sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    <Grid item xs={0.5} md={1.7}></Grid>
                    <Grid item xs={2.5} md={2}>
                        <Link to='/' style={{ textDecoration: 'none'}}>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 600, paddingTop: 1, alignContent: 'center' }}>
                                mridula
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={1} md={4}></Grid>
                    <Grid item xs={8} md={4}>
                        <Stack direction="row" spacing={2}>
                            <Link to='/' className="nav-link active" aria-current="page">
                                {path==='/' ? <Button color="primary"><HomeIcon /></Button> : <Button color='inherit'><HomeOutlinedIcon /></Button>}   
                            </Link>
                            <Link to='/login' className="nav-link">
                                {path==='/login' ? <Button variant="contained" color="primary">Sign in</Button> : <Button color='inherit'>Sign in</Button>}  
                            </Link>
                            <Link to='/signup' className="nav-link">
                                {path==='/signup' ? <Button variant="contained" color="primary">Sign up</Button> : <Button color='inherit'>Sign up</Button>}
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default Header;