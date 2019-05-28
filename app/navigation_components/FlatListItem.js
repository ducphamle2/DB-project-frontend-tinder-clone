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
import ModalFeedback from "../render_component/ModalFeedback";
import { withNavigation } from "react-navigation";
import api from "../config/Api";

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
      activeIndex: "",
      image: images.user,
      status: "liked"
    };
    //this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleParentComponent = this.handleParentComponent.bind(this);
    this.swipeContact = this.swipeContact.bind(this);
  }

  componentWillMount() {}

  handleParentComponent() {
    const { item, trueIndex } = this.props;
    if (this.props.flag) {
      const {trueData} = this.props;
      console.log('array in handleParentComponent: ', trueData);
      let id = trueData[trueIndex].id;
      console.log('true data correct index ID: ', id);
      console.log('true name: ', trueData[trueIndex].username);
      this.props.navigation.navigate("UserDetail", trueData[trueIndex]); // it should be the entire item not just name
    } else {
      // if the caller is from Feedback
      console.log("data from parent sent: ", this.props.data);
      const response = [
        {
          header: "App quality",
          response:
            "Noobaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
          header: "App performance",
          response: "Noob2"
        },
        {
          header: "report on bugs",
          response: "Noob3"
        }
      ];
      let header = null;
      let i = 0;
      for (i = 0; i < response.length; i++) {
        console.log("response: ", response[i]);
        if (item.item === response[i].header) {
          //header = response[i].header;
          header = response[i];
        }
      }
      console.log("response[i]", header);
      this.props.navigation.navigate("FeedbackDetail", header);
      //this.props.navigation.navigate('FeedbackDetail', header); Send header to call api in the detail
    }
  }

  handlePicturePressed() {
    const { navigate } = this.props.navigation;
    const { data, trueIndex } = this.props;
    console.log("before navigatin to Render Pictures: ", data[trueIndex].uri);
    navigate("RenderPictures", data[trueIndex].uri); // should pass an array of images
  }

  async swipeContact() {
    const { trueData } = this.props;
    if (this.state.status === "liked") {
      console.log('liked');
      const payload = {
        url: trueData[0].id,
        status: "liked"
      };
      await api.swipe(payload, this.onHandleSwipeContact.bind(this));
    } else if (this.state.status === "unliked") {
      console.log('unliekd');
      const payload = {
        url: trueData[0].id,
        status: "unliked"
      };
      await api.swipe(payload, this.onHandleSwipeContact.bind(this));
    }
    else {
      console.log('error');
    }
  }

  onHandleSwipeContact(isSuccess, response, error) {
    const { refresh, trueData, item } = this.props;
    if (isSuccess) {
      console.log("response data bitch: ", response);
    } else {
      console.log("error: ", error);
      refresh.refreshFlatList();
    }
    trueData.splice(item.index, 1); // splice function is used to delete element
    refresh.refreshFlatList();
  }

  render() {
    const { item, refresh, data, index } = this.props;
    // these will be the headers
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRow != null) {
          this.state.activeRow = null;
        }
      },
      onOpen: (secId, rowId, direction) => {},
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
              { cancelable: true }
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
    console.log("before rendering flatlist");

    const { newData } = this.props;
    let image = {
      uri: newData
    };
    return (
      <Swipeout {...swipeSettings}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}
          >
            <TouchableOpacity onPress={this.handlePicturePressed.bind(this)}>
              <Image
                source={image.uri === "" ? images.user : image}
                style={flatStyles.imgStyle}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "column", height: 60 }}>
              <Text style={flatStyles.flatListItem}>
                {this.props.item.item}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "#DEDEDE" }} />
        </View>
      </Swipeout>
    );
  }
}

export default withNavigation(FlatListItem);
