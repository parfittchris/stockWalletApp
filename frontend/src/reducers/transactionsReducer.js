import { GET_ALL_TRANSACTIONS, LOGOUT_USER } from '../actions/types';
import { merge } from 'lodash';

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_ALL_TRANSACTIONS:
            return merge({}, state, action.transactions)
        case LOGOUT_USER:
            return {};
        default:
            return state
    }
}

export default transactionsReducer;