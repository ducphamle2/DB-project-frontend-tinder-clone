import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, StatusBar, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height: height - (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight)
  }
  // : height - height / 35
});

class BackgroundImage extends React.Component {
  render() {
    const { url, children } = this.props;
    const { backgroundImage } = styles;
    return (
      <View>
        <ImageBackground style={backgroundImage} source={url}>
          {children}
        </ImageBackground>
      </View>
    );
  }
}

export default BackgroundImage;
