import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextField, MenuItem, Button, Typography, Container, Box, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledForm = styled(Form)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledError = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

const GenerateCodeButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const productValidationSchema = Yup.object({
  code: Yup.string()
    .required("Code is a required field")
    .max(10, "Code cannot exceed 10 characters"),
  name: Yup.string()
    .required("Name is a required field")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters"),
  excerpt: Yup.string()
    .required("Excerpt is a required field")
    .min(3, "Excerpt must be at least 30 characters")
    .max(500, "Excerpt cannot exceed 500 characters"),
  category: Yup.string().required("Category is a required field"),
  price: Yup.number()
    .required("Price is a required field")
    .positive("Price must be positive")
    .max(100000, "Price cannot exceed 100,000"),
});

function AddProducts() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/categories")
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const generateCode = () => {
    const uuid = uuidv4();
    return uuid.slice(0, 6);
  };

  const handleGenerateCode = (setFieldValue) => {
    const newCode = generateCode();
    setFieldValue("code", newCode);
  };

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    axios.post("http://localhost:3000/api/v1/products", values)
      .then(response => {
        console.log(response);
        setData([...data, values]);
        window.alert("Product successfully added!");
        resetForm();
      })
      .catch(err => {
        console.log(err);
        window.alert("Failed to add product.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <Formik
        initialValues={{ code: "", name: "", excerpt: "", category: "", price: "" }}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <StyledForm>
            <Field
              name="code"
              as={TextField}
              label="Product Code"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="code" component={StyledError} />
            <GenerateCodeButton onClick={() => handleGenerateCode(setFieldValue)} variant="contained">
              Generate 6-Digit Code
            </GenerateCodeButton>

            <Field
              name="name"
              as={TextField}
              label="Product Name"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="name" component={StyledError} />

            <Field
              name="excerpt"
              as={TextField}
              label="Excerpt"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <ErrorMessage name="excerpt" component={StyledError} />

            <Field
              name="category"
              as={TextField}
              select
              label="Category"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="category" component={StyledError} />

            <Field
              name="price"
              as={TextField}
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
            />
            <ErrorMessage name="price" component={StyledError} />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
}

export default AddProducts;