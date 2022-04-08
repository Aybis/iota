import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import regional from './regional';
import activity from './activity';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'activity', 'regional'],
};

const rootReducer = combineReducers({
  user,
  activity,
  regional,
});

export default persistReducer(persistConfig, rootReducer);
