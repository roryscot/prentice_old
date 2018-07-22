import BlueLogo from 'assets/img/logo/LogoMark.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, FormFeedback, Label, Input, Form, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

import AuthInput from 'custom/common/AuthInput';

class RegisterForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        username: PropTypes.string,
        email: PropTypes.string,
        password1: PropTypes.string,
        password2: PropTypes.string,
        accountType: PropTypes.string,
        validateFormState: PropTypes.func.isRequired,
        validateUsernameState: PropTypes.func.isRequired,
        validateEmailState: PropTypes.func.isRequired,
        validatePassword1State: PropTypes.func.isRequired,
        validatePassword2State: PropTypes.func.isRequired,
        hasTriedToSubmit: PropTypes.bool.isRequired,
        // signUpError: PropTypes.oneOfType([
        //   PropTypes.object,
        //   PropTypes.bool
        // ]).isRequired,
        // signUpPending: PropTypes.bool.isRequired
      }

      

  render() {
    const {
        showLogo,
        onLogoClick,
        onSubmit,
        onChange,
        submitting,
        email,
        username,
        password,
        confirmPassword,
        validateEmailState,
        validateUsernameState,
        validatePassword1State,
        validatePassword2State,
        unValid,
        emValid,
        p1Valid,
        p2Valid,
        atValid,
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
            <Row className="center" >
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
            <Input hidden invalid={atValid===false}/>
            <FormFeedback>
                You must select an account type.
            </FormFeedback>
        </FormGroup>

            <AuthInput
                title="Email"
                name="email"
                type="email"
                formFeedback={"It must be a valid email address"}
                onChange={onChange}
                onBlur={validateEmailState}
                valid={emValid}
                invalid={!emValid && email}
                required
            />
            <AuthInput
                title="Username"
                name="username"
                type="text"
                formFeedback={"It must be greater than 2 and less than 30 characters long"}
                onChange={onChange}
                onBlur={validateUsernameState}
                valid={unValid}
                invalid={!unValid && username}
                required
            />
            <AuthInput
                title="Password"
                name="password"
                type="password"
                formFeedback={"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."}
                onBlur={validatePassword1State}
                onChange={onChange}
                valid={p1Valid}
                invalid={!p1Valid && password}
                required
            />
            <AuthInput
                title="Confirm Password"
                name="confirmPassword"
                type="password"
                formFeedback={"Passwords must match."}
                onChange={onChange}
                onBlur={validatePassword2State}
                valid={p2Valid}
                invalid={!p2Valid && confirmPassword}
                required
            />

        <FormGroup check>
          <Label check>
                  <div>
                    <Input type="checkbox" name="remember" id="remember" required />{' '}
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
          disabled={submitting}
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

//  use react-forms ? 
// const mapValidatorToProps = state => {
//     return ({
//         username: state.username,
//         password: state.password,
//         confirmPassword: state.confirmPassword,
//         email: state.email,
//     });
// };

export default RegisterForm;
