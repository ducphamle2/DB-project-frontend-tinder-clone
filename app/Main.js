/**
 * @author DucPL
 */

import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import Login from "../app/login/login";
import Home from "../app/navigator/Home";
import StackHome from "./navigator/StackHome";
import setting from "./config/setting";
import StringUtil from "./utils/StringUtils";
import DataAsync from "./utils/DataAsync";
import { myLoginConstant } from "./utils/Constants";
import axios from "axios";
import Register from "./login/register";
import socketIO from "socket.io-client";
import LoginAction from "./redux/actions/LoginAction";

//setup socket in main

var socket = socketIO("https://db-project-backend.herokuapp.com/", {
  transports: ["websocket"],
  jsonp: false
});
socket.connect();

class Main extends Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = setting.apiUrl;
    console.log("default URL: ", axios.defaults.baseURL);
    axios.defaults.timeout = 30000;
    axios.defaults.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // this is used to intercept each time a request is sent to the server
    axios.interceptors.request.use(
      async config => {
        console.log("url>>>>: " + config.url);

        // dispatch(LoaderAction.setLoader(true));
        const token = await DataAsync.getData(myLoginConstant.TOKEN);

        console.log(
          "interceptor request begin in Data Async... >>>>>>>>>>>>>>>> = ",
          token
        );
        console.log("interceptor request in redux: ", this.props.token);

        if (StringUtil.isEmpty(token) && StringUtil.isEmpty(this.props.token)) {
          // do nothing
          // do
        } else {
          if (!StringUtil.isEmpty(token)) {
            config.headers.Authorization = token; // chan ly.
          } else {
            config.headers.Authorization = this.props.token; // store in redux instead so after rerendering the app it is not stored
          }
        }

        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        console.log("response of axios: ", response);
        return response;
      },

      async error => {
        console.log("error type: ", error);
        console.log("error type 2: ", error.response);
        console.log("error type 3: ", error.request);

        return Promise.reject(error);
      }
    );
  }

  componentWillMount() {
    const { dispatch, isLoginSuccess } = this.props;
    console.log("MAIN WILL MOUNTTTTTTTTTTTTT");
    console.log('socket props: ', socket);
    dispatch(LoginAction.setSocket(socket));
  }

  render() {
    const { isLoginSuccess, registerEnter } = this.props;
    if (!isLoginSuccess && registerEnter) {
      return <Register />;
    } else if (isLoginSuccess) {
      return <StackHome id={this.props.id} socket={this.props.socket} />;
    } else {
      return <Login />;
    }
  }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  registerEnter: state.LoginReducer.registerEnter,
  token: state.LoginReducer.token,
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket,
}))(Main);
