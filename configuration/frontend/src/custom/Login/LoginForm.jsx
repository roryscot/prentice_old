import BlueLogo from 'assets/img/logo/LogoMark.png';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { Link } from "react-router-dom";
import AuthInput from 'custom/common/AuthInput';

class LoginForm extends React.Component {
  state = {
    //validation
    registration: false,
  }

  render() {
    const {
      showLogo,
      onLogoClick,
      onSubmit,
      onChange
    } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={BlueLogo}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo https://logomakr.com/6CmyNn"
              onClick={onLogoClick}
            />
          </div>
        )}
        <AuthInput
              title="Username"
              name="username"
              type="text"
              onChange={onChange}
              required
          />
          <AuthInput
              title="Password"
              name="password"
              type="password"
              onChange={onChange}
              required
          />
        <FormGroup check>
          <Label check>
                  <div>
                    <Input type="checkbox" name="remember" id="remember"/>{' '}
                      Remember me
                  </div>
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}
        >
            Login
        </Button>

        <div>
            <h6>
            {"Don't"} have an account? <Link to="/register" className="open"><em>Register</em></Link>
            </h6>
        </div>

        {
            this.props.errors.length > 0 && (
              <ul>
                {
                  this.props.errors.map(error => (
                    error.message === 'Authentication credentials were not provided.' ? null :
                    <li key={error.field} className="text-danger">{error.field + ': ' + error.message}</li>
                  ))
                }
              </ul>
            )
          }
      </Form>
    );
  }
}

LoginForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    name: 'username',
    placeholder: 'Your Username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    name: 'password',
    placeholder: 'Your Password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    name: 'password',
    placeholder: 'Confirm Your Password',
  },
  onLogoClick: () => {},
};

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(LoginForm);
