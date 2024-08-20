import React, { useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import AddProducts from './AddProducts';
import AddCategory from './AddCategory';

const Admin = () => {
  const [showAddProducts, setShowAddProducts] = useState(true);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color={showAddProducts ? 'primary' : 'secondary'}
          onClick={() => setShowAddProducts(true)}
        >
          Add Products
        </Button>
        <Button
          variant="contained"
          color={!showAddProducts ? 'primary' : 'secondary'}
          onClick={() => setShowAddProducts(false)}
        >
          Add Category
        </Button>
      </Box>
      <Box
        sx={{
          padding: 3,
          backgroundColor: '#f5f5f5', 
          borderRadius: 1,
          boxShadow: 3,
          border: '1px solid #ddd',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {showAddProducts ? <AddProducts /> : <AddCategory />}
      </Box>
    </Container>
  );
};

export default Admin;