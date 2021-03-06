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
import { Header } from "react-native-elements";
import api from "../config/Api";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordTwo: "",
      email: "",
      loginErrorMessage: ""
    };
  }

  // this function is used to render an error message if error whenever users hit the button
  renderError() {
    const { loginErrorMessage } = this.state;
    if (loginErrorMessage !== "") {
      return (
        <Text
          style={{
            marginLeft: 55,
            marginTop: 12,
            color: "#DB1E4A",
            fontSize: 12.5
          }}
        >
          {loginErrorMessage}
        </Text>
      );
    }
  }

  checkEmail(email) {
    console.log("email to check: ", email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  handleRegister() {
    const { username, password, passwordTwo, email } = this.state;
    //api.register(payload, this.onHandle.bind(this));
    // check if all the inputs are valid or not
    if (
      password === passwordTwo &&
      password !== "" &&
      username !== "" &&
      username.length <= 50 &&
      password.length <= 20 &&
      email !== "" &&
      email.length <= 100 &&
      this.checkEmail(email)
    ) {
      this.setState({
        // reset error message
        loginErrorMessage: ""
      });
      const payload = { email, username, password };
      console.log("payload in handle register: ", payload);
      setTimeout(() => {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to register ?",
          [
            {
              text: "No",
              onPress: () => {
                console.log("cancel pressed");
              },
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: async () => {
                // if valid then we send data to our api to handle
                this.props.dispatch(LoginAction.registerEnter(false)); // false so we can return to our login component
                await api.register(payload, this.handleRegisterResponse.bind());
              }
            }
          ],
          { cancelable: true }
        );
      }, 200);
    } else {
      // check if input are valid or not
      if (username.length > 50 || password.length > 20 || email.length > 100) {
        this.setState({
          loginErrorMessage:
            "Username, password or email length is too long (max 50 and 20)"
        });
      } else if (username === "" || password === "" || email === "") {
        this.setState({
          loginErrorMessage: "Please type username, password and email"
        });
      } else if (passwordTwo === "") {
        this.setState({ loginErrorMessage: "Please type again your password" });
      } else if (password !== passwordTwo) {
        this.setState({ loginErrorMessage: "Two passwords are not identical" });
      } else if (!this.checkEmail(email)) {
        this.setState({ loginErrorMessage: "Invaid email syntax" });
      } else {
        this.setState({
          loginErrorMessage: "There is something wrong, please try again"
        });
      }
    }
  }

  handleRegisterResponse(isSuccess, response, error) {
    if (isSuccess) {
      console.log("is success", response);
      Alert.alert(
        "Notification",
        "You have successfully registered. You can now use your newly account to login to the application",
        [
          {
            text: "OK"
          }
        ]
      );
    } else {
      console.log("error: ", error);
      if (error.request.status === 500) {
        Alert.alert("Notification", "There is an error with the server !", [
          {
            text: "OK",
            onPress: () => {}
          }
        ]);
      } else {
        Alert.alert("Notification", "Email may already exists", [
          {
            text: "OK",
            onPress: () => {}
          }
        ]);
      }
    }
  }

  handleCancel() {
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(LoginAction.registerEnter(false)); // false so we can return to our login component
    }, 200);
  }

  render() {
    const {
      loginButtonText,
      loginButton,
      loginText,
      signUpButton,
      signUpButtonText,
      findButtonText,
      findButton
    } = LoginStyle;
    const { username, password, passwordTwo, email } = this.state;
    const temp = "Type something ...";
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Header
              containerStyle={{
                backgroundColor: "#3FA1F6",
                justifyContent: "center",
                height: 70
              }}
              centerComponent={{
                text: "SIGN UP STATION",
                style: {
                  color: "#FFFFFF",
                  fontSize: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 25,
                  fontWeight: "bold"
                }
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 50
              }}
            >
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 12
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
                  borderColor: "#3FA1F6"
                }}
              >
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={temp}
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
                    marginTop: 12
                  },
                  loginText
                ]}
              >
                Username
              </Text>
              {/* border color is the color line under the Input component */}
              <Item
                style={{
                  marginLeft: 50,
                  marginRight: 50,
                  borderColor: "#3FA1F6"
                }}
              >
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={temp}
                  inputFontSize={10}
                  inputHeightBase={10}
                  //lineHeight={10}
                  returnKeyType="next"
                  onChangeText={txt => this.setState({ username: txt })}
                  value={username}
                  maxLength={50}
                />
              </Item>

              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 12
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
                  placeholder={temp}
                  inputHeightBase={10}
                  inputFontSize={10}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={txt => this.setState({ password: txt })}
                  value={password}
                  maxLength={20}
                />
              </Item>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 12
                  },
                  loginText
                ]}
              >
                Type your password again
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
                  placeholder={temp}
                  inputHeightBase={10}
                  inputFontSize={10}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={txt => this.setState({ passwordTwo: txt })}
                  value={passwordTwo}
                  maxLength={20}
                />
              </Item>
              {this.renderError()}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50
                }}
              >
                <TouchableHighlight
                  disabled={false}
                  style={loginButton}
                  onPress={this.handleRegister.bind(this)}
                >
                  <Text style={loginButtonText}>SIGN UP</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  disabled={false}
                  style={loginButton}
                  onPress={this.handleCancel.bind(this)}
                >
                  <Text style={loginButtonText}>CANCEL</Text>
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
  registerEnter: state.LoginReducer.registerEnter
}))(Register);
