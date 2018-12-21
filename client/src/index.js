import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.jwtToken) {
      APIUtil.setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken)
      store.dispatch(APIUtil.setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
          store.dispatch(APIUtil.logoutUser());
          window.location.href = '/login'
      }
    }
    ReactDOM.render(<App />, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
