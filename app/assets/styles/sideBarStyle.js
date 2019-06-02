import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
// style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // flex: 1
    },
    sbInfo: { marginTop: height / 10 },
    navTextSignOut: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    },
    userImgIcon: {
        marginTop: 50,
        width: width / 7,
        height: width / 7
    },
    userInfoNav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width / 10
    },
    backImg: {
        width: width / 15,
        height: width / 20
    }
});

export default styles;
