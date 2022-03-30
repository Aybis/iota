import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Activity,
  Checkin,
  Dashboard,
  DetailActivity,
  Home,
  Login,
  NotFound,
  ReportAbsen,
} from './pages';
import Authenticated from './config/middleware/Authenticated';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Authenticated />}>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportAbsen />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/detail" element={<DetailActivity />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<Checkin />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
