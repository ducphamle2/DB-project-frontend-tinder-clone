import React from 'react';
import { Text, Image, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    contentStyle: {
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Josefin Sans',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 5
    },
    imgStyle: {
        width: width / 5,
        height: width / 5,
        marginLeft: width / 40,
        marginTop: width / 40,
        borderRadius: width / 10,
        marginLeft: 5
    }
});

// this class is used to render an image profile with fullname under it
class ImageProfile extends React.Component {
    render() {
        const { url, content } = this.props; // url for the picture (get from user info db, and content is name)

        const { container, contentStyle, imgStyle } = style;

        return (
            <View style={container}>
                <Image source={url} style={imgStyle} />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={contentStyle}>{content}</Text>
                </View>
            </View>
        );
    }
}

export default ImageProfile;