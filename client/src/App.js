import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PostsPage from './components/PostsPage';
import Footer from './components/layout/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Route exact path="/posts" component={PostsPage} />
            <Footer />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
