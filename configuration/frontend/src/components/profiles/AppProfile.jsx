import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";

import { Notes, TestsContainer, Assignments } from '../';
// TODO: get tests from database
import { mockStudentTest1, mockStudentTest2, mockStudentTest3 } from '../../assets/devMock/mockTestResults';
const  tests = [mockStudentTest1,mockStudentTest2,mockStudentTest3];

class Profile extends Component {
    render() {
        return (
            <div id="profile">
                <TestsContainer
                    tests={tests}
                    username={this.props.user.username}
                />
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        user: state.auth.user
    });
  };

  const mapDispatchToProps = dispatch => {
    return {};
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Profile);