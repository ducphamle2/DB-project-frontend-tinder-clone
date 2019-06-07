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

export default class Tick extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const {test} = this.props;
      return(
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
              console.log('test: ', test);
          }}
          >
            <Image style={{ marginRight: 5, tintColor: '#FFFFFF' }} source={images.list} />
          </TouchableOpacity>
        </View>
      );
    }
  }