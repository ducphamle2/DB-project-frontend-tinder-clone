/**
 * @author DucPL
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../app/login/login";
import Home from "../app/navigator/Home";
import StackHome from "./navigator/StackHome";
import setting from './config/setting';
import StringUtil from './utils/StringUtils';
import DataAsync from './utils/DataAsync';
import { myLoginConstant } from './utils/Constants';
import axios from "axios";
import Register from './login/register';

class Main extends Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = setting.apiUrl;
    console.log('default URL: ', axios.defaults.baseURL);
    axios.defaults.timeout = 30000;
    axios.defaults.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // this is used to intercept each time a request is sent to the server
    axios.interceptors.request.use(
      async config => {
        console.log('url>>>>: ' + config.url);

        // dispatch(LoaderAction.setLoader(true));
        const token = await DataAsync.getData(myLoginConstant.TOKEN);

        console.log('interceptor request begin... >>>>>>>>>>>>>>>> = ', token);

        if (StringUtil.isEmpty(token)) {
          // do nothing
          // do
        } else {
          config.headers.Authorization = token; // chan ly.
        }

        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        console.log('response of axios: ', response);
        return response;
      },

      async error => {
        console.log('error type: ', error);
        console.log('error type 2: ', error.response);
        console.log('error type 3: ', error.request);

        return Promise.reject(error);
      }
    )
  }

  componentWillMount() {
    const { dispatch, isLoginSuccess } = this.props;
    console.log("MAIN WILL MOUNTTTTTTTTTTTTT");
  }

  render() {
    const { isLoginSuccess , registerEnter} = this.props;
    if (!isLoginSuccess && registerEnter) {
      return <Register/>;
    }
    else if (isLoginSuccess) {
      return <StackHome/>;
    }
    else {
      return <Login/>;
    }
  }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  registerEnter: state.LoginReducer.registerEnter
}))(Main);
