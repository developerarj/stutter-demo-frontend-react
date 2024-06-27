import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Modal from './view/Admin/Modal';

import Login from './view/Login';
import Admin from './view/Admin/Admin';
import AdminSideBar from './components/Layout/Admin/SideBar';
import UserSideBar from './components/Layout/User/SideBar';

import ModalDetails from './view/Admin/ModalDetails';
import Testing from './view/Admin/Testing';
import Home from './view/User/Home';
import Predictions from './view/User/Predictions';
import Recordings from './view/User/Recordings';
import FeedbackComponent from './view/User/FeedbackComponent';
import ProgressReport from './view/User/ProgressReport';
import Activity from './view/User/Activity';
import SimpleDialog from './view/User/SimpleDialog';
import ActivitySessionResults from './view/User/ActivitySessionResults';
import Activities from './view/Admin/Activities';
import ActivityDetails from './view/Admin/ActivityDetails';
import './Global.css';
import Classification from './view/Admin/Classification';
import AudioFiles from './view/Admin/AudioFiles';
import AdminPrediction from './view/Admin/AdminPrediction';
const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === 'dark' ? '#1e1e2d ' : '#1e1e2d ',
      },
    }),
  },
});

const PrivateRoute = ({ element, adminOnly }) => {
  const token = Cookies.get('token');
  const isAdminCookie = Cookies.get('isAdmin');
  const isAdmin = isAdminCookie === 'true';
  const isAuth = !!token;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" />;
  }

  if (!adminOnly && isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }, []);

  useEffect(() => {
    const isAdminCookie = Cookies.get('isAdmin');
    setIsAdmin(isAdminCookie === 'true');

    const token = Cookies.get('token');
    setIsAuth(!!token);

    const handleCookieChange = () => {
      const updatedIsAdminCookie = Cookies.get('isAdmin');
      setIsAdmin(updatedIsAdminCookie === 'true');

      const updatedToken = Cookies.get('token');
      setIsAuth(!!updatedToken);
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, [isAuth]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <Admin />
                  </AdminSideBar>
                }
                path="/"
                adminOnly={true}
              />
            }
          />

          <Route
            path="/admin/modals"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <Modal />
                  </AdminSideBar>
                }
                path="/admin/modals"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/modals/:id"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <ModalDetails />
                  </AdminSideBar>
                }
                path="/modals/:id"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/activities"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <Activities />
                  </AdminSideBar>
                }
                path="/activities"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/activities/:id"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <ActivityDetails />
                  </AdminSideBar>
                }
                path="/activities/:id"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/testing"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <Testing />
                  </AdminSideBar>
                }
                path="/admin/testing"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/prediction"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <AdminPrediction />
                  </AdminSideBar>
                }
                path="/admin/prediction"
                adminOnly={true}
              />
            }
          />

        
          <Route
            path="/admin/feedback/:id"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <FeedbackComponent />
                  </AdminSideBar>
                }
                path="/admin/feedback/:id"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/classifications"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <Classification />
                  </AdminSideBar>
                }
                path="/admin/classifications"
                adminOnly={true}
              />
            }
          />
          <Route
            path="/admin/audio-files"
            element={
              <PrivateRoute
                element={
                  <AdminSideBar>
                    <AudioFiles />
                  </AdminSideBar>
                }
                path="/admin/audio-files"
                adminOnly={true}
              />
            }
          />

          <Route
            path="/home"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    {/* <Home /> */}
                    <Activity />
                  </UserSideBar>
                }
                path="/home"
                adminOnly={false}
              />
            }
          />
          <Route
            path="/user/myaudio"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <Recordings />
                  </UserSideBar>
                }
                path="/user/recordings"
                adminOnly={false}
              />
            }
          />
          <Route
            path="/user/prediction"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <Predictions />
                  </UserSideBar>
                }
                path="/user/prediction"
                adminOnly={false}
              />
            }
          />
          <Route
            path="/user/feedback/:id"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <FeedbackComponent />
                  </UserSideBar>
                }
                path="/user/feedback/:id"
                adminOnly={false}
              />
            }
          />
          <Route
            path="/user/progress"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <ProgressReport />
                  </UserSideBar>
                }
                path="/user/progress"
                adminOnly={false}
              />
            }
          />
          <Route
            path="/user/activity"
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <Activity />
                  </UserSideBar>
                }
                path="/user/activity"
                adminOnly={false}
              />
            }
          />
          <Route
            path={`/user/activity/simple-dialog/:id`}
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <SimpleDialog />
                  </UserSideBar>
                }
                path={`/user/activity/simple-dialog/:id`}
                adminOnly={false}
              />
            }
          />
          <Route
            path={`/user/activity/simple-dialog/:id/:seesionId`}
            element={
              <PrivateRoute
                element={
                  <UserSideBar>
                    <ActivitySessionResults />
                  </UserSideBar>
                }
                path={`/user/activity/simple-dialog/:id/:seesionId`}
                adminOnly={false}
              />
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
