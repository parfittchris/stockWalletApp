import { RECEIVE_ERRORS, REMOVE_ERRORS } from '../actions/types';
import { merge } from 'lodash';


export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ERRORS:
            return merge([], state, action.errors);
        case REMOVE_ERRORS:
            return [];
        default:
            return state;
    }
}

