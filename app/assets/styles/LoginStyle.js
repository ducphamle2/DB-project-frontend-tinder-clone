/**
 * define all style Login screen
 * @author DucPL
 */

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    loginBtnBox: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Josefin Sans'
    },
    findButtonText: {
        color: '#DB1E4A',
        fontSize: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signUpButtonText: {
        color: '#DB1E4A',
        fontSize: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loginText: {
        color: '#3399CC',
        fontSize: 12.5,
        fontWeight: 'bold'
    },
    loginButton: {
        marginBottom: 15,
        marginTop: 15,
        marginLeft: width / 3.1,
        backgroundColor: '#DB1E4A',
        height: height / 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (width * 2) / 6,
        //borderRadius: 25,
        shadowColor: '#D2D2D2',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.5
    },
    signUpButton: {
        marginLeft: 5,
        marginTop: -2,
        backgroundColor: '#ffffff',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        //borderRadius: 25,
        shadowColor: '#D2D2D2',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1.0
    },
    findButton: {
        marginLeft: 5,
        marginTop: -7,
        backgroundColor: '#ffffff',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 60,
        //borderRadius: 25,
        shadowColor: '#D2D2D2',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1.0
    },
});

export default LoginStyle;
