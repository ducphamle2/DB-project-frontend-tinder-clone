import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
import images from '../assets/image_source/Images';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from '../render_component/ModalFeedback';
import FlatListItem from '../navigation_components/FlatListItem';
import FakeData from '../config/FakeData';

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

// these will be the headers

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
export default class Feedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDeleted: false,
		}
		this.handleAddButton = this.handleAddButton.bind(this);
	}

	handleAddButton() {
		this.refs.addModal.showAddModal();
	}

	// this function will be used to set state which makes the Home component render again - refresh our list
	refreshFlatList = () => {
		this.setState({ isDeleted: true });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={FakeData.dataTwo}
					renderItem={(item, index) => {
						console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
						console.log('index: ', item.index);
						return (
							// parentFlatList
							<FlatListItem item={item} index={index} refresh={this} flag={false} data={FakeData.dataTwo}>

							</FlatListItem>
						);
					}}
				>
				</FlatList>
				<ActionButton buttonColor='#DF2929' onPress={this.handleAddButton.bind()}>

				</ActionButton>

				<ModalFeedback ref={'addModal'} parentFlatList={this}>

				</ModalFeedback>
			</View>
		);
	}
}