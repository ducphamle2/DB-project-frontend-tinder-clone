import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert, Button } from 'react-native';
import images from '../assets/image_source/Images';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button
import ModalFeedback from '../render_component/ModalFeedback';
import FlatListItem from '../navigation_components/FlatListItem';
import FakeData from '../config/FakeData';
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

const data = [
	{
		key: 1,
		value: 'noob',
	},
	{
		key: 2,
		value: 'noob2',
	}
]

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
			data: [],
			isUpdated: false,
		}
		this.renderHeader = this.renderHeader.bind(this);
		this.handleAddButton = this.handleAddButton.bind(this);
	}

	handleAddButton() {
		this.refs.addModal.showAddModal();
	}

	// get data from db
	async componentWillMount() {
		// this.state.data = redux data ?
		await api.getFeedback(this.onHandleGetFeedback.bind(this));
	}

	async componentDidMount() {
		// this.state.data = redux data ?
		await api.getFeedback(this.onHandleGetFeedback.bind(this));
	}

	renderHeader = () => {
		console.log('in render header');
		return (
			<Button
				onPress={this.componentDidMount.bind(this)}
				title="Update list"
				color="#DB1E4A"
			>

			</Button>
		);
	};

	onHandleGetFeedback(isSuccess, response, error) {
		if (isSuccess) {
			if (response.data.length === 0) {
				this.setState({ data: response.data }); // if no data then get that array
				console.log('data empty')
			}
			else {
				const temp = [];
				for (let i = 0; i < response.data.length; i++) {
					temp[i] = response.data[i].content; //get the content of data
				}
				this.setState({ data: temp });
			}
		}
		else {
			console.log('error: ', error);
		}
	}

	// this function will be used to set state which makes the Home component render again - refresh our list
	refreshFlatList = () => {
		this.setState({ isDeleted: true });
	}

	render() {
		const { data } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					renderItem={(item, index) => {
						console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
						console.log('index: ', item.index);
						return (
							// parentFlatList
							// need to pass an array of object pic url, and then we scan its index
							// in the FlatListItem. If it matched then we get that url from that index.
							<FlatListItem item={item} index={index} refresh={this} flag={false} data={data}>

							</FlatListItem>
						);
					}}
					ListHeaderComponent={this.renderHeader}
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