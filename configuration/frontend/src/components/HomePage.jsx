import React, {Component} from 'react';
import logo from '../../src/assets/images/Logo1.png';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


class HomePage extends Component {
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div>
                <img src={logo} alt="logo" className="logo img-fluid text-center"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  };

export default connect(mapStateToProps)(HomePage);