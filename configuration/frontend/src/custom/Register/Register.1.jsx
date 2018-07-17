import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";

import {auth} from "../../redux/actions";

import AuthInput from '../common/AuthInput';

class Register extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    validateFormState: PropTypes.func.isRequired,
    validateUsernameState: PropTypes.func.isRequired,
    validateEmailState: PropTypes.func.isRequired,
    validatePassword1State: PropTypes.func.isRequired,
    validatePassword2State: PropTypes.func.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    password1: PropTypes.string,
    password2: PropTypes.string,
    hasTriedToSubmit: PropTypes.bool.isRequired,
    signUpError: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]).isRequired,
    signUpPending: PropTypes.bool.isRequired
  }

  state = {
    username: "",
    email:"",
    password: "",
    confirmPassword: "",
    accountType: null,
  }

  onSubmit = e => {
    e.preventDefault();
    console.warn("Validate data not implemented");
    this.props.register(this.state.username, this.state.email, this.state.password, this.state.accountType);
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
          <h2 className="major">Register</h2>
          {
            this.props.errors.length > 0 && (
              <ul>
                {
                  this.props.errors.map(error => (
                    error.message === 'Authentication credentials were not provided.' ? null :
                    <li key={error.field}>{error.field + ': ' + error.message}</li>
                  ))
                }
              </ul>
            )
          }
          <div className="fields">
            <div className="field third">
              <input type="radio" id="student" name="accountType" value="student" onChange={this.onChange} />
              <label htmlFor="student">Student</label>
            </div>
            <div className="field third">
              <input type="radio" id="tutor" name="accountType" value="tutor" onChange={this.onChange} />
              <label htmlFor="tutor">Tutor</label>
            </div>
            <div className="field third">
              <input type="radio" id="entrepreneur" name="accountType" value="entrepreneur" onChange={this.onChange} />
              <label htmlFor="entrepreneur">Entrepreneur</label>
            </div>
            <AuthInput title="Email" name="email" type="email" onChange={this.onChange} className="field half"/>
            <AuthInput title="Username" name="username" type="text" onChange={this.onChange} className="field half"/>
            <AuthInput title="Password" name="password" type="password" onChange={this.onChange} className="field half"/>
            <AuthInput title="Confirm Password" name="confirmPassword" type="password" onChange={this.onChange} className="field half"/>
          </div>
          <p>
            <button type="submit">Register</button>
          </p>
        <p>
          Already have an account? <Link to="/login" className="open"><em>Login</em></Link>
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password, accountType) => dispatch(auth.register(username, email, password, accountType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);