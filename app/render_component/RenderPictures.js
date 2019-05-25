import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import { connect } from 'react-redux';
import StringUtil from "../utils/StringUtils";
import images from "../assets/image_source/Images";
const { height, width } = Dimensions.get('window');

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
        height: height,
    },
});

class RenderPictures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    render() {
        console.log('Image in render pictures >>>>>>>>>>>>>>>>', this.props.image);
        const source = [
            {
                uri: this.props.image[0]
            },
            {
                uri: this.props.image[1]
            },
            {
                uri: this.props.image[2]
            }
        ];
        console.log('source: ', source[0].uri);
        return (
            <View style={styles.container}>
                <Swiper>
                    <View style={styles.slideContainer}>
                        <Image source={StringUtil.isEmpty(source[0].uri) ? images.user : source[0]} style={styles.imgStyle}></Image>
                    </View>
                    <View style={styles.slideContainer} >
                        <Image source={StringUtil.isEmpty(source[1].uri) ? images.user : source[1]} style={styles.imgStyle}></Image>
                    </View>
                    <View style={styles.slideContainer} >
                        <Image source={StringUtil.isEmpty(source[2].uri) ? images.user : source[2]} style={styles.imgStyle}></Image>
                    </View>
                </Swiper>
            </View>
        );
    }
}

export default connect(state => ({
    image: state.UserInfoReducer.image,
}))(RenderPictures);