import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAudioFiles = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/user/audio-files`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token as Bearer token in the header
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAudioFile = async fileId => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.delete(
      `${apiUrl}/user/audio-files/${fileId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token as Bearer token in the header
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPrediction = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/user/prediction`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token as Bearer token in the header
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};
