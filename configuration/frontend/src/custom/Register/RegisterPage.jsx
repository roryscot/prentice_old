import React, {Component} from "react";
import { Card, Col, Row } from 'reactstrap';import {connect} from "react-redux";

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
      }

  handleLogoClick = () => {
    this.props.history.push('/');
  };

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
    console.log(this.state)

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