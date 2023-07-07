import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CheckIn />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/schedule/:day" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

const NotFound = () => {
  return <div>404 Not Found</div>;
};

export default Routing;
