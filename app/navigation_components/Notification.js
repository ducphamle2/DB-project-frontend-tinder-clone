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
import socketUtil from "../startSocketIO";

const { width, height } = Dimensions.get("window");

class Notification extends Component {
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
    payload = {
      limit: 20,
      offset: 0
    };
    api.getNotification(payload, this.onHandleGetNotification.bind(this), 1); // load from scratch
  }

  // replicate CWP notification file
  componentDidMount() {
    this.props.navigation.setParams({
      handleMarkAsReadAll: () => this.markAsReadAll()
    });
  }

  onHandleGetNotification(isSuccess, response, error, type) {
    if (isSuccess) {
      // if it is will mount or we refresh the page => get the first 20 notifications only
      if (type === 1) {
        console.log('TYPE EQUAL TO 1')
        this.setState({
          notifications: response.data,
          loading: false,
          refreshing: false
        });

        this.props.dispatch(UserInfoAction.setNotification(response.data));
      } else {
        console.log("TYPE EQUALS TO 2");
        // we need to append the notifications we have not loaded yet in the server
        const data = this.props.notification;
        // push more notifications in the list.
        for (let i = 0; i < response.data.length; i++) {
          data.push(response.data[i]);
        }

        this.props.dispatch(UserInfoAction.setNotification(data));

        this.setState({
          notifications: data,
          loading: false,
          refreshing: false
        });
      }
    } else {
      if (response.request.status === 500) {
        Alert.alert(
          "Notification",
          "There is something wrong with our server. Sorry !!",
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
        Alert.alert(
          "Notification",
          "Unknown error !!",
          [
            {
              text: "OK",
              onPress: () => {},
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
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
    console.log("load more");
    console.log('length of notification now: ', this.props.notification.length);
    setTimeout(async () => {
      payload = {
        limit: 20,
        offset: this.props.notification.length
      };
      await api.getNotification(
        payload,
        this.onHandleGetNotification.bind(this),
        2
      );
    }, 500);
  }

  _onRefresh() {
    this.setState({ refreshing: true }, async () => {
      payload = {
        limit: 20,
        offset: 0
      };
      await api.getNotification(
        payload,
        this.onHandleGetNotification.bind(this),
        1
      );
    });
  }

  render() {
    const headerData = this.extractHeaderFilter(this.state.notifications);
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          marginTop: 60,
          marginLeft: width / 25,
          marginRight: width / 10,
          //backgroundColor: "#3FA1F6",
          maxHeight: height / 1.5,
          width: width - 30,
          justifyContent: "center",
          flexDirection: "column",
          borderColor: "black",
          borderWidth: 1
        }}
      >
        <FlatList
          data={headerData}
          renderItem={(item, index) => {
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

export default connect(state => ({
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket,
  notification: state.UserInfoReducer.notification
}))(Notification);
