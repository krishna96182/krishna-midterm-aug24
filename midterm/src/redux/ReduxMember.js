import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Typography, Box } from '@mui/material';
import { logoutUser } from '../action/authaction';

const ReduxMember = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return <Typography variant="h6">Please log in to view this page.</Typography>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Member Information</Typography>
        <Typography variant="h6">Username: {user.username}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Display Name: {user.displayName}</Typography>
        <Typography variant="h6">Role: {user.role}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(logoutUser())}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ReduxMember;
