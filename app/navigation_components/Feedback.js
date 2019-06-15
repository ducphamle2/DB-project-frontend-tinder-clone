import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Alert,
  Button
} from "react-native";
import images from "../assets/image_source/Images";
import Swipeout from "react-native-swipeout";
import ActionButton from "react-native-action-button"; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from "../render_component/ModalFeedback";
import FlatListItem from "../navigation_components/FlatListItem";
import FakeData from "../config/FakeData";
import api from "../config/Api";
import socketUtil from "../startSocketIO";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

const data = [
  {
    key: 1,
    value: "noob"
  },
  {
    key: 2,
    value: "noob2"
  }
];

// these will be the headers

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
      data: [],
      trueData: [],
      loading: false,
      page: 1,
      refreshing: false
    };
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  handleAddButton() {
    this.refs.addModal.showAddModal();
  }

  // get data from db
  async componentWillMount() {
    // this.state.data = redux data ?
    await api.getFeedback(this.onHandleGetFeedback.bind(this));
  }

  onHandleGetFeedback(isSuccess, response, error) {
    if (isSuccess) {
      if (response.data.length === 0) {
        this.setState({
          data: response.data,
          loading: false,
          refreshing: false
        }); // if no data then get that array
        console.log("data empty");
      } else {
        const temp = [];
        for (let i = 0; i < response.data.length; i++) {
          temp[i] = response.data[i].header; //get the content of data
        }
        this.setState({
          data: temp,
          loading: false,
          refreshing: false,
          trueData: response.data
        });
      }
    } else {
      if (error.request.status === 500) {
        Alert.alert(
          "Notification",
          "There is something wrong with our server. Sorry !",
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
      } else {
        Alert.alert(
          "Notification",
          "Unknown errors detected",
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
  }

  // this function will be used to set state which makes the Home component render again - refresh our list
  refreshFlatList = async () => {
    this.setState({ isDeleted: true });
    await api.getFeedback(this.onHandleGetFeedback.bind(this));
  };

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
      await api.getFeedback(this.onHandleGetFeedback.bind(this));
    }, 500);
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => {
      this.refreshFlatList();
    });
  }

  // this function will return the correct index of items in flatListItems
  getIndex(headerData, item) {
    for (let i = 0; i < headerData.length; i++) {
      if (item === headerData[i]) {
        return i;
      }
    }
  }

  render() {
    const { data, trueData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={(item, index) => {
            console.log("Item: ", item.item); //item is an object which consists of item name, item index, ...
            console.log("index: ", item.index);
            let i = this.getIndex(data, item.item);
            return (
              // parentFlatList
              // need to pass an array of object pic url, and then we scan its index
              // in the FlatListItem. If it matched then we get that url from that index.
              <FlatListItem
                item={item}
                index={index}
                refresh={this}
                flag={false}
                trueData={trueData}
                trueIndex={i}
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
        <ActionButton
          buttonColor="#DF2929"
          onPress={this.handleAddButton.bind()}
        />

        <ModalFeedback
          ref={"addModal"}
          parentFlatList={this}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default connect(state => ({
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket
}))(Feedback);
