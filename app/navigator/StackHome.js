import { createStackNavigator, createAppContainer } from "react-navigation";
import StackNavigator from '../navigator/Drawer';
import Profile from '../navigation_components/Profile'
import Feedback from '../navigation_components/Feedback'
import Example from '../navigation_components/Example'

const RootStack = createStackNavigator({
    StackNavigator: {
        screen: StackNavigator
    },
    initialRouteName: 'StackNavigator',
    Profile: {
        screen: Profile,

        navigationOptions: ({ navigation }) => ({
            title: 'User Information',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1,
                marginRight: 60
            },
            headerStyle: {
                backgroundColor: '#3FA1F6',
                zIndex: 100
            },
            headerTintColor: '#FFFFFF',
        })
    },

    Feedback: {
        screen: Feedback,
        navigationOptions: ({ navigation }) => ({
            title: 'Feedback screen',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1,
                marginRight: 60
            },
            headerStyle: {
                backgroundColor: '#3FA1F6',
                zIndex: 100
            },
            headerTintColor: '#FFFFFF',
        })
    },

    Example: {
        screen: Example,
        navigationOptions: ({ navigation }) => ({
            title: 'Example',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1,
                marginRight: 60
            },
            headerStyle: {
                backgroundColor: '#3FA1F6',
                zIndex: 100
            },
            headerTintColor: '#FFFFFF',
        })
    }
});

const StackHome = createAppContainer(RootStack);

export default StackHome;