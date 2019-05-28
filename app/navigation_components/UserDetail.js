import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import LoginStyle from '../assets/styles/LoginStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default class FeedbackDetail extends Component {
    render() {
        const { goBack } = this.props.navigation;
        const { params } = this.props.navigation.state;
        goBack('Feedback');
        console.log('state in user detail: ', params);

        const { loginButtonText, loginButton, loginText, signUpButton, signUpButtonText, findButtonText, findButton } = LoginStyle;

        return (
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 20,
                            fontSize: 20,
                        },
                            loginText]}>
                            Username
                        </Text>
                        <Text style={{ marginLeft: 55, marginRight: 10, marginTop: 20, fontSize: 15 }}>
                            {params.username === '' ? 'No info' : params.username}
                        </Text>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 20,
                            fontSize: 20,
                        },
                            loginText]}>
                            City
                        </Text>
                        <Text style={{ marginLeft: 55, marginRight: 10, marginTop: 20, fontSize: 15 }}>
                            {params.city === '' ? 'No info' : params.city}
                        </Text>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 20,
                            fontSize: 20,
                        },
                            loginText]}>
                            DOB
                        </Text>
                        <Text style={{ marginLeft: 55, marginRight: 10, marginTop: 20, fontSize: 15 }}>
                            {params.dob === '0' ? 'No info' : params.dob}
                        </Text>
                        <Text style={[{
                            marginLeft: 55,
                            marginTop: 20,
                            fontSize: 20,
                        },
                            loginText]}>
                            Gender
                        </Text>
                        <Text style={{ marginLeft: 55, marginRight: 10, marginTop: 20, fontSize: 15 }}>
                            {params.gender === '0' ? 'No info' : params.gender}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}