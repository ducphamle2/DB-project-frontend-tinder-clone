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
import FlatListItem from "../navigation_components/FlatListItem";
import SearchInput, { createFilter } from "react-native-search-filter";
import FakeData from "../config/FakeData";
import { ScrollView } from "react-native-gesture-handler";
import api from "../config/Api";
import UserInfoAction from "../redux/actions/UserInfoAction";
import { connect } from "react-redux";
import StringUtil from "../utils/StringUtils";

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
			title: '',
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    this.extractImageUrlFilter = this.extractImageUrlFilter.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

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
    console.log("before getting likable users");
    await api.getInfo(this.onGetInfoHandle.bind(this));
  }

  onGetInfoHandle(isSuccess, response, error) {
    console.log("response data in home: ", response.data);
    if (isSuccess) {
      this.setState({ array: response.data, title: this.props.title });
    } else {
      console.log("error in Home: ", error);
    }
    this.extractImageUrlFilter(); //extract url for images
  }

  onHandleLikedUsers(isSuccess, response, error) {
    if (isSuccess) {
      console.log("response LIKED USERRRRRRRRRRRRRRRR: ", response);
      this.setState({ array: response.data, title: this.props.title });
    } else {
      console.log("error: ", error);
    }
  }

  handleAddButton() {
    this.refs.addModal.showAddModal();
  }

  // this function will be used to set state which makes the Home component render again - refresh our list
  refreshFlatList = () => {
    this.setState({ isDeleted: true });
  };

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
  getIndex(item) {
    for (let i = 0; i < this.state.array.length; i++) {
      if (item === this.state.array[i].username) {
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
    const newData = this.extractDataFilter(filteredUser);

    // check if the Dropdown menu changes its value or not => we can catch it to rerender our Home
    const { title } = this.props;
    console.log("title when rendering home: ", title);
    if (StringUtil.isEmpty(title)) {
      console.log("empty title before rendering home");
    } else {
			console.log('this.state.title: ', this.state.title);
      if (title === "People you may like" && this.state.title !== title) {
        console.log("before getting likable users");
        api.getInfo(this.onGetInfoHandle.bind(this));
      } else if (title === "Liked list" && this.state.title !== title) {
        // testingggggggggggggggggggggggggggggggggggggg
        api.getLikedUsers(this.onHandleLikedUsers.bind(this));
      } else {
        console.log("Unliked list");
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={headerData}
          renderItem={(item, index) => {
            //console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
            //console.log('index: ', item.index);
            let i = this.getIndex(item.item);
            //console.log('correct index in fake dataaaaaaaaa: ', i);
            //console.log('correct data: ', array[i]);
            return (
              <FlatListItem
                item={item}
                index={index}
                refresh={this}
                flag={true}
                data={FakeData.data}
                newData={FakeData.data[i].uri[0].uri}
                trueIndex={i} // true index of an item in our data sent by api
                trueData={this.state.array}
                //data={this.state.array}
              />
            );
          }}
          ListHeaderComponent={this.renderHeader}
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

export default connect(state => ({
  image: state.UserInfoReducer.image,
  title: state.UserInfoReducer.title
}))(Home);
