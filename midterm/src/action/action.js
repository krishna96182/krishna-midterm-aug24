import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    console.log('Registration successful:', response.data);
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response ? error.response.data : 'Unknown error' });
    console.error('Registration failed:', error);
  }
};
