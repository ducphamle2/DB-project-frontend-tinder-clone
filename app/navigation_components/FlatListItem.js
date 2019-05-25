import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
import images from '../assets/image_source/Images';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from '../render_component/ModalFeedback';
import { withNavigation } from 'react-navigation';
import api from '../config/Api';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

const flatStyles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        fontSize: 16
    },
    imgStyle: {
        width: 50,
        height: 50,
        margin: width / 40,
        borderRadius: width / 10
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 100,
        width: 100,
    }
});

//this class is used to build items inside our flatlist
/*
The most outer View component is used to as a container
The second View component is used as a background color for our items, which is white in this case, when we flex as row not column
inside the second View component we have two components: Image first and then the text
Text component is covered in a View component, which helps us modify the layout outside the text and flex the items vertically.
Lastly the last View component is used as a baseline between each item with height = 1, and color is light grey
*/
class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: '',
            activeIndex: '',
            image: images.user,
        }
        //this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handleParentComponent = this.handleParentComponent.bind(this);
        this.filterArray = this.filterArray.bind(this);
    }

    componentWillMount() {
        this.filterArray();
    }

    handleParentComponent() {
        const { item } = this.props;
        if (this.props.flag) { // if the caller is from Home             
            const response = [{ // the data will be retrieved through api calling
                'name': 'Duc Pham le',
                'age': '20',
                'gender': 'male',
            },
            {
                'name': 'Hong Anh Nguyen',
                'age': '19',
                'gender': 'female',
            },
            ];
            let name = null;
            let i = 0;
            for (i = 0; i < response.length; i++) {
                if (item.item === response[i].name) {
                    //header = response[i].header;
                    name = response[i];
                }
            }
            console.log('response[i]', name);
            this.props.navigation.navigate('UserDetail', name);
        }
        else { // if the caller is from Feedback
            console.log('data from parent sent: ', this.props.data);
            const response = [{
                'header': 'App quality',
                'response': 'Noobaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                'header': 'App performance',
                'response': 'Noob2',
            }, {
                'header': 'report on bugs',
                'response': 'Noob3',
            }];
            let header = null;
            let i = 0;
            for (i = 0; i < response.length; i++) {
                console.log('response: ', response[i])
                if (item.item === response[i].header) {
                    //header = response[i].header;
                    header = response[i];
                }
            }
            console.log('response[i]', header);
            this.props.navigation.navigate('FeedbackDetail', header);
            //this.props.navigation.navigate('FeedbackDetail', header); Send header to call api in the detail
        }
    }

    // this function collects the correct index of our data to retrieve pics and stuff
    filterArray() {
        const {data} = this.props;
        for (let i = 0; i < data.length; i++) {
            if (this.props.item.index === i) { //check the item index, if it reaches the correct index in data then take it
                let source = {
                    uri: data[i].uri
                }
                this.setState({image: source});
            }
        }
        console.log('image now: ', this.state.image);
    }

    render() {
        const { item, refresh, data, index } = this.props;
        // these will be the headers
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRow != null) {
                    this.state.activeRow = null;
                }
            },
            onOpen: (secId, rowId, direction) => {
            },
            right: [{
                onPress: () => {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete this contact ?',
                        [
                            { text: 'No', onPress: () => { console.log('cancel pressed') }, style: 'cancel' },
                            {
                                text: 'Yes', onPress: () => {
                                    data.splice(item.index, 1); // splice function is used to delete element
                                    refresh.refreshFlatList();
                                }
                            }
                        ],
                        { cancelable: true }
                    );
                },
                text: 'Delete', type: 'delete',
                backgroundColor: '#3FA1F6'
            },
            {
                onPress: this.handleParentComponent,
                text: 'View', type: 'view',
                backgroundColor: '#3FA1F6'
            }],
            left: [{
                onPress: () => {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to like this contact ?',
                        [
                            { text: 'No', onPress: () => { console.log('cancel pressed') }, style: 'cancel' },
                            {
                                text: 'Yes', onPress: () => {
                                    data.splice(item.index, 1); // splice function is used to delete element
                                    // should call api here to delete right away
                                    refresh.refreshFlatList();
                                }
                            }
                        ],
                        { cancelable: true }
                    );
                },
                text: 'Like', type: 'like',
                backgroundColor: '#3FA1F6'
            }],
            rowId: this.props.item.index,
            sectionId: 1
        }
        console.log('before rendering flatlist');
        console.log('fake data: ', this.props.data);
        return (
            <Swipeout {...swipeSettings}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                        <Image source={this.state.image} style={flatStyles.imgStyle}>

                        </Image>
                        <View style={{ flex: 1, flexDirection: 'column', height: 60, }}>
                            <Text style={flatStyles.flatListItem}>{this.props.item.item}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DEDEDE' }} />
                </View>
            </Swipeout>
        )
    }
}

export default withNavigation(FlatListItem);