import React, {Component} from "react";
import { Card, Col, Row } from 'reactstrap';
import {connect} from "react-redux";

import {Redirect} from "react-router-dom";
import {auth} from "redux/actions";
import RegisterForm from './RegisterForm';


class RegisterPage extends Component {
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

    state = {
    username: "",
    email:"",
    password: "",
    confirmPassword: "",
    accountType: null,
    
    // Validation
    formIsValid: false,
    hasTriedToSubmit: false,
    signUpError: false,
    signUpPending: false,
    submitting: false,

    unValid: false,
    emValid: false,
    p1Valid: false,
    p2Valid: false,
    atValid: null,
    }

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({
        submitting: true,
    });
        return this.validateFormState() ? 
            this.props.register(
                this.state.username, 
                this.state.email, 
                this.state.password, 
                this.state.accountType
            )
            :
            this.invalidWarning();
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  validateUsernameState = (e, un = this.state.username) => {
    this.setState({
        unValid: un.length > 2 ?
                    un.length < 30 ?
                        true :
                        false
                : false
    })
}

  validateEmailState = (e, em = this.state.email) => (
    this.setState({
        emValid: em && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(em) ?
                    false : true
    })
  )
  validatePassword1State = (e, pw = this.state.password) => (
      this.setState({
          p1Valid: pw && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(pw) ?
                    true : false
      })
  )

  validatePassword2State = (e, p1 = this.state.password, p2 = this.state.confirmPassword) => (
    this.setState({
        p2Valid: p1 === p2 ? true : false
    })
)

    validateAccountTypeState = (e, at = this.state.accountType) => (
        this.setState({
            atValid: at === 'student' ||
            at === 'tutor' ||
            at === 'entrepeneur' ?
                true : false
        })
    )

  validateFormState = () => (
    this.state.atValid &&
        this.state.unValid &&
        this.state.emValid &&
        this.state.p1Valid &&
        this.state.p2Valid ?
            true : false
)

  invalidWarning=()=>(
      alert("Invalid inputs.")
  )

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <RegisterForm
                onChangeAuthState={this.handleAuthState}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onLogoClick={this.handleLogoClick}
                submitting={this.state.submitting}
                formIsValid={this.state.formIsValid}
                signUpError={this.state.signUpError}
                signUpPending={this.state.signUpError}
                email={this.state.email}
                username={this.state.username}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                validateUsernameState={this.validateUsernameState}
                validateEmailState={this.validateEmailState}
                validatePassword1State={this.validatePassword1State}
                validatePassword2State={this.validatePassword2State}
                validateAccountTypeState={this.validateAccountTypeState}
                unValid={this.state.unValid}
                emValid={this.state.emValid}
                p1Valid={this.state.p1Valid}
                p2Valid={this.state.p2Valid}
                atValid={this.state.atValid}
                errors={this.props.errors}
            />
          </Card>
        </Col>
      </Row>
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
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password, accountType) => {
      return dispatch(auth.register(username, email, password, accountType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);