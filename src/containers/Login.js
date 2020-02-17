import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch(loginUser(email, password));
    }

  render() {
    const { loginError, isAuthenticated, isLoggingIn } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
          <div className="container">
              <div className="row">
                  <div className="col-12 col-md-5 col-xl-4 order-md-1 my-5">
                      <h1 className="display-4 text-center mb-3">
                          Sign in
                      </h1>
                      <p className="text-muted text-center mb-5">
                          Welcome back!
                      </p>
                      <form name="loginForm" onSubmit={this.onSubmit}>
                          <div className="form-group">
                              <label>Email Address</label>
                              <input
                                  type="email"
                                  className="form-control"
                                  placeholder="name@address.com"
                                  required
                                  autoComplete="username"
                                  onChange={this.handleEmailChange}
                              />
                          </div>
                          <div className="form-group">
                              <label>Password</label>
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Enter your password"
                                  autoComplete="new-password"
                                  onChange={this.handlePasswordChange}
                              />
                          </div>
                          {loginError && (
                              <div className="alert alert-warning" role="alert">
                                  Incorrect email or password.
                          </div>
                          )}
                          <button 
                          disabled={isLoggingIn}
                          type="submit"
                          className="btn btn-lg btn-block btn-primary mb-3"
                          >
                              { isLoggingIn && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                              &nbsp;Sign in
                        </button>
                      </form>
                  </div>
              </div>
          </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Login);
