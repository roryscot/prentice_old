import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";

import { Notes, TestsContainer, Assignments } from './';

// TODO: get tests from database
import { mockStudentTest1, mockStudentTest2, mockStudentTest3 } from 'demos/devMock/mockTestResults';
const  tests = [mockStudentTest1,mockStudentTest2,mockStudentTest3];

class Dashboard extends Component {
    static propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string
        })
    }

    render () {
        return (
            <div>
                <hr/>
                <h2 className="App-intro">
                    Welcome {this.props.user ? this.props.user.username : null}
                </h2>
                <div>
                    <p>
                        This is your dashboard. From here you have access to all of your tools and resources.
                    </p>

                </div>
                <hr/>
                <h2 className="major">Dashboard</h2>
                <Assignments />
                <hr/>

                <Notes />
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

  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);