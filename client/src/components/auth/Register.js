import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../util/session_api_util';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.id) {
      this.props.history.push('/general');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser);
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        { user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Reddit Mock account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                         className={classnames('form-control form-control-lg', {
                           'is-invalid': errors.name
                         })}
                         placeholder="Name"
                         name="name"
                         value={this.state.name}
                         onChange={this.onChange} />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email"
                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                          })}
                         placeholder="Email Address"
                         name="email"
                         value={this.state.email}
                         onChange={this.onChange} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password"
                         className={classnames('form-control form-control-lg', {
                           'is-invalid': errors.password
                         })}
                         placeholder="Password"
                         name="password"
                         value={this.state.password}
                         onChange={this.onChange} />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                         className={classnames('form-control form-control-lg', {
                           'is-invalid': errors.password2
                         })}
                         placeholder="Confirm Password"
                         name="password2"
                         value={this.state.password2}
                         onChange={this.onChange} />
                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
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
  registerUser: user => dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
