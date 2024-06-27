import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

// Helper function to get token from cookies
const getToken = () => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Token not found');
  return token;
};

// Helper function to handle errors
const handleError = error => {
  console.error(error);
  throw new Error('An error occurred while processing the request');
};

// Function to get headers
const getHeaders = (contentType = 'application/json') => ({
  'Content-Type': contentType,
  Authorization: `Bearer ${getToken()}`,
});

// Delete Modal
export const deleteModal = async id => {
  try {
    const response = await axios.delete(`${apiUrl}/admin/modal/${id}`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchAudioFiles = async () => {
  try{
    const response = await axios.get(`${apiUrl}/admin/audio-files`, {
      headers: getHeaders(),
    });
    return response;
  }catch(e){
    handleError(e);
  }
};

// Upload Modal File
export const uploadModalFile = async (file, modalType) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('modalType', String(modalType));

    const response = await axios.post(
      `${apiUrl}/common/upload-modal-file`,
      formData,
      {
        headers: getHeaders('multipart/form-data'),
      }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Get Modal
export const getModal = async id => {
  try {
    const response = await axios.get(`${apiUrl}/admin/modal/${id}`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Get All Modals
export const getModals = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/list-modal`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Add Modal
export const addModal = async (type, accuracy, version, isActive) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/modal`,
      { type, accuracy, version, isActive },
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Update Status
export const updateStatus = async (id, isActive) => {
  try {
    const response = await axios.put(
      `${apiUrl}/admin/modal/${id}`,
      { isActive },
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Get All Audio Files
export const getAllAudioFiles = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/audio-files`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Get All Predictions
export const getAllPrediction = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/prediction`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Get Count
export const getCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/count`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Add Activity
export const addActivity = async (title, endpoint) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/activity`,
      { title, endpoint },
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Delete Activity
export const deleteActivity = async id => {
  try {
    const response = await axios.delete(`${apiUrl}/admin/activity/${id}`, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// List Activity Theme
export const listActivityTheme = async activity_id => {
  try {
    const response = await axios.get(
      `${apiUrl}/admin/activity-theme/${activity_id}`,
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Add Activity Theme
export const addActivityTheme = async (theme, activity_id) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/activity-theme`,
      { theme, activity_id },
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Delete Activity Theme
export const deleteActivityTheme = async id => {
  try {
    const response = await axios.delete(
      `${apiUrl}/admin/activity-theme/${id}`,
      { headers: getHeaders() }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Add Classification
export const addClassification = async title => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/classification`,
      { title },
      { headers: getHeaders() }
    );
    return response; // Return only the data part of the response
  } catch (error) {
    handleError(error);
    throw error; // Throw the error to propagate it to the caller (optional)
  }
};

// Get Classifications
export const getClassifications = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/list-classifications`, {
      headers: getHeaders(),
    });
    return response; // Return data directly
  } catch (error) {
    handleError(error);
    throw error; // Throw the error to propagate it to the caller (optional)
  }
};

// Delete Classification
export const deleteClassification = async id => {
  try {
    const response = await axios.delete(
      `${apiUrl}/admin/classification/${id}`,
      {
        headers: getHeaders(),
      }
    );
    return response; // Return data directly
  } catch (error) {
    handleError(error);
    throw error; // Throw the error to propagate it to the caller (optional)
  }
};


// Delete AudioFile
export const deleteAudioFile = async id => {
  try {
    const response = await axios.delete(`${apiUrl}/admin/audio-files/${id}`, 
    {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};
