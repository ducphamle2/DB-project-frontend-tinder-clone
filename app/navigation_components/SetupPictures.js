import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Image, Dimensions, StyleSheet, Text, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';
import images from '../assets/image_source/Images';
import LoginAction from '../redux/actions/LoginAction';
import stateUtil from '../utils/StateUtil';
import BackGroundImage from '../assets/background/BackGroundImage';
import StringUtil from '../utils/StringUtils';
import ImageProfile from '../render_component/ImageProfile';
import PopupLogout from '../render_component/PopupLogout';
import IconSidebar from '../render_component/IconSideBar';
import DataAsync from '../utils/DataAsync';
import { myLoginConstant } from '../utils/Constants';
import UserInfoAction from '../redux/actions/UserInfoAction';
import ImagePicker from 'react-native-image-picker';

const { height, width } = Dimensions.get('window');

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
        height: height,
    },
    loginButton: {
        marginBottom: height / 4,
        backgroundColor: '#DB1E4A',
        height: height / 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (width * 2) / 6,
        //borderRadius: 25,
        shadowColor: '#D2D2D2',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.5
    },
});

class SetupPictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: [
                {
                    uri: ''
                },
                {
                    uri: ''
                },
                {
                    uri: ''
                },
            ],
        }
        this.handleSetPictures = this.handleSetPictures.bind(this);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    handleApply() {
        const { img } = this.state;
        const { dispatch } = this.props;
        const { goBack } = this.props.navigation;
        // if they have not chosen anything => alert wrong
        if (StringUtil.isEmpty(img[0].uri) && StringUtil.isEmpty(img[1].uri) && StringUtil.isEmpty(img[2].uri)) {
            Alert.alert(
                'Notification',
                'No pictures have been set yet !!!!',
                [
                    { text: 'OK', onPress: () => { console.log('OK pressed') }, style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
        else { // if they have then we set the state into our reducer so we can use in other components
            dispatch(UserInfoAction.updateImage(img));
            console.log('image dispatch: ', img);
            Alert.alert(
                'Notification',
                'Pictures have been setup successfully. You can click your profile pictures to see them !',
                [
                    { text: 'OK', onPress: () => { goBack(null) }, style: 'cancel' }, // go back to sidebar
                ],
                { cancelable: false }
            );
        }
    }

    handleSetPictures(type) {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={this.handleSetPictures(1)}>
                        <Image source={images.camera}>

                        </Image>
                    </TouchableOpacity>
                    <Text>first pic</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {console.log('second pressed')}}>
                        <Image source={images.camera}>

                        </Image>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 10}}>second pic</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Image source={images.camera}>

                        </Image>
                    </TouchableOpacity>
                    <Text>third pic</Text>
                </View>
                <TouchableHighlight
                    disabled={false}
                    style={styles.loginButton}
                    onPress={this.handleApply.bind(this)}
                >
                    <Text style={{ fontSize: 16, color: 'white', }}>APPLY</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default connect(state => ({
    image: state.UserInfoReducer.state,
}))(SetupPictures);
