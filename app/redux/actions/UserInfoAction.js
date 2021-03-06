/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

// an object which contains different functions that pass type and payload params for reducers
const UserInfoAction = {
    updateUserInfo: payload => ({ type: ActionType.UPDATE_INFO, payload }),
    updateImage: payload => ({type: ActionType.UPDATE_IMAGE, payload}),
    updateTitle: payload => ({type: ActionType.UPDATE_TITLE, payload}),
    setNotification: payload => ({type: ActionType.SET_NOTIFICATION, payload}),
}

export default UserInfoAction;