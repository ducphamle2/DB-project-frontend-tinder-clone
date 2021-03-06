/**
 * @author DucPL
 */
import ActionType from "../ActionTypes";

const UserInfoReducer = (
  state = {
    age: "",
    gender: "",
    phoneNumber: "",
    city: "",
    image: [],
    title: "",
    notification: []
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_INFO:
      return {
        ...state,
        age: payload.age,
        gender: payload.gender,
        phoneNumber: payload.phoneNumber,
        city: payload.city
      };
    case ActionType.UPDATE_IMAGE:
      return {
        ...state,
        image: payload
      };
    case ActionType.UPDATE_TITLE:
      return {
        ...state,
        title: payload
      };
    case ActionType.SET_NOTIFICATION:
      return {
        ...state,
        notification: payload
      };
    default:
      return state;
  }
};

export default UserInfoReducer;
