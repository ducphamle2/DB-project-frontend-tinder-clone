import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { ListItem, Left, Body } from 'native-base';

const style = StyleSheet.create({
    contentStyle: {
        fontFamily: 'Josefin Sans',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000'
    }
});

// used to render the side options like settings, logout etc with custom styles in icons and text
class IconSidebar extends React.Component {
    render() {
        const { source, onPress, content } = this.props;
        const { contentStyle } = style;
        return (
            // <TouchableOpacity onPress={onPress}>
            <ListItem onPress={onPress} icon>
                <Left>
                    <Image style={{ tintColor: '#3FA1F6'}} source={source} />
                </Left>
                <Body>
                    <Text style={contentStyle}>{content}</Text>
                </Body>
            </ListItem>
            // </TouchableOpacity>
        );
    }
}

export default IconSidebar;