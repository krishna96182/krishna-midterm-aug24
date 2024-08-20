import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Name is required'),
  description: Yup.string()
    .min(30, 'Description must be at least 50 characters')
    .max(500, 'Description must be at most 500 characters')
    .required('Description is required'),
});

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

function AddCategory() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios.post('http://localhost:3000/api/v1/categories', values)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Category
      </Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          label="Category Name"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="description"
          label="Category Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </StyledForm>
    </Container>
  );
}

export default AddCategory;