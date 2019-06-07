import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity
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
import Tick from "../render_component/Tick";

const { width, height } = Dimensions.get("window");

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: false,
      page: 1,
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Notification",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
        marginRight: 60
      },
      headerStyle: {
        backgroundColor: "#3FA1F6",
        zIndex: 100
      },
      headerTintColor: "#FFFFFF",
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.handleMarkAsReadAll();
            }}
          >
            <Image
              style={{ marginRight: 5, tintColor: "#FFFFFF" }}
              source={images.list}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentWillMount() {
    api.getNotification(this.onHandleGetNotification.bind(this));
  }

  // replicate CWP notification file
  componentDidMount() {
    this.props.navigation.setParams({
      handleMarkAsReadAll: () => this.markAsReadAll()
    });
  }

  onHandleGetNotification(isSuccess, response, error) {
    if (isSuccess) {
      this.setState({
        notifications: response.data,
        loading: false,
        refreshing: false
      });
    }
  }

  // this function will mark all the notifications as read
  async markAsReadAll() {
    console.log("notifications currently: ", this.state.notifications);
    let payload = {
      notiIds: []
    };
    for (let i = 0; i < this.state.notifications.length; i++) {
      if (this.state.notifications[i].status === "unseen") {
        // check if any noti is unseen so add into a list
        payload.notiIds.push(this.state.notifications[i].id); // has to be this type of data to match
      }
    }

    console.log("payload after checking: ", payload);
    if (payload.notiIds.length === 0) {
      Alert.alert(
        "Notification",
        "All the notifications have been read before !!",
        [
          {
            text: "OK",
            onPress: () => {},
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      await api.markAsRead(payload, this.onHandleMarkAllRead.bind(this)); // mark all the noti in the list as read
    }
  }

  onHandleMarkAllRead(isSuccess, response, error) {
    if (isSuccess) {
      Alert.alert(
        "Notification",
        "Successfully read all the notifications !",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.navigate("Home");
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Notification",
        "Something is wrong !",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.navigate("Home");
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  }

  extractHeaderFilter(filteredUser) {
    const headerData = [];
    for (let i = 0; i < filteredUser.length; i++) {
      headerData[i] = filteredUser[i].header;
    }
    return headerData;
  }

  // this helps rendering a loading indicator for responsive frontend
  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="medium" />
      </View>
    );
  };

  handleLoadMore() {
    setTimeout(async () => {
      await api.getNotification(this.onHandleGetNotification.bind(this));
    }, 500);
  }

  _onRefresh() {
    this.setState({ refreshing: true }, async () => {
      await api.getNotification(this.onHandleGetNotification.bind(this));
    });
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
          justifyContent: "center",
          flexDirection: "column"
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
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          onScrollEndDrag={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={10}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
