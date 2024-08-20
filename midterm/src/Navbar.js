import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ color: 'white' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register" sx={{ color: 'white' }}>
            Register
          </Button>
          <Button color="inherit" component={Link} to="/admin" sx={{ color: 'white' }}>
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ color: 'white' }}>
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;