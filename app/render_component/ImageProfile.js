import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import RenderPictures from "./RenderPictures";
import Example from "../navigation_components/Example";
import images from "../assets/image_source/Images";
import StringUtil from "../utils/StringUtils";
import socketUtil from "../startSocketIO";

const { width } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  contentStyle: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Josefin Sans",
    fontSize: 20,
    marginLeft: 5,
    marginTop: 5
  },
  imgStyle: {
    width: width / 5,
    height: width / 5,
    marginLeft: width / 40,
    marginTop: width / 40,
    borderRadius: width / 10
  }
});

// this class is used to render an image profile with fullname under it
class ImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isNull: false
    };
  }

  // when clicking the image it will direct user to many pics
  handleImageClicked() {
    this.props.navigation.navigate("RenderPictures");
  }

  render() {
    const { content, cameraUrl } = this.props; // url for the picture (get from user info db, and content is name)
    const { container, contentStyle, imgStyle } = style;
    return (
      <View style={container}>
        <TouchableOpacity onPress={this.handleImageClicked.bind(this)}>
          <Image
            source={
              StringUtil.isEmpty(this.props.url)
                ? images.user
                : {
                  uri: this.props.url
                }
            }
            style={imgStyle}
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={this.selectPhotoTapped}
          >
            <Image source={cameraUrl} />
          </TouchableOpacity>
          <Text style={contentStyle}>{content}</Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  email: state.LoginReducer.email,
  username: state.LoginReducer.username,
  image: state.UserInfoReducer.image,
	id: state.LoginReducer.id,
	socket: state.LoginReducer.socket,
}))(ImageProfile);
