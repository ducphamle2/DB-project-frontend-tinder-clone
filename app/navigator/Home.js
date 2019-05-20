import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
import images from '../assets/image_source/Images';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button
import AddModal from '../render_component/AddModal';

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

const data = ['Duc Pham le', 'Hong Anh Nguyen', 'Noob1', 'noob2', 'noob3', 'noob4', 'noob5', 'noob6', 'noob7', 'noob8'];
// this will be username
// to get list of friends => componentwillmount will call api to request to the table of friends or possible 
// liked people according to their location (send to server username and location and preferred gender ?)
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
class FlatListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRow: null,
		}
	}
	render() {
		const { item, refresh } = this.props;
		const swipeSettings = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				if (this.state.activeRow != null) {
					this.state.activeRow = null;
				}
			},
			onOpen: (secId, rowId, direction) => {
				console.log('item of this row: ', item.item); // get username
				this.setState({ activeRow: item.item });
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
			sectionId: 1,
		}
		console.log('before rendering flatlist');
		return (
			<Swipeout {...swipeSettings}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
						<Image source={images.user} style={flatStyles.imgStyle}>

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

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
export default class Home extends Component {
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
					data={data}
					renderItem={(item, index) => {
						console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
						console.log('index: ', item.index);
						return (
							// parentFlatList
							<FlatListItem item={item} index={index} refresh={this}>

							</FlatListItem>
						);
					}}
				>
				</FlatList>
				<ActionButton buttonColor='#DF2929' onPress={this.handleAddButton.bind()}>

				</ActionButton>

				<AddModal ref={'addModal'} parentFlatList={this}>

				</AddModal>
			</View>
		);
	}
}