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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      phoneNumber: "",
      gender: "",
      city: "",
      facebookLink: "",
      profileErrorMessage: ""
    };

    this.onHandleSetInfo = this.onHandleSetInfo.bind(this);
  }

  // this will be used to check state values before rendering.
  // send username with token to receive information
  async componentWillMount() {
    // we need to call api to get user info first, after that use data async to store.
    console.log("id in will mount profileeeeeeeeeee: ", this.props.id);
    const payload = this.props.id; // if redux is null then we take from data sync
    await api.getOneInfo(payload, this.onGetCurrentUser.bind(this));
  }

  onGetCurrentUser(isSuccess, response, error) {
    if (isSuccess) {
      console.log("response: ", response);
      const { age, phoneNumber, gender, city, facebookLink } = response.data;
      this.setState({
        age: age,
        phoneNumber: phoneNumber,
        gender: gender,
        city: city,
        facebookLink: facebookLink
      });
      console.log("state: ", this.state.age);
    } else {
      console.log("error: ", error);
    }
  }

  renderError() {
    const { profileErrorMessage } = this.state;
    if (profileErrorMessage !== "") {
      return (
        <Text
          style={{
            marginLeft: 55,
            marginTop: 12,
            color: "#DB1E4A",
            fontSize: 12.5
          }}
        >
          {profileErrorMessage}
        </Text>
      );
    }
  }

  async handleConfirm() {
    const { age, phoneNumber, gender, city, facebookLink } = this.state;
    // age and phone number must be numbers
    if (
      validation.isNumber(age) &&
      validation.isNumber(phoneNumber) &&
      (gender === "F" || gender === "M") &&
      age >= 10 &&
      age <= 100 &&
      !StringUtil.isEmpty(phoneNumber) &&
      !StringUtil.isEmpty(city) &&
      !StringUtil.isEmpty(facebookLink)
    ) {
      this.setState({ profileErrorMessage: "" });
      //const username = this.props.navigation.getParam('username');
      const id = this.props.id;
      // payload like this to suit the api, with userId for url, and data for data for api
      const payload = {
        id,
        data: { age, phoneNumber, gender, city, facebookLink }
      };
      console.log("Before calling api");
      api.setInfo(payload, this.onHandleSetInfo.bind());
    } else {
      if (!validation.isNumber(age) || !validation.isNumber(phoneNumber)) {
        this.setState({
          profileErrorMessage: "Age and phone number inputs invalid"
        });
      } else if (gender !== "F" && gender !== "M") {
        this.setState({
          profileErrorMessage: "Gender should be 'F' or 'M' only"
        });
      } else if (age < 10 || age > 100) {
        this.setState({
          profileErrorMessage:
            "Sorry you are too young or too old to use this app"
        });
      } else {
        this.setState({
          profileErrorMessage: "You have to fill all of your information !!"
        });
      }
    }
  }

  async onHandleSetInfo(isSuccess, response, error) {
    if (isSuccess) {
      console.log("success: ", response);
      const remember = await DataAsync.getData(
        myLoginConstant.REMEMBER_ACCOUNT
      );
      console.log("remember on Handle: ", remember);
      Alert.alert(
        "Notification",
        "You have edited your profile successfully",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");

              console.log(
                "this props param navigation: ",
                this.props.navigation.state.params
              );
              const { navigate } = this.props.navigation.state.params;
              navigate("Drawer");
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      console.log("error: ", error);
    }
  }

  handleCancel() {
    const { navigate } = this.props.navigation.state.params;
    navigate("Drawer"); // get back to the drawer screen
  }

  render() {
    const { age, phoneNumber, city, gender, facebookLink } = this.state;
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
              Your age
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
                //lineHeight={10}
                returnKeyType="next"
                onChangeText={txt => this.setState({ age: txt })}
                value={age.toString()}
                maxLength={5}
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
              Telephone number
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
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ phoneNumber: txt })}
                value={phoneNumber}
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
              City
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
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ city: txt })}
                value={city}
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
              Gender
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
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ gender: txt })}
                value={gender}
                maxLength={2}
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
              Facebook link
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
                underlineColorAndroid="transparent"
                onChangeText={txt => this.setState({ facebookLink: txt })}
                value={facebookLink}
                maxLength={50}
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
  age: state.UserInfoReducer.age,
  gender: state.UserInfoReducer.gender,
  phoneNumber: state.UserInfoReducer.phoneNumber,
  city: state.UserInfoReducer.city,
  id: state.LoginReducer.id
}))(Profile);
