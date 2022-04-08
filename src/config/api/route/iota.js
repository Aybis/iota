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
  updateActivity: (data, id) => axios.post(`activity/${id}`, data),

  // regional
  regional: () => axios.get('regional'),
  // 1.name 2.alias
  insertRegional: (data) => axios.post('regional'),
  // 1.name 2.alias
  updateRegional: (data, id) => axios.post(`regional/${id}`, data),
  deleteRegional: (id) => axios.post(`regional/${id}`),
};
