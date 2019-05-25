import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
import images from '../assets/image_source/Images';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button
import AddModal from '../render_component/AddModal';
import FlatListItem from '../navigation_components/FlatListItem';
import SearchInput, { createFilter } from 'react-native-search-filter';
import FakeData from '../config/FakeData';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../config/Api';
import UserInfoAction from '../redux/actions/UserInfoAction';
import { connect } from 'react-redux';

const KEYS_TO_FILTERS = ['name']; // key used in filter

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

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDeleted: false,
			data: '',
			array: [],
		}
		this.handleAddButton = this.handleAddButton.bind(this);
		this.extractImageUrlFilter = this.extractImageUrlFilter.bind(this);
	}

	/* this will call the api to get all the information we need about possible liked candidates including pictures, names, etc...
		Correct data type: 
		response = [
			{
				'name': 'abc',
				'url': 'xyz',...
			},
			{

			}
		]
	*/
	/*
	async componentWillMount() {
		await api.getInfo(this.onGetInfoHandle.bind(this));
	}

	onGetInfoHandle(isSuccess, response, error) {
		if (isSuccess) {
			this.setState({array: response.data});
		}
		else {
			console.log('error in Home: ', error);
		}
	}
	*/

	componentWillMount() {
		this.extractImageUrlFilter();
	}

	handleAddButton() {
		this.refs.addModal.showAddModal();
	}

	// this function will be used to set state which makes the Home component render again - refresh our list
	refreshFlatList = () => {
		this.setState({ isDeleted: true });
	}

	renderHeader = () => {
		return (
			<SearchInput // https://www.npmjs.com/package/react-native-search-filter
				placeholder="Type an username to search"
				onChangeText={txt => this.setState({ data: txt })}
				style={{
					height: 50,
					borderBottomColor: 'gray',
					marginLeft: 10,
					marginBottom: 10,
					borderBottomWidth: 1,
				}}
			>
			</SearchInput>
		);
	};

	// this function is used to extract the header of an array object for flat list render
	extractHeaderFilter(filteredUser) {
		const headerData = [];
		for (let i = 0; i < filteredUser.length; i++) {
			headerData[i] = filteredUser[i].name;
		}
		return headerData;
	}

	extractImageUrlFilter() {
		const uri = [];
		for (let i = 0; i < FakeData.data.length - 1; i++) {
			uri[i] = FakeData.data[i].uri;
		}
		const { dispatch } = this.props;
		console.log('uri in extract: ', uri)
		dispatch(UserInfoAction.updateImage(uri));
	}

	render() {
		// below line will filter the value of the key that we pass in KEYS_TO_FILTERS, FakeData.data is our object
		const filteredUser = FakeData.data.filter(createFilter(this.state.data, KEYS_TO_FILTERS));
		//const filteredUser = this.state.array.filter(createFilter(this.state.data, KEYS_TO_FILTERS));
		const headerData = this.extractHeaderFilter(filteredUser);
		console.log('header data: ', headerData);
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={headerData}
					renderItem={(item, index) => {
						//console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
						//console.log('index: ', item.index);
						return (
							<FlatListItem
								item={item}
								index={index}
								refresh={this}
								flag={true}
								data={FakeData.data}
							//data={this.state.array}
							>
							</FlatListItem>
						);
					}}
					ListHeaderComponent={this.renderHeader}

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

export default connect(state => ({
	image: state.UserInfoReducer.image,
}))(Home);