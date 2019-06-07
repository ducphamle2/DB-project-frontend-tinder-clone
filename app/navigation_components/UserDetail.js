import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import LoginStyle from "../assets/styles/LoginStyle";
import { connect } from "react-redux";
import TitleName from "../render_component/TitleName";
import StringUtil from '../utils/StringUtils';

class UserDetail extends Component {
  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    goBack("Feedback");
    console.log("state in user detail: ", params);
    const {
      loginButtonText,
      loginButton,
      loginText,
      signUpButton,
      signUpButtonText,
      findButtonText,
      findButton
    } = LoginStyle;
    if (this.props.title === TitleName.thirdTitle) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ flex: 1, marginTop: 30 }}>
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
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Username
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.username) ? "No info" : params.username}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                City
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.city) ? "No info" : params.city}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Age
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.age) ? "No info" : params.age}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Gender
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.gender) ? "No info" : params.gender}
              </Text>
							<Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 25,
                  },
                  loginText
                ]}
              >
                Phone number
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 20,
									color: 'red'
                }}
              >
                {StringUtil.isEmpty(params.phoneNumber) ? "No info" : params.phoneNumber}
              </Text>
							<Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 25
                  },
                  loginText
                ]}
              >
                Facebook link
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 20,
									color: 'red',
                }}
              >
                {StringUtil.isEmpty(params.facebookLink) ? "No info" : params.facebookLink}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ flex: 1, marginTop: 30 }}>
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
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Username
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.username) ? "No info" : params.username}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                City
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.city) ? "No info" : params.city}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Age
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.age) ? "No info" : params.age}
              </Text>
              <Text
                style={[
                  {
                    marginLeft: 55,
                    marginTop: 20,
                    fontSize: 20
                  },
                  loginText
                ]}
              >
                Gender
              </Text>
              <Text
                style={{
                  marginLeft: 55,
                  marginRight: 10,
                  marginTop: 20,
                  fontSize: 15
                }}
              >
                {StringUtil.isEmpty(params.gender) ? "No info" : params.gender}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

export default connect(state => ({
  title: state.UserInfoReducer.title
}))(UserDetail);
