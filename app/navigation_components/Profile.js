import React, { Component } from 'react';
import { Item, Input } from 'native-base';
import LoginStyle from '../assets/styles/LoginStyle';
import { connect } from 'react-redux';
import UserInfoAction from '../redux/actions/UserInfoAction';
import StringUtil from '../utils/StringUtils'
import {
    Text,
    View,
    TouchableHighlight,
    Image,
    ScrollView,
    Platform,
    Dimensions,
    ImageBackground,
    Picker,
    StyleSheet,
    Alert
} from 'react-native';
import api from '../config/Api';
import validation from '../utils/validations/Validation';
import DataAsync from '../utils/DataAsync';
import { myLoginConstant } from '../utils/Constants';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            phoneNumber: '',
            gender: '',
            city: '',
            profileErrorMessage: '',
        }

        this.onHandleSetInfo = this.onHandleSetInfo.bind(this);
    }

    // this will be used to check state values before rendering.
    // send username with token to receive information
    async componentWillMount() {
        const username = this.props.navigation.getParam('username');
        console.log('before rendering: ', username);
        // we need to call api to get user info first, after that use data async to store.
        const age = await DataAsync.getData(myLoginConstant.REMEMBER_AGE);
        const phoneNumber = await DataAsync.getData(myLoginConstant.REMEMBER_PHONENUM);
        const gender = await DataAsync.getData(myLoginConstant.REMEMBER_GENDER);
        const city = await DataAsync.getData(myLoginConstant.REMEMBER_CITY);
        if (StringUtil.isEmpty(age) && StringUtil.isEmpty(phoneNumber) &&
            StringUtil.isEmpty(city) && StringUtil.isEmpty(gender)) {
            DataAsync.setData(myLoginConstant.REMEMBER_AGE, ''); // if they undefined then set to initial state
            DataAsync.setData(myLoginConstant.REMEMBER_PHONENUM, '');
            DataAsync.setData(myLoginConstant.REMEMBER_GENDER, '');
            DataAsync.setData(myLoginConstant.REMEMBER_CITY, '');
        }
        else {
            // set current state to what we have stored previously
            this.setState({ age: age, phoneNumber: phoneNumber, gender: gender, city: city });
            console.log('existing user_info: ', { age, phoneNumber, gender, city });
        }
    }

    renderError() {
        const { profileErrorMessage } = this.state;
        if (profileErrorMessage !== '') {
            return <Text style={{
                marginLeft: 55,
                marginTop: 12,
                color: '#DB1E4A',
                fontSize: 12.5
            }}>{profileErrorMessage}</Text>;
        }
    }

    handleConfirm() {
        const { age, phoneNumber, gender, city } = this.state;
        // age and phone number must be numbers
        if (validation.isNumber(age) && validation.isNumber(phoneNumber)) {
            this.setState({ profileErrorMessage: '' });
            const username = this.props.navigation.getParam('username');
            const payload = { username, age, phoneNumber, gender, city };
            console.log('Before calling api');
            //api.setInfo(payload, this.onHandleSetInfo.bind());
            this.onHandleSetInfo();
        }
        else {
            this.setState({ profileErrorMessage: 'Age and phone number inputs invalid' });
        }

    }

    onHandleSetInfo(isSuccess, response, error) {
        const { age, phoneNumber, gender, city } = this.state;
        DataAsync.setData(myLoginConstant.REMEMBER_AGE, age); // if they undefined then set to initial state
        DataAsync.setData(myLoginConstant.REMEMBER_PHONENUM, phoneNumber);
        DataAsync.setData(myLoginConstant.REMEMBER_GENDER, gender);
        DataAsync.setData(myLoginConstant.REMEMBER_CITY, city);
        console.log('user info after confirm: ', { age, phoneNumber, gender, city });
        Alert.alert(
            'Notification',
            'You have edited your profile successfully',
            [
                { text: 'OK', onPress: () => { console.log('OK pressed') }, style: 'cancel' },
            ],
            { cancelable: false }
        );
    }

    handleCancel() {
        const { navigate } = this.props.navigation;
        navigate('Drawer'); // get back to the drawer screen
    }

    render() {
        const { age, phoneNumber, city, gender } = this.state;
        console.log('Age of the state now: ', age);
        const { loginButtonText, loginButton, loginText, signUpButton, signUpButtonText, findButtonText, findButton } = LoginStyle;
        return (
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, marginTop: 40 }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 12
                        },
                            loginText]}>
                            Your age
                        </Text>
                        {/* border color is the color line under the Input component */}
                        <Item style={{ marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                //placeholder={'Age'}
                                inputFontSize={10}
                                inputHeightBase={10}
                                //lineHeight={10}
                                returnKeyType="next"
                                onChangeText={txt => this.setState({ age: txt })}
                                value={age}
                                maxLength={50}
                            />
                        </Item>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 12
                        },
                            loginText]}>
                            Telephone number
                </Text>

                        <Item style={{ marginBottom: 5, marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                            <Input
                                //placeholder={'password'}
                                inputHeightBase={10}
                                inputFontSize={10}
                                underlineColorAndroid="transparent"
                                onChangeText={txt => this.setState({ phoneNumber: txt })}
                                value={phoneNumber}
                                maxLength={20}
                            />
                        </Item>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 12
                        },
                            loginText]}>
                            City
                </Text>

                        <Item style={{ marginBottom: 5, marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                            <Input
                                //placeholder={'password'}
                                inputHeightBase={10}
                                inputFontSize={10}
                                underlineColorAndroid="transparent"
                                onChangeText={txt => this.setState({ city: txt })}
                                value={city}
                                maxLength={20}
                            />
                        </Item>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 12
                        },
                            loginText]}>
                            Gender
                </Text>

                        <Item style={{ marginBottom: 5, marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                            <Input
                                //placeholder={'password'}
                                inputHeightBase={10}
                                inputFontSize={10}
                                underlineColorAndroid="transparent"
                                onChangeText={txt => this.setState({ gender: txt })}
                                value={gender}
                                maxLength={20}
                            />
                        </Item>
                        {this.renderError()}
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginBottom: 50 }}>
                            <TouchableHighlight
                                disabled={false}
                                style={[{
                                    marginTop: 100
                                },
                                    loginButton]}
                                onPress={this.handleConfirm.bind(this)}
                            >
                                <Text style={loginButtonText}>CONFIRM</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                disabled={false}
                                style={[{
                                    marginBottom: 100
                                },
                                    loginButton]}
                                onPress={this.handleCancel.bind(this)}
                            >
                                <Text style={loginButtonText}>CANCEL</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default connect(state => ({
    age: state.UserInfoReducer.age,
    gender: state.UserInfoReducer.gender,
    phoneNumber: state.UserInfoReducer.phoneNumber,
    city: state.UserInfoReducer.city,

}))(Profile);