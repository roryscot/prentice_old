import BlueLogo from 'assets/img/logo/LogoMark.png';
import PropTypes from 'prop-types';
import React from 'react';
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

export default LoginForm;
