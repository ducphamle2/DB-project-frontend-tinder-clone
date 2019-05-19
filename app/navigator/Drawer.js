import React, { Component } from 'react';
import {
	// StackActions,
	createDrawerNavigator,
	createStackNavigator,
	DrawerActions
} from 'react-navigation';
import { TouchableOpacity, Image, View } from 'react-native';
import { StyleSheet, Dimensions, Text } from 'react-native';
import images from '../assets/image_source/Images'
import Tabbar from '../navigator/Tabbar';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';
import SideBar from '../navigator/SideBar';


const Drawer = createDrawerNavigator(
	{
		Tabbar: {
			screen: Tabbar // tabbar will be our home
		}
	},
	{
		initialRouteName: 'Tabbar',
		contentComponent: SideBar // sidebar is our content inside the drawer.
	}
)

// this is our drawer sidebar in Home
const StackNavigator = createStackNavigator(
	{
		Drawer: {
			screen: Drawer
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			// the button that toggle the drawer
			headerLeft: (
				<TouchableOpacity
					onPress={() => {
						navigation.dispatch(DrawerActions.toggleDrawer());
					}}
				>
					<Image style={(styles.iconHeader, styles.iconCollapseStyle)} source={images.menuIcon} />
				</TouchableOpacity>
			),
			//header: <LogoTitle/>,
			headerRight: (
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
					>
						<Image style={{ marginRight: 10, tintColor: '#FFFFFF' }} source={images.search} />
					</TouchableOpacity>

					<TouchableOpacity
					>
						<Image style={{ marginRight: 5, tintColor: '#FFFFFF' }} source={images.settings} />
					</TouchableOpacity>
				</View>
			),
			headerTransparent: true,
			headerStyle: {
				backgroundColor: '#3FA1F6',
				zIndex: 100
			},
			headerTintColor: 'transparent',
			headerTitleStyle: {
				fontWeight: 'bold',
				textAlign: 'center',
				flex: 1,
				font: 20
			},
			headerTitle: <LogoTitle />
		})
	}
)

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	wrapperHeader: { height: height / 15, backgroundColor: '#34B089' },
	rowHeaderCollape: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
	iconHeader: { width: width / 20, height: width / 20, tintColor: '#FFFFFF' },
	titleHeader: { color: 'white', fontSize: 16, fontWeight: 'bold' },
	iconNotifiStyle: { marginRight: width / 20 },
	iconCollapseStyle: { marginLeft: width / 20, tintColor: '#FFFFFF' },
	iconRightHeader: {
		width: 27.3,
		height: 15,
		textAlign: 'left',
		fontSize: 10,
		fontFamily: 'Arial',
		color: 'red',
		fontWeight: 'bold'
	},
	headerRightBody: {
		position: 'relative'
	}
});

// this class is used to get custom component for the header (dropdown)
class LogoTitle extends Component {

	render() {
		let data = [{
			value: 'All Contacts',
		}, {
			value: 'Mango',
		}, {
			value: 'Pear',
		}];
		return (
			// link doc for Dropdown component: https://reactnativeexample.com/material-dropdown-with-consistent-behaviour-on-ios-and-android/
			<View style={{ flex: 1, tintColor: '#FFFFFF' }}>
				<Dropdown
					//label='All Contacts'
					data={data}
					value={'All Contacts'}
					dropdownPosition={0}
					containerStyle={{ marginRight: 145, marginLeft: 30, marginBottom: 23 }}
					fontSize={18}
					baseColor={'#FFFFFF'}
					textColor={'#FFFFFF'}
					itemColor={'#000000'}
					selectedItemColor={'#3FA1F6'}
					fontWeight={'bold'}
				/>
			</View>
		)
	}
}

export default StackNavigator;