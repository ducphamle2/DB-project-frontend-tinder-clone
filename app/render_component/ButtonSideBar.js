import React from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

class ButtonSideBar extends React.Component {
  render() {
    const {
      content,
      bgColor,
      borderWidth,
      borderColor,
      colorTxt,
      onPress,
      disableBtn
    } = this.props;

    return (
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disableBtn}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: bgColor,
            borderRadius: 25,
            borderWidth: borderWidth > 0 ? borderWidth : 0,
            borderColor: borderWidth > 0 ? borderColor : '#FFFFFF',
            width: (width * 2) / 3,
            height: height / 15,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
            shadowOpacity: 1.0
          }}
        >
          <Text
            style={{
              color: colorTxt ? colorTxt.toString() : '#FFFFFF',
              fontFamily: 'Josefin Sans',
              fontSize: 16
            }}
          >
            {content}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ButtonSideBar;
