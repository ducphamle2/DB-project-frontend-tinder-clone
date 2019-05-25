import React, { Component } from 'react';
import {
    TouchableHighlight,
    TextInput,
    Dimensions,
    Platform,
    Alert,
    Text,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modalbox';
import api from '../config/Api';
import LoginStyle from '../assets/styles/LoginStyle';
import { View, Row } from 'native-base';


var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            content: '',
            addErrorMessage: '',
            isClosed: false,
        }
    }

    showAddModal() {
        this.refs.myModal.open();
    }

    handleAdding() {
        console.log('add button hit !!!');
        const { header, content } = this.state;
        if (header !== '' && header.length <= 50 && content !== '' && content.length <= 200) {
            this.setState({ addErrorMessage: '' }); // state is reset
            //const payload = { header, content }; //normally this one will be used
            const payload = { content };
            console.log('payload in handle login: ', payload);
            setTimeout(async () => {
                await api.addUser(payload, this.onHandleAddUser.bind(this));
            }, 200);
        }
        else {
            this.setState({ addErrorMessage: 'Invalid header or content input !' });
        }
    }

    // maybe we can use redux here to store feedback data. After adding we update it, which affects feedback
    onHandleAddUser(isSuccess, response, error) {
        if (isSuccess) {
            console.log('success');
            Alert.alert(
                'Notification',
                'Your feedback has been recorded. Thank you for using our app !!',
                [
                    { text: 'OK', onPress: () => { console.log('OK pressed') }, style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
        else {
            Alert.alert(
                'Notification',
                'Sorry, there is something wrong, your feedback cannot be sent !',
                [
                    { text: 'OK', onPress: () => { console.log('OK pressed') }, style: 'cancel' },
                ],
                { cancelable: false }
            );
            console.log('error');
        }
    }


    renderError() {
        const { addErrorMessage } = this.state;
        if (addErrorMessage !== '') {
            return <Text style={{
                marginLeft: 55,
                color: '#DB1E4A',
                fontSize: 12.5,
                marginBottom: 10,
            }}>{addErrorMessage}</Text>;
        }
    }

    render() {
        const { header, content } = this.state;
        const { loginButtonText, loginButton, loginText } = LoginStyle;
        const styles = StyleSheet.create({
            textAreaContainer: {
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                padding: 5
            },
            textArea: {
                height: 150,
                marginLeft: 30,
                marginRight: 30,
                marginTop: 10,
                borderWidth: 1,
                borderColor: 'grey',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'baseline',
            }
        })
        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: screen.height - 100,
                }}
                position='center'
                backdrop={true} // this is used to close when click outside of the box ?
                onClosed={() => {
                    // this makes sure all the states are cleared before rendering
                    this.setState({ header: '', content: '', addErrorMessage: '' })
                }}

            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40,
                    }}>
                    Send your feedback
                </Text>
                <Text style={[{
                    marginLeft: 30,
                    marginTop: 12
                },
                    loginText]}>
                    Header
                        </Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                    }}
                    placeholder='Header of your feedback'
                    onChangeText={txt => this.setState({ header: txt })}
                    value={header}
                    maxLength={50}>
                </TextInput>
                <Text style={[{
                    marginLeft: 30,
                    marginTop: 15
                },
                    loginText]}>
                    Content
                        </Text>
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={txt => this.setState({ content: txt })}
                    value={content}
                    maxLength={250}
                />

                {this.renderError()}
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight
                        disabled={false}
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: '#DB1E4A',
                            shadowColor: '#D2D2D2',
                            shadowOffset: { width: 0, height: 3 },
                            shadowRadius: 6,
                            shadowOpacity: 0.5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 40

                        }}
                        onPress={this.handleAdding.bind(this)}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            fontFamily: 'Josefin Sans',
                            fontWeight: 'bold',
                        }}>Add</Text>
                    </TouchableHighlight>
                </View>

            </Modal>
        );
    }
}