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
  Profile,
  ReportAbsenUser,
} from './pages';
import Bulanan from './pages/dashboard_absensi/Bulanan';
import Harian from './pages/dashboard_absensi/Harian';
import Users from './pages/dashboard_absensi/Users';
import Daily from './pages/dashboard_activity/Daily';
import DetailUserAct from './pages/dashboard_activity/DetailUserAct';
import Employee from './pages/dashboard_activity/Employee';
import Monthly from './pages/dashboard_activity/Monthly';

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/absensi" element={<DashboardAbsensi />}>
          <Route index element={<Harian />} />
          <Route path="absensi" element={<Harian />} />
          <Route path="bulanan" element={<Bulanan />} />
          <Route path="karyawan" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/activities" element={<DashboardActivity />}>
          <Route index element={<Daily />} />
          <Route path="activities" element={<Daily />} />
          <Route path="bulanan" element={<Monthly />} />
          <Route path="karyawan" element={<Employee />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="activities/detail" element={<DetailUserAct />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
