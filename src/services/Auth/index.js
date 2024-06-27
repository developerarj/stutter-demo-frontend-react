import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/common/login`, {
      username: username,
      password: password,
    });

    // Assuming the response contains a token
    const token = response.data.token;
    const isAdmin = response.data.isAdmin;

    // Save token to a cookie
    Cookies.set('token', token, { expires: 1 }); // Set cookie to expire in 7 days
    Cookies.set('isAdmin', isAdmin, { expires: 1 });

    return response; // Return the response data
  } catch (error) {
    console.error(error);
    throw new Error('Error logging in');
  }
};
