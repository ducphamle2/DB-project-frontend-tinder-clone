import React, { Component } from "react";
import {
  // StackActions,
  createDrawerNavigator,
  createStackNavigator,
  DrawerActions
} from "react-navigation";
import { TouchableOpacity, Image, View } from "react-native";
import { StyleSheet, Dimensions, Text } from "react-native";
import images from "../assets/image_source/Images";
import DropdownMenu from "react-native-dropdown-menu";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import UserInfoAction from "../redux/actions/UserInfoAction";

// this class is used to get custom component for the header (dropdown)
class LogoTitle extends Component {
  componentWillMount() {
  }

  changeText() {}

  render() {
    let data = [
      {
        value: "People you may like"
      },
      {
        value: "Liked list"
      },
      {
        value: "Matched list"
      }
    ];

    const { dispatch } = this.props;
    return (
      // link doc for Dropdown component: https://reactnativeexample.com/material-dropdown-with-consistent-behaviour-on-ios-and-android/
      <View style={{ flex: 1, tintColor: "#FFFFFF" }}>
        <Dropdown
          //label='All Contacts'
          data={data}
          value={data[0].value}
          dropdownPosition={0}
          containerStyle={{ marginRight: 60, marginLeft: 30, marginBottom: 23 }}
          fontSize={18}
          baseColor={"#FFFFFF"}
          textColor={"#FFFFFF"}
          itemColor={"#000000"}
          selectedItemColor={"#3FA1F6"}
          fontWeight={"bold"}
          onChangeText={(value, index, data) => {
            console.log("data on change text: ", value);
						dispatch(UserInfoAction.updateTitle(value));
          }}
        />
      </View>
    );
  }
}

export default connect(state => ({
	image: state.UserInfoReducer.image,
	title: state.UserInfoReducer.title,
}))(LogoTitle);
