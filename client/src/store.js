import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers/index.js';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;

// REDUX CHROME EXTENSION
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
