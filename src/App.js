import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authenticated from './config/middleware/Authenticated';
import {
  Activity,
  Checkin,
  Dashboard,
  DashboardAbsensi,
  DashboardActivity,
  DetailActivity,
  Home,
  Login,
  NotFound,
  ReportAbsenUser,
} from './pages';
import Bulanan from './pages/dashboard_absensi/Bulanan';
import Harian from './pages/dashboard_absensi/Harian';
import Users from './pages/dashboard_absensi/Users';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Authenticated />}>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportAbsenUser />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/detail" element={<DetailActivity />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/absensi" element={<DashboardAbsensi />}>
          <Route index element={<Harian />} />
          <Route path="absensi" element={<Harian />} />
          <Route path="bulanan" element={<Bulanan />} />
          <Route path="karyawan" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/activities" element={<DashboardActivity />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
