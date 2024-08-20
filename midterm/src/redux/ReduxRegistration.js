import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, CircularProgress, Box, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import axios from 'axios';
import { registerUser } from '../action/action';

const ReduxRegistration = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    username: '',
    password: '',
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/roles');
        setRoles(response.data.roles); 
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(registerUser(formData))
      .then(() => {
        setSuccessMessage('Registration successful!');
        setFormData({
          displayName: '',
          email: '',
          username: '',
          password: '',
          role: ''
        });
      })
      .catch((error) => {
        console.error('Registration failed', error);
        setSuccessMessage('Registration failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}
      onSubmit={handleSubmit}
    >
      {successMessage && (
        <Alert severity={successMessage.includes('successful') ? 'success' : 'error'}>
          {successMessage}
        </Alert>
      )}
      <TextField
        label="Display Name"
        name="displayName"
        fullWidth
        margin="normal"
        value={formData.displayName}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role._id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
    </Box>
  );
};

export default ReduxRegistration;
