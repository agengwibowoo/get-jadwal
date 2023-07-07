import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import isLoggedIn from './helpers/isLoggedIn';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

function Routing() {
  console.log('isLoggedIn() ', isLoggedIn());
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CheckIn />} />
        <Route
          exact
          path="/home"
          element={isLoggedIn() ? <Home /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/schedule/:day"
          element={isLoggedIn() ? <Schedule /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

const NotFound = () => {
  return <div>404 Not Found</div>;
};

export default Routing;
