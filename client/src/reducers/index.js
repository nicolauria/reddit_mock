import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  posts: postReducer
});
