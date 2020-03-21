import { LOGOUT_USER, LOGIN_USER, SIGNUP_USER } from '../actions/types';



const _nullUser = Object.freeze({
    id: null
});

const sessionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case LOGIN_USER:
            return {id: action.user.id};
        case LOGOUT_USER:
            return {id: null}
        case SIGNUP_USER:
            return {id: action.user.id};
        default:
            return state
    }
}

export default sessionsReducer;