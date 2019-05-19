import LoginAction from '../redux/actions/LoginAction';
import store from '../redux/stores/store';

// this is used to reset all the states that have been set while running the app (for example when we logout)
function resetState() {
    store.dispatch(LoginAction.clearLoginState());
}

const StateUtil = {resetState};

export default StateUtil;