import React, { Component } from "react";
import { Item, Input } from "native-base";
import LoginStyle from "../assets/styles/LoginStyle";
import { connect } from "react-redux";
import UserInfoAction from "../redux/actions/UserInfoAction";
import StringUtil from "../utils/StringUtils";
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
import api from "../config/Api";
import validation from "../utils/validations/Validation";
import DataAsync from "../utils/DataAsync";
import { myLoginConstant } from "../utils/Constants";
import LoginAction from "../redux/actions/LoginAction";

class PasswordChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newpassword: "",
      newAgain: "",
      loginErrorMessage: ""
    };
  }

  handleConfirm() {
    const { password, id } = this.props;
    if (
      password === this.state.password &&
      this.state.newAgain === this.state.newpassword &&
      this.state.newpassword.length <= 20 && this.state.password !== this.state.newpassword
    ) {
      setTimeout(() => {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to change your password ?",
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
                const { password, newpassword } = this.state;
                const payload = { id, data: { password, newpassword } };
                console.log("Password before confirm changing: ", payload);
                api.changePassword(
                  payload,
                  this.onHandleChangePassword.bind(this)
                );
              }
            }
          ],
          { cancelable: true }
        );
      }, 200);
    } else {
      if (password !== this.state.password) {
        this.setState({ loginErrorMessage: "old password incorrect !!" });
      } else if (this.state.newpassword !== this.state.newAgain) {
        this.setState({ loginErrorMessage: "Two passwords are not identical" });
			}
			else if (this.state.password === this.state.newpassword) {
				this.setState({ loginErrorMessage: "old and new passwords must be different !!" });
			}
			else {
				this.setState({ loginErrorMessage: "password inputs invalid !!" });
			}
    }
  }

  async onHandleChangePassword(isSuccess, response, error) {
    if (isSuccess) {
			console.log("response: ", response);
			const remember = await DataAsync.getData(myLoginConstant.REMEMBER_ACCOUNT);
			const payload = this.state.changePassword;
			if (remember !== null) { // if remember !== null then we need to store our new password into async and redux
				DataAsync.setData(myLoginConstant.REMEMBER_PASSWORD, this.state.newpassword);
				this.props.dispatch(LoginAction.setPassword(payload));
			}
			else { //if user does not tick remember => only store in redux to use
				this.props.dispatch(LoginAction.setPassword(payload));
			}
			Alert.alert(
				"Notification",
				"You have changed your password successfully",
				[
					{
						text: "OK",
						onPress: () => {
							console.log("OK pressed");

							console.log(
								"this props param navigation: ",
								this.props.navigation.state.params
							);
							this.props.navigation.navigate('Drawer');
						},
						style: "cancel"
					}
				],
				{ cancelable: false }
			);
    } else {
      console.log("Error: ", error);
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

  handleCancel() {
    this.props.navigation.navigate("Drawer");
  }

  render() {
    const { password, newpassword, newAgain } = this.state;
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
        <View style={{ flex: 1, marginTop: 20 }}>
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
                  marginTop: 12
                },
                loginText
              ]}
            >
              Your old password
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
                //placeholder={'Age'}
                inputFontSize={10}
                inputHeightBase={10}
                secureTextEntry
                //lineHeight={10}
                returnKeyType="next"
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
              Your new password
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
                //placeholder={'password'}
                inputHeightBase={10}
                inputFontSize={10}
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ newpassword: txt })}
                value={newpassword}
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
              Type your new password again
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
                //placeholder={'password'}
                inputHeightBase={10}
                inputFontSize={10}
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ newAgain: txt })}
                value={newAgain}
                maxLength={20}
              />
            </Item>
            {this.renderError()}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginBottom: 50
              }}
            >
              <TouchableHighlight
                disabled={false}
                style={[
                  {
                    marginTop: 100
                  },
                  loginButton
                ]}
                onPress={this.handleConfirm.bind(this)}
              >
                <Text style={loginButtonText}>CONFIRM</Text>
              </TouchableHighlight>

              <TouchableHighlight
                disabled={false}
                style={[
                  {
                    marginBottom: 200
                  },
                  loginButton
                ]}
                onPress={this.handleCancel.bind(this)}
              >
                <Text style={loginButtonText}>CANCEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  password: state.LoginReducer.password,
  id: state.LoginReducer.id
}))(PasswordChanger);
