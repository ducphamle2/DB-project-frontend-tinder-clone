/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

// an object which contains different functions that pass type and payload params for reducers
const UserInfoAction = {
    updateUserInfo: payload => ({ type: ActionType.UPDATE_INFO, payload }),
}

export default UserInfoAction;