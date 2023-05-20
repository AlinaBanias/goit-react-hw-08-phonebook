import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'Hooks/useAuth';
import  RestrictedRoute from 'components/RestricredRoute';
import PrivateRoute from 'components/PrivateRoute';
// import NotFound from 'pages/NotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/Home/Home'));
const Contacts = lazy(() => import('pages/Contacts/Contacts'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const EditContactModal = lazy(() => 
 import('components/EditContactlModal/EditContactModal')
);
const NotFound = lazy(() => import('pages/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <b>Refreshing user...</b>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <Contacts />
                </PrivateRoute>
              }
            >
              <Route
                path="edit/:contactId"
                element={
                  <PrivateRoute redirectTo="/login">
                    <EditContactModal />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={Register}
                  redirectTo="/contacts"
                />
              }
            />

            <Route
              path="login"
              element={
                <RestrictedRoute
                  component={Login}
                  redirectTo="/contacts"
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

export default App;