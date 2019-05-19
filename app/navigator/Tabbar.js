import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Image } from 'react-native';
import Home from './Home';
import images from '../assets/image_source/Images';

const Tabbar = createMaterialTopTabNavigator({
    Home: {
        screen: Home,
        tabBarIcon: () => <Image source={images.sideBarImage} />
    }
},
    {
        tabBarPosition: 'bottom',
        lazy: true,
        swipeEnabled: true,
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                height: 0
            }
        }
    }
);

export default Tabbar;