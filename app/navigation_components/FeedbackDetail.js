import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import LoginStyle from "../assets/styles/LoginStyle";
import { connect } from "react-redux";
import socketUtil from "../startSocketIO";

class FeedbackDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    goBack("Feedback");
    console.log("state in detail: ", params);

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
              Header
            </Text>
            <Text
              style={{
                marginLeft: 55,
                marginRight: 10,
                marginTop: 20,
                fontSize: 15
              }}
            >
              {params.header}
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
              Content
            </Text>
            <Text
              style={{
                marginLeft: 55,
                marginRight: 10,
                marginTop: 20,
                fontSize: 15
              }}
            >
              {params.content}
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
              Feedback sent time
            </Text>
            <Text
              style={{
                marginLeft: 55,
                marginRight: 10,
                marginTop: 20,
                fontSize: 15
              }}
            >
              {params.createdAt}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket
}))(FeedbackDetail);
