import React, { Component } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
  TouchableOpacity
} from "react-native";
import { DrawerActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Content, Container } from "native-base";
import images from "../assets/image_source/Images";
import LoginAction from "../redux/actions/LoginAction";
import stateUtil from "../utils/StateUtil";
import BackGroundImage from "../assets/background/BackGroundImage";
import StringUtil from "../utils/StringUtils";
import ImageProfile from "../render_component/ImageProfile";
import PopupLogout from "../render_component/PopupLogout";
import IconSidebar from "../render_component/IconSideBar";
import DataAsync from "../utils/DataAsync";
import { myLoginConstant } from "../utils/Constants";
import UserInfoAction from "../redux/actions/UserInfoAction";
import ImagePicker from "react-native-image-picker";
import api from "../config/Api";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imgStyle: {
    width: width,
    height: height
  },
  loginButton: {
    marginBottom: height / 4,
    backgroundColor: "#DB1E4A",
    height: height / 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: (width * 2) / 6,
    //borderRadius: 25,
    shadowColor: "#D2D2D2",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.5
  }
});

class SetupPictures extends Component {
  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleFirstPicture = this.handleFirstPicture.bind(this);
    this.handleSecondPicture = this.handleSecondPicture.bind(this);
    this.handleThirdPicture = this.handleThirdPicture.bind(this);
    this.state = {
      imgOne: this.props.image[0],
      imgTwo: this.props.image[1],
      imgThree: this.props.image[2]
    };
  }

  async handleApply() {
    const { dispatch } = this.props;
    const { imgOne, imgTwo, imgThree } = this.state;
    // if they have not chosen anything => alert wrong
    if (
      StringUtil.isEmpty(imgOne) &&
      StringUtil.isEmpty(imgTwo) &&
      StringUtil.isEmpty(imgThree)
    ) {
      Alert.alert(
        "Notification",
        "No pictures have been set yet !!!!",
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
      // if they have then we set the state into our reducer so we can use in other components
      const images = [
        this.state.imgOne,
        this.state.imgTwo,
        this.state.imgThree
      ];
      console.log("payload before dispatch: ", images);
      dispatch(UserInfoAction.updateImage(images));
      var payload = {};
      var payloadTwo = {};
      var payloadThree = {};
      var fd = new FormData();
      var fdTwo = new FormData();
      var fdThree = new FormData();
      fd.append("image", this.state.imgOne);
      fdTwo.append("image", this.state.imgTwo);
      fdThree.append("image", this.state.imgThree);
      const token = await DataAsync.getData(myLoginConstant.TOKEN); // get token for upload image
      console.log(
        "interceptor request begin in Data Async... >>>>>>>>>>>>>>>> = ",
        token
      );
      console.log("interceptor request in redux: ", this.props.token);
      if (StringUtil.isEmpty(token) && StringUtil.isEmpty(this.props.token)) {
        // do nothing
        // do
      } else {
        if (!StringUtil.isEmpty(token)) {
          payload = {
            data: fd,
            token: token
          };
          payloadTwo = {
            data: fdTwo,
            token: token
          };
          payloadThree = {
            data: fdThree,
            token: token
          };
        } else {
          payload = {
            data: fd,
            token: this.props.token
          };
          payloadTwo = {
            data: fdTwo,
            token: this.props.token
          };
          payloadThree = {
            data: fdThree,
            token: this.props.token
          };
        }
      }
      await api.uploadImage(payload, this.onHandleUploadImage.bind(this));
      //await api.uploadImage(payloadTwo, this.onHandleUploadImage.bind(this));
      //await api.uploadImage(payloadThree, this.onHandleUploadImage.bind(this));
    }
  }

  onHandleUploadImage(isSuccess, response, error) {
    const { goBack } = this.props.navigation;
    if (isSuccess) {
      console.log("response: ", response);
      Alert.alert(
        "Notification",
        "Pictures have been setup successfully. You can click your profile pictures to see them !",
        [
          {
            text: "OK",
            style: "cancel"
          } // go back to sidebar
        ],
        { cancelable: false }
      );
    } else {
      console.log("error: ", error);
      Alert.alert(
        "Notification",
        "Error on uploading pictures. Sorry !",
        [
          {
            text: "OK",
            onPress: () => {
              goBack(null);
            },
            style: "cancel"
          } // go back to sidebar
        ],
        { cancelable: false }
      );
    }
  }

  selectPhotoTapped(index) {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("response uri here: ", response.uri);
        if (index === 0) {
          this.setState({
            ...this.state,
            imgOne: response
          });
        } else if (index === 1) {
          this.setState({
            ...this.state,
            imgTwo: response
          });
        } else {
          this.setState({
            ...this.state,
            imgThree: response
          });
        }
      }
    });
  }

  handleFirstPicture() {
    console.log("first pic clicked");
    this.selectPhotoTapped(0);
  }

  handleSecondPicture() {
    this.selectPhotoTapped(1);
  }

  handleThirdPicture() {
    this.selectPhotoTapped(2);
  }

  render() {
    console.log("props image: ", this.props);
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 30 }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={this.handleFirstPicture.bind(this)}
          >
            <Image source={images.camera} />
          </TouchableOpacity>
          <Text>first pic</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={this.handleSecondPicture.bind(this)}
          >
            <Image source={images.camera} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>second pic</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={this.handleThirdPicture.bind(this)}
          >
            <Image source={images.camera} />
          </TouchableOpacity>
          <Text>third pic</Text>
        </View>
        <TouchableHighlight
          disabled={false}
          style={styles.loginButton}
          onPress={this.handleApply.bind(this)}
        >
          <Text style={{ fontSize: 16, color: "white" }}>APPLY</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(state => ({
  image: state.UserInfoReducer.image,
  token: state.LoginReducer.token
}))(SetupPictures);
