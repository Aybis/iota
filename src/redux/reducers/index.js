import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import activity from './activity';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'activity'],
};

const rootReducer = combineReducers({
  user,
  activity,
});

export default persistReducer(persistConfig, rootReducer);
