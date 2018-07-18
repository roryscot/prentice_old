import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "./redux/actions";
import App_rentice from "./redux/reducers";

//Main
import {
  Dashboard,
  Contact,
  Footer,
  Header,
  Register,
  HomePage,
  About,
  NotFound,
  Login,
  ACTForm,
  Assignments,
  Profile,
  Sidebar,
} from '../custom/index';


let store = createStore(App_rentice,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));

class RootContainerComponent extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoading: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
    }),
    loadUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />;
      }
    }} />;
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <div className="is-preload">
          <div id="wrapper">
            <Header id="header"/>
            <hr/>
            <div id="main">
              <BrowserRouter>
                  <Switch>
                  <Route exact path="/" component={HomePage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/contact" component={Contact} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route path="/todos" component={Assignments}/>
                    <Route path="/test" component={ACTForm}/>
                    <Route component={NotFound} />
                  </Switch>
                </BrowserRouter>
            </div>
            <hr/>
            <Footer id="footer"/>
          </div>
          <div id="bg"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}