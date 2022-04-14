import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Authenticated from './config/middleware/Authenticated';
import Gate from './config/middleware/Gate';
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
import AddProgress from './pages/AddProgres';
import Checkout from './pages/Checkout';
import Bulanan from './pages/dashboard_absensi/Bulanan';
import Harian from './pages/dashboard_absensi/Harian';
import Users from './pages/dashboard_absensi/Users';
import Daily from './pages/dashboard_activity/Daily';
import DetailUserAct from './pages/dashboard_activity/DetailUserAct';
import Employee from './pages/dashboard_activity/Employee';
import ListActivityByStatus from './pages/dashboard_activity/ListActivityByStatus';
import Monthly from './pages/dashboard_activity/Monthly';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Route without autenthication */}
        <Route path="/login" element={<Gate />}>
          <Route index element={<Login />} />
        </Route>

        {/* Route wih autentikasi */}
        <Route path="/" element={<Authenticated />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportAbsenUser />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activity/:activity" element={<DetailActivity />} />
          <Route path="/add-progress/:activity" element={<AddProgress />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/absensi" element={<DashboardAbsensi />}>
            <Route index element={<Harian />} />
            <Route path="absensi" element={<Harian />} />
            <Route path="bulanan" element={<Bulanan />} />
            <Route path="karyawan" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="activities/status" element={<ListActivityByStatus />} />

          <Route path="/activities" element={<DashboardActivity />}>
            <Route index element={<Daily />} />
            <Route path="activities" element={<Daily />} />
            <Route path="bulanan" element={<Monthly />} />
            <Route path="karyawan" element={<Employee />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="activities/:user" element={<DetailUserAct />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
