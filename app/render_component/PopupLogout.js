import React, { Component } from 'react';
import { Modal, Text, View, Dimensions, ImageBackground } from 'react-native';

import images from '../assets/image_source/Images';
import ButtonSideBar from '../render_component/ButtonSideBar';

const { width, height } = Dimensions.get('window');

const widPopup = (width * 4) / 5;

// this class is used to popup a logout alert for the users to confirm logout or not
class PopupLogout extends Component {
  render() {
    const { cancelConfirm, isConfirm, confirm, message, nameBtnTop, nameBtnBot } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isConfirm}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            height,
            width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isConfirm ? 'rgba(0,0,0,0.5)' : 'transparent'
          }}
        >
          <ImageBackground
            source={images.dialogBg}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: widPopup,
              height: widPopup
            }}
            imageStyle={{
              resizeMode: 'cover'
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{message}</Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ButtonSideBar
                onPress={() => confirm()}
                content={nameBtnTop}
                bgColor="#00BF8C"
                borderWidth={0}
              />
              <ButtonSideBar
                content={nameBtnBot}
                // bgColor="#044128"
                onPress={() => cancelConfirm()}
                borderWidth={1}
                borderColor="#FFFFFF"
              />
            </View>
          </ImageBackground>
        </View>
      </Modal>
    );
  }
}

export default PopupLogout;
