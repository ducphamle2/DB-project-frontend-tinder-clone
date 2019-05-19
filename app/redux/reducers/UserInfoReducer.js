/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

const UserInfoReducer = (
    state = {
        age: '',
        gender: '',
        phoneNumber: '',
        city: '',
    }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.UPDATE_INFO:
            return {
                ...state,
                age: payload.age,
                gender: payload.gender,
                phoneNumber: payload.phoneNumber,
                city: payload.city,
            }
        default:
            return state;
    }
}


export default UserInfoReducer;