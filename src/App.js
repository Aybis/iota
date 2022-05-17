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
import Desktop from './pages/Desktop';
import { ForgotPassword, VerifOtp, NewPassword } from './pages/forget_password';
import { HariLibur, ManageLibur, ManageUser } from './pages/management';
import Management from './pages/management/Management';

function App() {
  return (
    <div className="relative bg-zinc-50">
      <ToastContainer />
      <Routes>
        {/* Route without autenthication */}
        <Route path="/login" element={<Gate />}>
          <Route index element={<Login />} />
        </Route>

        {/* Route without autenthication */}
        <Route path="/forgot" element={<Gate />}>
          <Route index element={<ForgotPassword />} />
          <Route path="verification" element={<VerifOtp />} />
          <Route path="new-password" element={<NewPassword />} />
        </Route>

        {/* Route with autenthication */}
        <Route path="/" element={<Authenticated />}>
          {/* Route Link Teknisi  */}
          <Route path="/dekstop" element={<Desktop />} />
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportAbsenUser />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activity/:activity" element={<DetailActivity />} />
          <Route path="/add-progress/:activity" element={<AddProgress />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />

          {/* Link Dashboard Absensi Manar dan Leader*/}
          <Route path="/absensi" element={<DashboardAbsensi />}>
            <Route index element={<Harian />} />
            <Route path="absensi" element={<Harian />} />
            <Route path="bulanan" element={<Bulanan />} />
            <Route path="karyawan" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="activities/status" element={<ListActivityByStatus />} />
          {/* Link Dashboard Activities Manar dan Leader */}
          <Route path="/activities" element={<DashboardActivity />}>
            <Route index element={<Daily />} />
            <Route path="activities" element={<Daily />} />
            <Route path="bulanan" element={<Monthly />} />
            <Route path="karyawan" element={<Employee />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Link Management Data Leader MSO*/}
          <Route path="/management" element={<Management />} />
          <Route path="/management/users" element={<ManageUser />} />
          <Route path="/management/libur" element={<ManageLibur />} />
          <Route path="/management/libur/data" element={<HariLibur />} />
          <Route path="activities/:user" element={<DetailUserAct />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
