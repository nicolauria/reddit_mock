import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import postReducer from './postReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  posts: postReducer,
  comments: commentsReducer
});
