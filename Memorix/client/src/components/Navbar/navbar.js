import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {jwtDecode as decode} from 'jwt-decode';
import { logout as Logout } from '../../Redux/actions';
import { googleLogout } from '@react-oauth/google';

import memoriesLogo from "../../Assets/image/memorix.png";
import './navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('Profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    if(user.isGoogleSignedIn){
      googleLogout();
    }
    console.log("logging ...........");
    dispatch(Logout());
    console.log("logged out");

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('Profile')));
   
  }, [location]);

  return (
    <AppBar className='nav-appBar' position="static" color="inherit">
      <Link className='brand-container' to="/" >
        <img className='brand-image' src={memoriesLogo} alt="icon"  />
      </Link>
      <Toolbar className='nav-toolbar'>
        {user?.result ? (
          <div  className='profile-navbar'>
            <Avatar className='purple-nav'  alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className='userName-navbar' variant="h6">{user?.result.name}</Typography>
            <Button className='logout-user-btn'variant="contained"  color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button className='button-signin' component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;