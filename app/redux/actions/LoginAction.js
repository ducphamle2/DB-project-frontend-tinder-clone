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
    registerEnter: payload => ({type: ActionType.REGISTER_ENTER, payload}),
}

export default LoginAction;