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
});

export default persistReducer(persistConfig, rootReducer);
