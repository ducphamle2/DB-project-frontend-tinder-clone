/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

// a place to store common variables, and we change these vars by calling different Action functions.
const LoginReducer = (
  state = {
    isLoginSuccess: false,
    registerEnter: false,
    email: '',
    password: '',
    token: '',
  }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: payload
      }

    case ActionType.CLEAR_LOGIN_STATE:
      return {
        ...state,
        isLoginSuccess: false,
        email: '',
        password: '',
        token: '',
      }
    case ActionType.SET_USERNAME:
      return {
        ...state,
        email: payload
      }
    case ActionType.SET_TOKEN:
      return {
        ...state,
        token: payload
      }
    case ActionType.REGISTER_ENTER:
      return {
        ...state,
        isLoginSuccess: false,
        registerEnter: payload
      }
    default:
      return state;
  }
}


export default LoginReducer;