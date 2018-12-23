import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../util/session_api_util';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  render() {
    let dashboardNav = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )
    if (this.props.auth.user.id) {
      dashboardNav = (
        <ul className="navbar-nav ml-auto">
          <li className="logout">
            <Link className="general-page-link" to="/posts">Posts</Link>
          </li>
          <li className="logout" onClick={this.logout}>
            Logout
          </li>
        </ul>
      )
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Reddit Mock</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              {dashboardNav}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
