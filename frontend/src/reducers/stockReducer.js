import { GET_STOCK, LOGOUT_USER } from '../actions/types';
import { merge } from 'lodash';

const stockReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_STOCK:
            return merge({}, state, action.stock)
        case LOGOUT_USER:
            return {}
        default:
            return state
    }
}

export default stockReducer;