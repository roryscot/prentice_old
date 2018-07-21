import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React, {Component} from "react";
import { Card, Col, Row } from 'reactstrap';import {connect} from "react-redux";

import { Redirect } from "react-router-dom";
import {auth} from "redux/actions";
import LoginForm from './LoginForm';


class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  }

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

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
            <LoginForm
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
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    },
    register: (username, email, password, accountType) => {
      return dispatch(auth.register(username, email, password, accountType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);