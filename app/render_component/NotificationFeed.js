import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from "react-native";
import images from "../assets/image_source/Images";
import Swipeout from "react-native-swipeout";
import ActionButton from "react-native-action-button"; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from "../render_component/ModalFeedback";
import { withNavigation } from "react-navigation";
import api from "../config/Api";
import StringUtil from "../utils/StringUtils";
import { Content, Container } from "native-base";
import IconNotification from "../render_component/IconNotification";
import styles from "../assets/styles/sideBarStyle";
import { connect } from "react-redux";
import socketUtil from "../startSocketIO";

const { width } = Dimensions.get("window");

const flatStyles = StyleSheet.create({
  flatListItem: {
    color: "black",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 10,
    fontSize: 16
  },
  imgStyle: {
    width: 50,
    height: 50,
    margin: width / 40,
    borderRadius: width / 10
  },
  buttonStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: 100
  }
});

class NotificationFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  getNotificationDetails() {
    Alert.alert(
      "Notification",
      this.props.data[this.props.item.index].content,
      [{ text: "OK", onPress: this.handlePressed.bind(this), style: "cancel" }],
      { cancelable: false }
    );
  }

  async handlePressed() {
    const { data, item } = this.props;
    console.log("noti id: ", data[item.index].id);
    const payload = { notiIds: [data[item.index].id] };
    await api.markAsRead(payload, this.onHandleMarkAsRead.bind(this));
  }

  onHandleMarkAsRead(isSuccess, response, error) {
    if (isSuccess) {
      this.props.refresh._onRefresh();
    } else {
      Alert.alert(
        "Notification",
        "Sorry, there is something wrong with our server, your feedback cannot be sent !",
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

  render() {
    const { container, sbInfo } = styles;
    return (
      <ScrollView>
        {/* <TouchableOpacity onPress={this.getProfile.bind(this)}> */}
        <View style={{ flex: 1, flexDirection: "column" }}>
          <IconNotification
            source={images.alarm}
            onPress={this.getNotificationDetails.bind(this)}
            content={
              this.props.item.item +
              " at " +
              this.props.data[this.props.item.index].createdAt
            }
            status={this.props.data[this.props.item.index].status}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket
}))(NotificationFeed);
