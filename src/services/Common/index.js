import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const uploadAudioFile = async file => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${apiUrl}/common/upload-audio-file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const uploadActivityFile = async (file, text, activitySessionId) => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('activitySessionId', activitySessionId);

    const response = await axios.post(
      `${apiUrl}/common/upload-activity-file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const userDetails = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/user-details`, {
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

export const getPrediction = async audioId => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/prediction/${audioId}`, {
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

export const savePrediction = async predictionData => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(
      `${apiUrl}/common/prediction`,
      predictionData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token as Bearer token in the header
        },
      }
    );

    return response; // Return response data
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const feedback = async payload => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(`${apiUrl}/common/feedback`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token as Bearer token in the header
      },
    });

    return response; // Return response data
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFeedback = async feedbackId => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(
      `${apiUrl}/common/feedback/${feedbackId}`,
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

export const getProgressReport = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/progess-report`, {
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

export const getActivityList = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/list-activity`, {
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

export const getActivitySessionList = async () => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/list-activity-session`, {
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

export const getActivitySession = async activity_id => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(
      `${apiUrl}/common/activity-session/${activity_id}`,
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

export const addActivitySession = async (activity_id, option) => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(
      `${apiUrl}/common/activity-session`,
      { activity_id: activity_id, theme_id: option },
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

export const getActivitySessionResults = async sessionId => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(
      `${apiUrl}/common/session-results/${sessionId}`,
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

export const getDialogue = async option => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${apiUrl}/common/dialogue/${option}`, {
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

export const getSessionPrediction = async session_id => {
  try {
    const token = Cookies.get('token'); // Get token from cookie

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(
      `${apiUrl}/common/session-prediction-results/${session_id}`,
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
