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
import socketUtil from "../startSocketIO";

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
      imgOne: "",
      imgTwo: "",
      imgThree: "",
      token: ""
    };
  }

  async componentWillMount() {
    const temp = [null, null, null];
    console.log("props image: ", this.props.image);
    if (this.props.image.length === 0) {
      console.log("image props length is ZERO");
    } else {
      for (let i = 0; i < this.props.image.length; i++) {
        if (!StringUtil.isEmpty(this.props.image[i].uri)) {
          temp[this.props.image[i].uri.order] = this.props.image[i];
        }
      }
    }
    this.setState({
      imgOne: temp[0],
      imgTwo: temp[1],
      imgThree: temp[2]
    });

    const token = await DataAsync.getData(myLoginConstant.TOKEN); // get token for upload image
    console.log("token in Data Async... >>>>>>>>>>>>>>>> = ", token);
    console.log("token in redux: ", this.props.token);
    if (StringUtil.isEmpty(token) && StringUtil.isEmpty(this.props.token)) {
      // do nothing
      // do
    } else {
      if (!StringUtil.isEmpty(token)) {
        this.setState({ token: token });
      } else {
        this.setState({ token: this.props.token });
      }
    }
  }

  async handleApply() {
    const { dispatch } = this.props;
    const { imgOne, imgTwo, imgThree } = this.state;
    if (
      StringUtil.isEmpty(this.state.imgOne.type) &&
      StringUtil.isEmpty(this.state.imgTwo.type) &&
      StringUtil.isEmpty(this.state.imgThree.type)
    ) {
      Alert.alert(
        "Notification",
        "The pictures are the same !!",
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
    } else if (
      StringUtil.isEmpty(imgOne) ||
      StringUtil.isEmpty(imgTwo) ||
      StringUtil.isEmpty(imgThree)
    ) {
      Alert.alert(
        "Notification",
        "All three pictures must be set !!",
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
        var payload = {};
        var payloadTwo = {};
        var payloadThree = {};

        if (!StringUtil.isEmpty(this.state.imgOne.type)) {
          // first we need to delete the image we want to replace first, and then set the new one.
          if (!StringUtil.isEmpty(this.props.image[0].uri)) {
            // if the image is not empty then we delete the old one
            let deleteData = {
              url: this.props.image[0].uri.id
            };
            setTimeout(async () => {
              await api.deleteImage(deleteData);
            }, 200);
          }
          const data = {
            image:
              "data:" +
              this.state.imgOne.type +
              ";" +
              "base64," +
              this.state.imgOne.data,
            imgOrder: 0
          };
          payload = {
            data: data,
            token: this.state.token
          };
          setTimeout(async () => {
            await api.uploadImage(payload, this.onHandleUploadImage.bind(this));
          }, 500);
        }

        if (!StringUtil.isEmpty(this.state.imgTwo.type)) {
          console.log("img two not empty");
          if (!StringUtil.isEmpty(this.props.image[1].uri)) {
            let deleteData = {
              url: this.props.image[1].uri.id
            };
            setTimeout(async () => {
              await api.deleteImage(deleteData);
            }, 200);
          }
          const data = {
            image:
              "data:" +
              this.state.imgTwo.type +
              ";" +
              "base64," +
              this.state.imgTwo.data,
            imgOrder: 1
          };
          payloadTwo = {
            data: data,
            token: this.state.token
          };
          setTimeout(async () => {
            await api.uploadImage(
              payloadTwo,
              this.onHandleUploadImage.bind(this)
            );
          }, 500);
        }

        if (!StringUtil.isEmpty(this.state.imgThree.type)) {
          console.log("img three not empty");
          if (!StringUtil.isEmpty(this.props.image[2].uri)) {
            let deleteData = {
              url: this.props.image[2].uri.id
            };
            setTimeout(async () => {
              await api.deleteImage(deleteData);
            }, 200);
          }
          const data = {
            image:
              "data:" +
              this.state.imgThree.type +
              ";" +
              "base64," +
              this.state.imgThree.data,
            imgOrder: 2
          };
          payloadThree = {
            data: data,
            token: this.state.token
          };
          setTimeout(async () => {
            await api.uploadImage(
              payloadThree,
              this.onHandleUploadImage.bind(this)
            );
          }, 500);
        }
      }
    }
  }

  onHandleUploadImage(isSuccess, response, error) {
    const { goBack } = this.props.navigation;
    if (isSuccess) {
      console.log("response: ", response);
      Alert.alert(
        "Notification",
        "Pictures have been updated successfully !",
        [
          {
            text: "OK",
            style: "cancel",
            onPress: async () => {
              await api.getImage(
                this.props.id,
                this.onHandleGetImage.bind(this)
              );
            }
          } // go back to sidebar
        ],
        { cancelable: false }
      );
    } else {
      console.log("error: ", error);
      Alert.alert(
        "Notification",
        "Something is wrong with image storage !",
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

  async onHandleGetImage(isSuccess, response, error) {
    if (isSuccess) {
      console.log("response handle get image: ", response);
      if (response.data.length === 0) {
        const image = [
          {
            uri: null
          },
          {
            uri: null
          },
          {
            uri: null
          }
        ];
        await this.props.dispatch(UserInfoAction.updateImage(image));
      } else {
        const image = [
          {
            uri: response.data[0]
          },
          {
            uri: response.data[1]
          },
          {
            uri: response.data[2]
          }
        ];
        await this.props.dispatch(UserInfoAction.updateImage(image));
      }
    } else {
      Alert.alert(
        "Notification",
        "There is something wrong getting the pictures, sorry !",
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
    const { imgStyle } = style;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View
            style={{ flex: 1, flexDirection: "row", marginTop: height / 30 }}
          >
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={this.handleFirstPicture.bind(this)}
            >
              <Image source={images.camera} />
            </TouchableOpacity>
            <Text>1st pic</Text>
            <Image
              style={imgStyle}
              source={
                StringUtil.isEmpty(this.state.imgOne)
                  ? images.user
                  : {
                      uri: StringUtil.isEmpty(this.state.imgOne.uri.url)
                        ? this.state.imgOne.uri
                        : this.state.imgOne.uri.url
                    }
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={this.handleSecondPicture.bind(this)}
            >
              <Image source={images.camera} />
            </TouchableOpacity>
            <Text>2nd pic</Text>
            <Image
              style={imgStyle}
              source={
                StringUtil.isEmpty(this.state.imgTwo)
                  ? images.user
                  : {
                      uri: StringUtil.isEmpty(this.state.imgTwo.uri.url)
                        ? this.state.imgTwo.uri
                        : this.state.imgTwo.uri.url
                    }
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={this.handleThirdPicture.bind(this)}
            >
              <Image source={images.camera} />
            </TouchableOpacity>
            <Text>3rd pic</Text>
            <Image
              style={imgStyle}
              source={
                StringUtil.isEmpty(this.state.imgThree)
                  ? images.user
                  : {
                      uri: StringUtil.isEmpty(this.state.imgThree.uri.url)
                        ? this.state.imgThree.uri
                        : this.state.imgThree.uri.url
                    }
              }
            />
          </View>
          <TouchableHighlight
            disabled={false}
            style={styles.loginButton}
            onPress={this.handleApply.bind(this)}
          >
            <Text style={{ fontSize: 16, color: "white" }}>APPLY</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  image: state.UserInfoReducer.image,
  token: state.LoginReducer.token,
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket
}))(SetupPictures);

const style = StyleSheet.create({
  imgStyle: {
    width: width / 5,
    height: width / 5,
    marginLeft: width / 5,
    marginTop: width / 200,
    marginBottom: width / 10,
    borderRadius: width / 10
  }
});
