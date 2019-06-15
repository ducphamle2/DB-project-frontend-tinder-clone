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
  RefreshControl
} from "react-native";
import images from "../assets/image_source/Images";
import Swipeout from "react-native-swipeout";
import ActionButton from "react-native-action-button"; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from "../render_component/ModalFeedback";
import { withNavigation } from "react-navigation";
import api from "../config/Api";
import StringUtil from "../utils/StringUtils";
import TitleName from "../render_component/TitleName";

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
  feedbackStyle: {
    margin: width / 30
  },
  buttonStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: 100
  }
});

//this class is used to build items inside our flatlist
/*
The most outer View component is used to as a container
The second View component is used as a background color for our items, which is white in this case, when we flex as row not column
inside the second View component we have two components: Image first and then the text
Text component is covered in a View component, which helps us modify the layout outside the text and flex the items vertically.
Lastly the last View component is used as a baseline between each item with height = 1, and color is light grey
*/
class FlatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRow: "",
      activeRowKey: "",
      activeIndex: "",
      image: images.user,
      status: "liked",
      refreshing: false
    };
    //this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleParentComponent = this.handleParentComponent.bind(this);
    this.swipeContact = this.swipeContact.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
  }

  componentWillMount() {}

  handleParentComponent() {
    const { item, trueIndex, trueData } = this.props;
    if (this.props.flag) {
      console.log("array in handleParentComponent: ", trueData);
      console.log("true index ????: ", trueIndex);
      let id = trueData[trueIndex].id;
      console.log("true data correct index ID: ", id);
      console.log("true name: ", trueData[trueIndex].username);
      this.props.navigation.navigate("UserDetail", trueData[trueIndex]); // it should be the entire item not just name
    } else {
      this.props.navigation.navigate("FeedbackDetail", trueData[trueIndex]);
      //this.props.navigation.navigate('FeedbackDetail', header); Send header to call api in the detail
    }
  }

  handlePicturePressed() {
    const { navigate } = this.props.navigation;
    const { trueData, trueIndex, title } = this.props;
    if (
      title !== TitleName.firstTitle &&
      title !== TitleName.secondTitle &&
      title !== TitleName.thirdTitle
    ) {
      console.log("THIS FLATLIST IS FROM FEEDBACK");
    } else {
      console.log("before navigatin to Render Pictures: ", trueData[trueIndex]);
      navigate("RenderPictures", trueData[trueIndex].images); // should pass an array of images
    }
  }

  async swipeContact() {
    const { trueData, trueIndex } = this.props;
    console.log("true data in swipe contact: ", trueData); // check the correct data in our array
    // check status to send to backend, can only be liked or unliked an user
    if (this.state.status === "liked") {
      console.log("liked");
      const payload = {
        url: trueData[trueIndex].id,
        status: "liked"
      };
      await api.swipe(payload, this.onHandleSwipeContact.bind(this));
    } else if (this.state.status === "unliked") {
      console.log("unliekd");
      const payload = {
        url: trueData[trueIndex].id,
        status: "unliked"
      };
      await api.swipe(payload, this.onHandleSwipeContact.bind(this));
    } else {
      console.log("error");
    }
  }

  onHandleSwipeContact(isSuccess, response, error) {
    const { refresh, trueData, item, data } = this.props;
    if (isSuccess) {
      console.log("response data bitch: ", response);
    } else {
      console.log("error: ", error);
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
      }
      else {
        Alert.alert(
          "Notification",
          "User not found",
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
    //data.splice(item.index, 1); // splice function is used to delete element
    //refresh.refreshFlatList();
    refresh.refresh(this.props.trueIndex);
  }

  _onRefresh() {
    const { refresh } = this.props;
    this.setState({ refreshing: true }); // set to true so the refreshing icon starts to appear
    console.log("before ending refresh");
    refresh.refreshFlatList();
    this.setState({ refreshing: false }); // after refreshing we need to set it back to false to close
  }

  // get the first picture of users
  getAvatar() {
    const { trueData, trueIndex } = this.props;
    console.log("true data images for the list: ", trueData[trueIndex].images);
    if (StringUtil.isEmpty(trueData[trueIndex].images.length)) {
      return null;
    }
    for (let i = 0; i < trueData[trueIndex].images.length; i++) {
      if (trueData[trueIndex].images[i].order === 0) {
        return trueData[trueIndex].images[i].url;
      }
    }
  }

  render() {
    const {
      item,
      refresh,
      data,
      index,
      title,
      trueIndex,
      trueData
    } = this.props;
    // these will be the headers
    var swipeSettings = {};
    // if user choose likable users => they can like. When it comes to liked users they cannot do anything
    if (title === TitleName.firstTitle) {
      swipeSettings = {
        autoClose: true,
        right: [
          {
            onPress: () => {
              Alert.alert(
                "Confirmation",
                "Are you sure you want to ignore this user ?",
                [
                  {
                    text: "No",
                    onPress: () => {
                      console.log("cancel pressed");
                    },
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: this.swipeContact
                  }
                ],
                { cancelable: true }
              );
            },
            text: "Delete",
            type: "delete",
            backgroundColor: "#3FA1F6"
          }
        ],
        left: [
          {
            onPress: this.handleParentComponent,
            text: "View",
            type: "view",
            backgroundColor: "#3FA1F6"
          },
          {
            onPress: () => {
              Alert.alert(
                "Confirmation",
                "Are you sure you want to like this user ?",
                [
                  {
                    text: "No",
                    onPress: () => {
                      console.log("cancel pressed");
                    },
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: this.swipeContact
                  }
                ],
                { cancelable: false }
              );
            },
            text: "Like",
            type: "Like",
            backgroundColor: "#3FA1F6"
          }
        ],
        rowId: this.props.item.index,
        sectionId: 1
      };
    } else {
      swipeSettings = {
        autoClose: true,
        left: [
          {
            onPress: this.handleParentComponent,
            text: "View",
            type: "view",
            backgroundColor: "#3FA1F6"
          }
        ],
        rowId: this.props.item.index,
        sectionId: 1
      };
    }
    // const { newData } = this.props;
    let image = {
      uri: images.feedback
    };
    if (
      title === TitleName.firstTitle ||
      title === TitleName.secondTitle ||
      title === TitleName.thirdTitle
    ) {
      //distinguish from home and other lists
      image = {
        uri: this.getAvatar()
      };
    }
    return (
      <Swipeout {...swipeSettings}>
        <ScrollView>
          <View
            style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}
          >
            <TouchableOpacity onPress={this.handlePicturePressed.bind(this)}>
              <Image
                source={
                  StringUtil.isEmpty(image.uri)
                    ? images.user
                    : image.uri === images.feedback
                    ? images.feedback
                    : image
                }
                style={
                  image.uri === images.feedback
                    ? flatStyles.feedbackStyle
                    : flatStyles.imgStyle
                }
              />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "column", height: 60 }}>
              <Text style={flatStyles.flatListItem}>
                {this.props.item.item}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "#DEDEDE" }} />
        </ScrollView>
      </Swipeout>
    );
  }
}

export default withNavigation(FlatListItem);
