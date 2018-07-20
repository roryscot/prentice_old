import React, {Component} from 'react';
import logo from 'assets/img/logo/LogoMark.png';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Page from 'components/Page';
import { getColor } from 'utils/colors';

import {
    supportTicketsData,
    productsData,
    userProgressTableData,
    avatarsData,
    todosData,
    chartjs,
  } from 'demos/dashboardPage';

class HomePage extends Component {
    componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }
        const primaryColor = getColor('primary');
        const secondaryColor = getColor('secondary');

        return (
            <Page 
                id="HomePage"
            >
                <div className="center text-primary">
                    <h1 className="display-1"><em>prentice</em></h1>
                    <h2>You can learn anything</h2>
                    <p>
                        <img src={logo} alt="LogoMakr https://logomakr.com/6CmyNn" className="logo img-fluid text-center"/>
                    </p>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  };

export default connect(mapStateToProps)(HomePage);