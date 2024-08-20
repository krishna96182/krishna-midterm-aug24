import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import DataTable from 'react-data-table-component';
import { Button, Typography, Container, Paper, Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function ShowProducts() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [statuses, setStatuses] = useState(['All', 'Active', 'Inactive']);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    displayProducts();
  }, []);

  useEffect(() => {
    if (id) {
      viewProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    handleSearch();
  }, [data, search, selectedStatus]);

  const displayProducts = () => {
    const url = "http://localhost:3000/api/v1/products";
    axios.get(url)
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching products.");
      });
  };

  const viewProductDetails = (productId) => {
    axios.get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        navigate(`/ShowProducts/${productId}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteData = (productId) => {
    axios.delete(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        displayProducts();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatCreatedAt = (createdAt) => {
    return moment.utc(createdAt).tz('Asia/Kolkata').format('Do MMMM YY');
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Price', selector: row => row.price, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => deleteData(row._id)}
        >
          Delete
        </Button>
      ),
      button: true,
    },
  ];

  const handleSearch = () => {
    const lowercasedFilter = search.toLowerCase();
    const filtered = data.filter(product =>
      product.name.toLowerCase().includes(lowercasedFilter) &&
      (selectedStatus === 'All' ? true : (product.status ? 'Active' : 'Inactive') === selectedStatus)
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            placeholder="Search by Name"
            size="small"
            onChange={handleSearchChange}
            value={search}
            style={{ width: '300px' }}
          />
          <FormControl size="small" style={{ width: '200px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              {statuses.map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={3} style={{ padding: 16 }}>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={4}
          paginationRowsPerPageOptions={[10, 25, 50]}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={({ data }) => (
            <Paper style={{ padding: 16, marginTop: 8 }}>
              <Typography variant="body1"><b>Code:</b> {data.code}</Typography>
              <Typography variant="body1"><b>Name:</b> {data.name}</Typography>
              <Typography variant="body1"><b>Description:</b> {data.category.description}</Typography>
              <Typography variant="body1"><b>Excerpt:</b> {data.excerpt}</Typography>
              <Typography variant="body1"><b>Category:</b> {data.category.name}</Typography>
              <Typography variant="body1"><b>Status:</b> {data.status ? 'Active' : 'Inactive'}</Typography>
              <Typography variant="body1"><b>Price:</b> {data.price}</Typography>
              <Typography variant="body1"><b>Created At:</b> {formatCreatedAt(data.created_at)}</Typography>
            </Paper>
          )}
          highlightOnHover
          pointerOnHover
          customStyles={{
            rows: {
              style: {
                minHeight: '72px',
                marginBottom: '8px',
              },
            },
            headCells: {
              style: {
                fontSize: '16px',
                backgroundColor: '#f5f5f5',
                fontWeight: 600,
                color: 'black',
              },
            },
            cells: {
              style: {
                fontSize: '14px',
                color: 'black',
              },
            },
            pagination: {
              style: {
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'center',
              },
            },
            paginationButtons: {
              style: {
                borderRadius: '4px',
                margin: '0 2px',
                minWidth: '36px',
                height: '36px',
                fontSize: '14px',
              },
            },
            paginationInput: {
              style: {
                borderRadius: '4px',
                minWidth: '60px',
                height: '36px',
                fontSize: '14px',
              },
            },
            expanderButton: {
              style: {
                fontSize: '24px',
              },
            },
          }}
        />
      </Paper>
    </Container>
  );
}

export default ShowProducts;