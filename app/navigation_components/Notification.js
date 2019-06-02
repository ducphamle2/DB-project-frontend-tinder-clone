import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
import images from "../assets/image_source/Images";
import Swipeout from "react-native-swipeout";
import ActionButton from "react-native-action-button"; // doc: https://github.com/mastermoo/react-native-action-button
import AddModal from "../render_component/AddModal";
import NotificationFeed from "../render_component/NotificationFeed";
import SearchInput, { createFilter } from "react-native-search-filter";
import FakeData from "../config/FakeData";
import { ScrollView } from "react-native-gesture-handler";
import api from "../config/Api";
import UserInfoAction from "../redux/actions/UserInfoAction";
import { connect } from "react-redux";
import StringUtil from "../utils/StringUtils";
import DataAsync from "../utils/DataAsync";
import { myLoginConstant } from "../utils/Constants";
import LoginAction from "../redux/actions/LoginAction";
const { width, height } = Dimensions.get("window");

export default class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    }
    this.refreshList = this.refreshList.bind(this);
  }

  componentWillMount() {
    api.getNotification(this.onHandleGetNotification.bind(this));
  }

  onHandleGetNotification(isSuccess, response, error) {
    if (isSuccess) {
      this.setState({notifications: response.data});
    }
  }

  extractHeaderFilter(filteredUser) {
    const headerData = [];
    for (let i = 0; i < filteredUser.length; i++) {
      headerData[i] = filteredUser[i].header;
    }
    return headerData;
  }

  async refreshList() {
    await api.getNotification(this.onHandleGetNotification.bind(this));
  }

  render() {
    const headerData = this.extractHeaderFilter(this.state.notifications);
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          //backgroundColor: "#3FA1F6",
          maxHeight: height / 2,
          width: width - 30,
					justifyContent: 'center',
					flexDirection: 'column',
        }}
      >
        <FlatList
          data={headerData}
          renderItem={(item, index) => {
            console.log("Item: ", item.item); //item is an object which consists of item name, item index, ...
            //console.log('index: ', item.index);
            //let i = this.getIndex(item.item);
            //console.log('correct index in fake dataaaaaaaaa: ', i);
            //console.log('correct data: ', array[i]);
            return (
              <NotificationFeed
                item={item}
                index={index}
                refresh={this}
                flag={true}
                data={this.state.notifications}
                //newData={FakeData.data[i].uri[0].uri}
                //trueIndex={i} // true index of an item in our data sent by api
                //trueData={this.state.array}
                title={"Notification"}
                //data={this.state.array}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
