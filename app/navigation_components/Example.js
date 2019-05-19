import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 3,
                    text: 'Hi again',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                    }
                },
                {
                    _id: 1, //this is the id for the message
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2, // this is the id for the user
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                },
                
            ]
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1
                }}
                //inverted={false}
            />
        );
    }
}