import React, {Component} from 'react';
import logo from 'assets/img/logo/LogoMark.png';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Page from 'components/Page';

import homePageBackgroundImage from 'assets/img/bg/homepage-bg.jpg';

import bn from 'utils/bemnames';

const homePageBackground = {
    backgroundImage: `url("${homePageBackgroundImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};


const bem = bn.create('sidebar');

class HomePage extends Component {
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <Page 
                id="HomePage"
                data-image={homePageBackgroundImage}
            >
                <div className={bem.e('content')}>
                    <div className="center text-secondary" id="homepage-title">
                            <span className="inline">
                                <img 
                                    src={logo} 
                                    alt="LogoMakr https://logomakr.com/6CmyNn" 
                                    width="80"
                                    height="80"
                                    id="homepage-image"
                                />
                                <h1 className="display-1"  ><em>prentice</em></h1>
                            </span>
                            <h2><em>~ You can learn </em> <strong>anything</strong> </h2>
                        <div className={bem.e('background') + " image-blurred-primary-color back"} style={homePageBackground} />
                    </div>
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