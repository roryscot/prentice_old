import BlueLogo from 'assets/img/logo/LogoMark.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

import AuthInput from 'custom/common/AuthInput';

class RegisterForm extends React.Component {
    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired,
    //     validateFormState: PropTypes.func.isRequired,
    //     validateUsernameState: PropTypes.func.isRequired,
    //     validateEmailState: PropTypes.func.isRequired,
    //     validatePassword1State: PropTypes.func.isRequired,
    //     validatePassword2State: PropTypes.func.isRequired,
    //     username: PropTypes.string,
    //     email: PropTypes.string,
    //     password1: PropTypes.string,
    //     password2: PropTypes.string,
    //     hasTriedToSubmit: PropTypes.bool.isRequired,
    //     signUpError: PropTypes.oneOfType([
    //       PropTypes.object,
    //       PropTypes.bool
    //     ]).isRequired,
    //     signUpPending: PropTypes.bool.isRequired
    //   }

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
        <FormGroup >
            <Row className="center">
                <Col>
                    <Input type="radio" id="student" name="accountType" value="student" onChange={onChange} />
                    <Label htmlFor="student">Student</Label>
                </Col>
                <Col>
                    <Input type="radio" id="tutor" name="accountType" value="tutor" onChange={onChange} />
                    <Label htmlFor="tutor">Tutor</Label>
                </Col>
                <Col>
                    <Input type="radio" id="entrepreneur" name="accountType" value="entrepreneur" onChange={onChange} />
                    <Label htmlFor="entrepreneur">Entrepreneur</Label>
                </Col>
            </Row>
        </FormGroup>

            <AuthInput
                title="Email"
                name="email"
                type="email"
                onChange={onChange}
                required
            />
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
            <AuthInput
                title="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={onChange}
                required
            />

        <FormGroup check>
          <Label check>
                  <div>
                    <Input type="checkbox" name="remember" id="remember"/>{' '}
                      I agree to the terms and conditions
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
            Register
        </Button>

        <div>
            <h6>
            Already have an account? <Link to="/login" className="open"><em>Login</em></Link>
            </h6>
        </div>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
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

RegisterForm.defaultProps = {
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

export default RegisterForm;
