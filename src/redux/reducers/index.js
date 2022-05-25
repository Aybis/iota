import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import regional from './regional';
import activity from './activity';
import absen from './absen';
import reportuser from './reportuser';
import dashboarduser from './dashboarduser';
import dashboardadmin from './dashboardadmin';
import forget from './forget';
import holiday from './libur';
import employee from './employee';
import witel from './witel';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    'activity',
    'regional',
    'absen',
    'reportuser',
    'dashboarduser',
    'dashboardadmin',
    'forget',
    'holiday',
    'employee',
    'witel',
  ],
};

const rootReducer = combineReducers({
  user,
  activity,
  regional,
  absen,
  reportuser,
  dashboarduser,
  dashboardadmin,
  forget,
  holiday,
  employee,
  witel,
});

export default persistReducer(persistConfig, rootReducer);
