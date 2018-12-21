import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../util/session_api_util';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Reddit Mock account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email"
                         className="form-control form-control-lg"
                         placeholder="Email Address"
                         name="email"
                         value={this.state.email}
                         onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <input type="password"
                         className="form-control form-control-lg"
                         placeholder="Password"
                         name="password"
                         value={this.state.password}
                         onChange={this.onChange} />
                </div>
                <input type="submit"
                       className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);