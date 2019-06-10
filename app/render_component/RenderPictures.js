import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import { connect } from "react-redux";
import StringUtil from "../utils/StringUtils";
import images from "../assets/image_source/Images";
import api from "../config/Api";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imgStyle: {
    width: width,
    height: height
  }
});

class RenderPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      redux: false,
      images: [],
      firstImg: "",
      secImg: "",
      thirdImg: ""
    };
    this.getCorrectUserOrder = this.getCorrectUserOrder.bind(this);
  }

  componentWillMount() {
    const temp = [null, null, null];
    console.log("props image: ", this.props.image);
    if (this.props.image.length === 0) {
      console.log("image props length is ZERO");
    } else {
      for (let i = 0; i < this.props.image.length; i++) {
        if (!StringUtil.isEmpty(this.props.image[i].uri)) {
          temp[this.props.image[i].uri.order] = this.props.image[i].uri.url;
        }
      }
    }
    this.setState({
      firstImg: temp[0],
      secImg: temp[1],
      thirdImg: temp[2]
    });
  }

  getCorrectUserOrder(params) {
    const temp = [
      {
        uri: ""
      },
      {
        uri: ""
      },
      {
        uri: ""
      }
    ];
    if (params.length === 0) {
      return temp;
    } else {
      for (let i = 0; i < params.length; i++) {
        temp[params[i].order].uri = params[i].url;
      }
      return temp;
    }
  }

  render() {
    console.log("params navigation: ", this.props.navigation.state.params);
    if (StringUtil.isEmpty(this.props.navigation.state.params)) {
      // if user clicks profile pic
      console.log("navigate from Image Profile");

      console.log(
        "Image in render pictures >>>>>>>>>>>>>>>>",
        this.props.image
      );
      const source = [
        {
          uri: this.state.firstImg
        },
        {
          uri: this.state.secImg
        },
        {
          uri: this.state.thirdImg
        }
      ];
      console.log("source: ", source);
      return (
        <View style={styles.container}>
          <Swiper>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(source[0].uri) ? images.user : source[0]
                }
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(source[1].uri) ? images.user : source[1]
                }
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(source[2].uri) ? images.user : source[2]
                }
                style={styles.imgStyle}
              />
            </View>
          </Swiper>
        </View>
      );
    } else {
      // if user click other users' profile pics
      console.log("navigate from FlatListItem");
      const { params } = this.props.navigation.state;
      console.log("params: ", params);
      const image = this.getCorrectUserOrder(params);
      console.log("images: ", images);
      return (
        <View style={styles.container}>
          <Swiper>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(image[0].uri) ? images.user : images[0]
                }
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(image[1].uri) ? images.user : images[1]
                }
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.slideContainer}>
              <Image
                source={
                  StringUtil.isEmpty(image[2].uri) ? images.user : images[2]
                }
                style={styles.imgStyle}
              />
            </View>
          </Swiper>
        </View>
      );
    }
  }
}

export default connect(state => ({
  image: state.UserInfoReducer.image,
  id: state.LoginReducer.id
}))(RenderPictures);
