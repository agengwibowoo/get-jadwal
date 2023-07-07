import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import isLoggedIn from './helpers/isLoggedIn';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

const PrivateRoute = () => {
  const auth = !!isLoggedIn();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CheckIn />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/schedule/:day" element={<Schedule />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

const NotFound = () => {
  return <div>404 Not Found</div>;
};

export default Routing;
