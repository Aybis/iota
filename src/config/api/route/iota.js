import axios from '../constant';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (data) => axios.post('login', data),
  logout: () => axios.post('logout'),

  // activity
  // regional_id, date
  activity: (params) => axios.get('activity/all', params),
  // 1.year 2.month, year null will get current
  activityDownload: (param) => axios.get('activity/export'),
  // 1.user_id 2.regional_id 3.date
  activityProgress: (params) => axios.get('activity/on-progress', params),
  // activity_id
  activityListProgress: (params) => axios.get('activity/progress', params),
  // 1.user_id 2.regional_id 3.date
  activityDone: (params) => axios.get('activity/done', params),
  // 1.title 2.description 3.user_id
  insertActivity: (data) => axios.post('activity', data),
  // 1.progress 2.description 3.photo 4. activity_id
  addProgressActivity: (data) => axios.post('activity/progress', data),
  // 1.title 2.description
  updateActivity: (data, id) => axios.patch(`activity/${id}`, data),
  // 1.date
  fetchActivityRegional: (data) => axios.get('activity/per-regional', data),

  // regional
  regional: () => axios.get('regional'),
  // 1.name 2.alias
  insertRegional: (data) => axios.post('regional'),
  // 1.name 2.alias
  updateRegional: (data, id) => axios.post(`regional/${id}`, data),
  deleteRegional: (id) => axios.post(`regional/${id}`),

  // witel
  witel: () => axios.get('witel'),
  // 1.name 2.alias
  insertWitel: (data) => axios.post('witel'),
  // 1.name 2.alias
  updateWitel: (data, id) => axios.post(`witel/${id}`, data),
  deleteWitel: (id) => axios.post(`witel/${id}`),

  // =======================================================================

  // functional absensi
  checkIn: (data) => axios.post('absensi/check-in', data),
  checkOut: (data, absensi) => axios.post(`absensi/check-out/${absensi}`, data),
  exportDataByUnit: (data) => axios.get('export-user-by-unit', data),

  // end point data personal absensi
  fetchDailyPersonal: (data) =>
    axios.get(`absensi/user/daily/?user_id=${data}`),
  fetchWeeklyPersonal: (data) => axios.get(`absensi/user/weekly`, data),
  fetchReportPersonal: (data) => axios.get('absensi/user/report', data),
  fetchSummaryPersonal: (data) => axios.get('absensi/user/summary', data),
  exportPersonal: (data) => axios.get('absensi/export-personal', data),

  // end point dashboard absensi
  fetchDataDashboardPresent: (data) => axios.get('absensi/users/present', data),
  fetchDataDashboardStatus: (data) => axios.get('absensi/users/status', data),

  // endpoint dashboard manar and leader
  fetchDataDashboardDaily: (params) => axios.get('absensi/users/daily', params),
  fetchDataDashboardMonthly: (data) => axios.get('absensi/users/monthly', data),
  fetchActivityDailyOverview: (params) =>
    axios.get('activity/overview', params),
  fetchDataDashboardByRegional: (params) =>
    axios.get('absensi/users/employe', params),

  //endpoint CRUD data users
  fetchAllUsers: (params) => axios.get('user'),
  insertUser: (data) => axios.post('user', data),
  updateUser: (id, data) => axios.patch(`user/${id}`, data),
  deleteUser: (id) => axios.delete(`user/${id}`),

  // end point push notif to WA
  notifWa: (data) => axios.post('notifikasi/notif-to-subordinate', data),

  // end point hari libur
  getHoliday: (page) => axios.get(`holiday`, page),
  insertHoliday: (data) => axios.post('holiday', data),
  deleteHoliday: (id) => axios.delete(`holiday/${id}`),
  updateHoliday: (id, data) => axios.patch(`holiday/${id}`, data),

  // reset password
  // {phone}
  getOtp: (credentials) => axios.post('otp/generate', credentials),
  // {phone,token}
  verifOtp: (credentials) => axios.post('otp/verification', credentials),
  // {phone,password}
  changePassword: (data) => axios.post('otp/change_password', data),
};
