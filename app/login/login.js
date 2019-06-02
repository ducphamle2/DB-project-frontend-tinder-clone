/**
 * @author DucPL
 */

import React, { Component } from "react";
import { Item, Input } from "native-base";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  ImageBackground,
  Picker,
  StyleSheet,
  Alert
} from "react-native";
import { connect } from "react-redux";
import LoginAction from "../redux/actions/LoginAction";
import StateUtil from "../utils/StateUtil";
import LoginStyle from "../assets/styles/LoginStyle";
import images from "../assets/image_source/Images";
import BackGroundImage from "../assets/background/BackGroundImage";
import validation from "../utils/validations/Validation";
import api from "../config/Api";
import { TouchableOpacity } from "react-native-gesture-handler";
import register from "../login/register";
import DataAsync from "../utils/DataAsync";
import { CheckBox } from "react-native-elements";
import { myLoginConstant } from "../utils/Constants";
import StringUtil from "../utils/StringUtils";
var screen = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    // state is set because username & password will change a lot
    this.state = {
      email: "antimage_is_here@gmail.com",
      //password: 'Pabcdef3#',
      //email: 'how_are_you@gmail.com',
      password: "123456",
      //email: 'ducpham@gmail.com',
      //password: '123456',
      loginErrorMessage: "",
      color: "#DB1E4A",
      isClicked: false,
      isRemembered: false
    };

    StateUtil.resetState(); // here when we get to Login component, all the states have to be reset.
  }

  // when user hit the login button
  handleLogin() {
    const { email, password } = this.state;
    if (
      password !== "" &&
      email !== "" &&
      email.length <= 100 &&
      password.length <= 20
    ) {
      const payload = { email, password };
      console.log("payload in handle login: ", payload);
      setTimeout(async () => {
        await api.login(payload, this.onHandle.bind(this));
      }, 200);
    } else {
      // check if input are valid or not
      if (email.length > 100 || password.length > 20) {
        this.setState({
          loginErrorMessage:
            "username or password length is too long (max 50 and 20)"
        });
      } else if (email === "" || password === "") {
        this.setState({
          loginErrorMessage: "Please type username or password"
        });
      } else {
        this.setState({ loginErrorMessage: "There is something wrong" });
      }
    }
  }

  onHandle(isSuccess, response, error) {
    const { dispatch } = this.props;
    if (isSuccess) {
      console.log("response: ", response);
      // if successfully login
      if (response.request.status === 200) {
        console.log("SUCESSFULLYYYYYYY");
        setTimeout(() => {
          dispatch(LoginAction.setUsername(this.state.email)); // set username state to current username for later use
        }, 200);
        // we will store these variables in reducer anyway.
        const payload = {
          username: response.data.user.username,
          email: this.state.email,
          password: this.state.password,
          id: response.data.user.id
        };
        //dispatch(LoginAction.setId(response.data.user.id));
        dispatch(LoginAction.setUserInfo(payload));
        if (this.state.isRemembered) {
          // if is remember is ticked
          console.log("REMBEMER IS TICKEDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
          DataAsync.setData(
            myLoginConstant.REMEMBER_EMAIL,
            this.state.email
          );
          DataAsync.setData(myLoginConstant.REMEMBER_ACCOUNT, "true");
          DataAsync.setData(myLoginConstant.REMEMBER_ID, response.data.user.id);
          DataAsync.setData(
            myLoginConstant.REMEMBER_PASSWORD,
            this.state.password
          );
          DataAsync.setData(myLoginConstant.REMEMBER_USERNAME, response.data.user.username);
          if (!StringUtil.isEmpty(response.data.token)) {
            console.log("response token: ", response.data.token);
            const token = "Bearer " + response.data.token;
            console.log("new token: ", token); // has to do this because the api needs bearer before the token
            DataAsync.setData(myLoginConstant.TOKEN, token);
            dispatch(LoginAction.setToken(token));
          }
        } else {
          console.log("response token: ", response.data.token);
          const token = "Bearer " + response.data.token;
          console.log("new token: ", token); // has to do this because the api needs bearer before the token
          dispatch(LoginAction.setToken(token));
        }
        dispatch(LoginAction.isLoginSuccess(true)); // set to true to move to Home
      }
    } else {
      if (error.request.status === 422) {
        console.log("User does not exist or wrong pass");
        Alert.alert(
          "Notification",
          "User does not exist or wrong pass",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK pressed");
              },
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    }
  }

  // this function is used to render an error message if error whenever users hit the button
  renderError() {
    const { loginErrorMessage } = this.state;
    if (loginErrorMessage !== "") {
      return (
        <Text
          style={{
            marginLeft: 55,
            color: "#DB1E4A",
            fontSize: 12.5
          }}
        >
          {loginErrorMessage}
        </Text>
      );
    }
  }

  onHandleRegister() {
    const { dispatch } = this.props;
    console.log("before entering register");
    dispatch(LoginAction.registerEnter(true));
  }

  handleisRemembered() {
    if (this.state.isRemembered) {
      this.setState({ isRemembered: false });
    } else {
      this.setState({ isRemembered: true });
    }
  }

  // check if the user has clicked remember user before
  async componentWillMount() {
    const email = await DataAsync.getData(myLoginConstant.REMEMBER_EMAIL);
    const isRemembered = await DataAsync.getData(
      myLoginConstant.REMEMBER_ACCOUNT
    );
    const token = await DataAsync.getData(myLoginConstant.TOKEN);
    console.log("username in data async: ", email);
    console.log("is remembered in async: ", isRemembered);
    console.log("token in async: ", token);
    console.log("is login success ??", this.state.isLoginSuccess);
    console.log("ALOOOOOOOOOOOOOOOOOOOOOOOOOs");
    if (isRemembered === "true") {
      const { dispatch } = this.props;
      setTimeout(() => {
        dispatch(LoginAction.setUsername(email)); // set username to current username for later use
      }, 200);
      dispatch(LoginAction.setToken(token));
      dispatch(LoginAction.isLoginSuccess(true)); // set to true to move to Home
    } else {
      DataAsync.removeData(myLoginConstant.REMEMBER_EMAIL);
      DataAsync.removeData(myLoginConstant.REMEMBER_ACCOUNT);
      DataAsync.removeData(myLoginConstant.TOKEN);
      this.props.dispatch(LoginAction.clearLoginState()); //clear the states
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: 700
      }
    });
    const { email, password } = this.state;
    const {
      loginButtonText,
      loginButton,
      loginText,
      signUpButton,
      signUpButtonText,
      findButtonText,
      findButton
    } = LoginStyle;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              style={{
                width: "100%",
                height: "50%"
              }}
              source={images.loginBackGround}
            />

            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 6
                  },
                  loginText
                ]}
              >
                E-mail Address
              </Text>
              {/* border color is the color line under the Input component */}
              <Item
                style={{
                  marginLeft: 50,
                  marginRight: 50,
                  borderColor: "#3399CC"
                }}
              >
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={"email"}
                  inputFontSize={10}
                  inputHeightBase={10}
                  //lineHeight={10}
                  returnKeyType="next"
                  onChangeText={txt => this.setState({ email: txt })}
                  value={email}
                  maxLength={50}
                />
              </Item>

              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 6
                  },
                  loginText
                ]}
              >
                Password
              </Text>

              <Item
                style={{
                  marginBottom: 5,
                  marginLeft: 50,
                  marginRight: 50,
                  borderColor: "#3399CC"
                }}
              >
                <Input
                  placeholder={"password"}
                  inputHeightBase={10}
                  inputFontSize={10}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={txt => this.setState({ password: txt })}
                  value={password}
                  maxLength={20}
                />
              </Item>
              {this.renderError()}
              <CheckBox
                center
                title="Remember user"
                checked={this.state.isRemembered}
                onPress={this.handleisRemembered.bind(this)}
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white",
                  height: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: screen.width - 290
                }}
              />
              <TouchableHighlight
                disabled={false}
                style={loginButton}
                onPress={this.handleLogin.bind(this)}
              >
                <Text style={loginButtonText}>SIGN IN</Text>
              </TouchableHighlight>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    loginText,
                    {
                      marginLeft: 150,
                      marginTop: -5
                    }
                  ]}
                >
                  Forgot password ?
                </Text>

                <TouchableHighlight
                  disabled={false}
                  style={findButton}
                  onPress={() => {
                    console.log("hit");
                  }}
                  fontWeight="bold"
                >
                  <Text style={findButtonText}>FIND IT</Text>
                </TouchableHighlight>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    loginText,
                    {
                      marginLeft: 130
                    }
                  ]}
                >
                  Do not have an account ?
                </Text>

                <TouchableHighlight
                  disabled={false}
                  style={signUpButton}
                  onPress={this.onHandleRegister.bind(this)} // set state to true
                >
                  <Text style={signUpButtonText}>SIGN UP</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  registerEnter: state.LoginReducer.registerEnter,
  email: state.LoginReducer.email,
  password: state.LoginReducer.password,
  id: state.LoginReducer.id
}))(Login);
