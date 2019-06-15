import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Alert,
  Button,
  ActivityIndicator
} from "react-native";
import images from "../assets/image_source/Images";
import Swipeout from "react-native-swipeout";
import ActionButton from "react-native-action-button"; // doc: https://github.com/mastermoo/react-native-action-button
import AddModal from "../render_component/AddModal";
import FlatListItem from "../navigation_components/FlatListItem";
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
import socketIO from "socket.io-client";
import TitleName from "../render_component/TitleName";
import socketUtil from '../startSocketIO';

const KEYS_TO_FILTERS = ["username"]; // key used in filter

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

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
      data: "",
      array: [],
      isClicked: false,
      title: "",
      loading: false,
      page: 1,
      refreshing: false
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    this.extractImageUrlFilter = this.extractImageUrlFilter.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.extractHeaderFilter = this.extractHeaderFilter.bind(this);

    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
      //Put your code here you want to rerender, in my case i want to rerender the data 
      //im fetching from firebase and display the changes
      // solution from: https://github.com/react-navigation/react-navigation/issues/922

      //this.componentDidMount();
    });
  }

  //componentWillUnmount() {
  //  this.reRenderSomething;
  //}

  /* this will call the api to get all the information we need about possible liked candidates including pictures, names, etc...
		Correct data type: 
		response = [
			{
				'name': 'abc',
				'url': 'xyz',...
			},
			{

			}
		]
	*/

  async componentWillMount() {
    const { dispatch, id, password, email } = this.props;
    console.log("before getting likable users");
    //await api.getInfo(this.onGetInfoHandle.bind(this));
    if (
      StringUtil.isEmpty(id) ||
      StringUtil.isEmpty(password) ||
      StringUtil.isEmpty(email)
    ) {
      // if in redux have no id => user ticks remember => get from data async
      const id = await DataAsync.getData(myLoginConstant.REMEMBER_ID);
      const password = await DataAsync.getData(
        myLoginConstant.REMEMBER_PASSWORD
      );
      const username = await DataAsync.getData(
        myLoginConstant.REMEMBER_USERNAME
      );
      const email = await DataAsync.getData(myLoginConstant.REMEMBER_EMAIL);
      console.log("userID when remembering: ", id);
      console.log("user password when remembering: ", password);
      const payload = { username, id, email, password };
      //dispatch(LoginAction.setId(userId)); // set id for Profile to use
      await dispatch(LoginAction.setUserInfo(payload));
    } else {
      // do nothing because already have id in redux
    }
    console.log("id in component will mount home: ", id);

    dispatch(UserInfoAction.updateTitle(TitleName.firstTitle));
  }

  componentDidMount() {
    socketUtil.socketFunc(this.props.socket, this.props.id);
  }

  onGetInfoHandle(isSuccess, response, error) {
    if (isSuccess) {
      this.setState({
        array: response.data,
        title: this.props.title,
        loading: false,
        refreshing: false
      });
    } else {
      console.log("error in Home: ", error);
      Alert.alert(
        "Notification",
        "There is something wrong when getting likable users !!",
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
    // this.extractImageUrlFilter(); //extract url for images
  }

  onHandleLikedUsers(isSuccess, response, error) {
    if (isSuccess) {
      console.log("response LIKED USERRRRRRRRRRRRRRRR: ", response);
      this.setState({
        array: response.data,
        title: this.props.title,
        loading: false,
        refreshing: false
      });
    } else {
      console.log("error: ", error);
      Alert.alert(
        "Notification",
        "There is something wrong with getting liked users",
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

  onHandleMatched(isSuccess, response, error) {
    console.log("die in here");
    if (isSuccess) {
      console.log("response LIKED USERRRRRRRRRRRRRRRR: ", response);
      this.setState({
        array: response.data,
        title: this.props.title,
        loading: false,
        refreshing: false
      });
    } else {
      Alert.alert(
        "Notification",
        "There is something wrong with getting matched users",
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

  handleAddButton() {
    this.refs.addModal.showAddModal();
  }

  // this function will be used to set state which makes the Home component render again - refresh our list
  refreshFlatList = async () => {};

  refresh(trueIndex) {
    const data = this.state.array;
    data.splice(trueIndex, 1);
    this.setState({ array: data });
    console.log("after splicing index: ", this.state.array);
  }

  renderHeader = () => {
    return (
      <SearchInput // https://www.npmjs.com/package/react-native-search-filter
        placeholder="Type an username to search"
        onChangeText={txt => this.setState({ data: txt })}
        style={{
          height: 50,
          borderBottomColor: "gray",
          marginLeft: 10,
          marginBottom: 10,
          borderBottomWidth: 1
        }}
      />
    );
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
    console.log("LOADMORERRRRRRRRRRRRRRR");
    if (this.props.title === TitleName.firstTitle) {
      setTimeout(async () => {
        await api.getInfo(this.onGetInfoHandle.bind(this));
      }, 500);
    } else if (this.props.title === TitleName.secondTitle) {
      setTimeout(async () => {
        await api.getLikedUsers(this.onHandleLikedUsers.bind(this));
      }, 500);
    }
  }

  _onRefresh() {
    console.log("REFRESHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHh");
    this.setState({ refreshing: true }, async () => {
      if (this.props.title === TitleName.firstTitle) {
        await api.getInfo(this.onGetInfoHandle.bind(this));
      } else if (this.props.title === TitleName.secondTitle) {
        await api.getLikedUsers(this.onHandleLikedUsers.bind(this));
      }
      else if (this.props.title === TitleName.thirdTitle) {
        await api.getMatched(this.onHandleMatched.bind(this));
      }
    });
  }

  // this function is used to extract the header of an array object for flat list render
  extractHeaderFilter(filteredUser) {
    const headerData = [];
    for (let i = 0; i < filteredUser.length; i++) {
      headerData[i] = filteredUser[i].username;
    }
    return headerData;
  }

  // this filters out the correct data when searchings
  extractDataFilter(filteredUser) {
    const newData = [];
    for (let i = 0; i < filteredUser.length; i++) {
      newData[i] = filteredUser[i];
    }
    return newData;
  }

  // filter from the images we got from the api for current user info
  extractImageUrlFilter() {
    const uri = [];
    for (let i = 0; i < FakeData.data.length - 1; i++) {
      uri[i] = FakeData.images[i];
    }
    const { dispatch } = this.props;
    console.log("uri in extract: ", uri);
    dispatch(UserInfoAction.updateImage(uri)); // dispatch to use in image profile and render pictures
  }

  // this function will return the correct index of items in flatListItems
  getIndex(data, item) {
    for (let i = 0; i < data.length; i++) {
      if (item === data[i].username) {
        return i;
      }
    }
  }

  render() {
    const { array, isClicked } = this.state;
    // below line will filter the value of the key that we pass in KEYS_TO_FILTERS, FakeData.data is our object
    const filteredUser = array.filter(
      createFilter(this.state.data, KEYS_TO_FILTERS)
    );
    //const filteredUser = this.state.array.filter(createFilter(this.state.data, KEYS_TO_FILTERS));
    const headerData = this.extractHeaderFilter(filteredUser);
    console.log("headerData after filtering: ", headerData);

    // check if the Dropdown menu changes its value or not => we can catch it to rerender our Home
    const { title } = this.props;
    console.log("title when rendering home: ", title);
    if (StringUtil.isEmpty(title)) {
      console.log("empty title before rendering home");
    } else {
      console.log("this.state.title: ", this.state.title);
      if (title === TitleName.firstTitle && this.state.title !== title) {
        console.log("before getting likable users");
        api.getInfo(this.onGetInfoHandle.bind(this));
      } else if (
        title === TitleName.secondTitle &&
        this.state.title !== title
      ) {
        // testingggggggggggggggggggggggggggggggggggggg
        api.getLikedUsers(this.onHandleLikedUsers.bind(this));
      } else if (title === TitleName.thirdTitle && this.state.title !== title) {
        console.log("matched list");
        api.getMatched(this.onHandleMatched.bind(this));
      } else {
        console.log("neither");
      }
    }

    if (this.state.array.length === 0) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            onPress={this._onRefresh.bind(this)}
            title="Click to refresh"
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 0 }}
            initialNumToRender={headerData.length}
            removeClippedSubviews={false}
            data={headerData}
            renderItem={(item, index) => {
              //console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
              //console.log('index: ', item.index);
              let i = this.getIndex(this.state.array, item.item);
              //console.log('correct index in fake dataaaaaaaaa: ', i);
              //console.log('correct data: ', array[i]);
              return (
                <FlatListItem
                  item={item}
                  index={index}
                  refresh={this}
                  flag={true}
                  data={FakeData.data}
                  //newData={FakeData.data[i].uri[0].uri}
                  trueIndex={i} // true index of an item in our data sent by api
                  trueData={this.state.array}
                  title={this.props.title}
                  //data={this.state.array}
                />
              );
            }}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            //onEndReached={this.handleLoadMore.bind(this)}
            onScrollEndDrag={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={10}
            keyExtractor={(item, index) => index.toString()}
          />
          <ActionButton
            buttonColor="#DF2929"
            onPress={this.handleAddButton.bind()}
          />

          <AddModal
            ref={"addModal"}
            parentFlatList={this}
            data={this.state.array}
          />
        </View>
      );
    }
  }
}

export default connect(state => ({
  image: state.UserInfoReducer.image,
  title: state.UserInfoReducer.title,
  id: state.LoginReducer.id,
  password: state.LoginReducer.password,
  email: state.LoginReducer.email,
  socket: state.LoginReducer.socket,
}))(Home);
