import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../../redux/actions";

import AuthInput from '../common/AuthInput';

class UpdateRegistration extends Component {
  state = {
    firstName: "",
    lastName: "",
    institution: "",
  }

  onSubmit = e => {
    e.preventDefault();
    console.warn("Validate data not implemented");
    this.props.register(this.state.username, this.state.password);
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset id="wrapper">
          <h2>Update Registration</h2>
            <AuthInput title="First Name" name={"firstName"} type="text" onChange={this.onChange} />
            <AuthInput title="Last Name" name={"lastName"} type="text" onChange={this.onChange} />
            <AuthInput title="Institusion" name="institution" type="text" onChange={this.onChange} />
            <p>
              <button type="submit">Register</button>
            </p>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
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
    // updateRegistratoin: (firstName, lastName, institution) => dispatch(auth.upDateRegistration(firstName, lastName, institution)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRegistration);