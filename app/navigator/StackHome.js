import { createStackNavigator, createAppContainer } from "react-navigation";
import StackNavigator from '../navigator/Drawer';
import Profile from '../navigation_components/Profile'
import Feedback from '../navigation_components/Feedback'
import Example from '../navigation_components/Example'
import FeedbackDetail from '../navigation_components/FeedbackDetail';
import UserDetail from '../navigation_components/UserDetail';
import RenderPictures from '../render_component/RenderPictures';
import SetupPictures from '../navigation_components/SetupPictures';

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
    },
    FeedbackDetail: {
        screen: FeedbackDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Feedback Details',
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
    UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Feedback Details',
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
    RenderPictures: {
        screen: RenderPictures,
        navigationOptions: ({ navigation }) => ({
            title: 'Render pictures',
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
    SetupPictures: {
        screen: SetupPictures,
        navigationOptions: ({ navigation }) => ({
            title: 'setup pictures',
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
});

const StackHome = createAppContainer(RootStack);

export default StackHome;