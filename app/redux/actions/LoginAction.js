/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

// an object which contains different functions that pass type and payload params for reducers
const LoginAction = {
    isLoginSuccess: payload => ({ type: ActionType.LOGIN_SUCCESS, payload }),
    clearLoginState: payload => ({ type: ActionType.CLEAR_LOGIN_STATE, payload }),
    setUsername: payload => ({ type: ActionType.SET_USERNAME, payload }),
    setToken: payload => ({type: ActionType.SET_TOKEN, payload}),
    setId: payload => ({type: ActionType.SET_ID, payload}),
    registerEnter: payload => ({type: ActionType.REGISTER_ENTER, payload}),
    setUserInfo: payload => ({type: ActionType.SET_USER_INFO, payload}),
    setPassword: payload => ({type: ActionType.SET_PASSWORD, payload}),
}

export default LoginAction;