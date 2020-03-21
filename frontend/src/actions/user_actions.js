import { signUp, searchUser } from '../util/user_util';
import { SIGNUP_USER, GET_USER, RECEIVE_ERRORS} from './types';


export const signUpUser = user => dispatch => signUp(user)
    .then(res => dispatch({
        type: SIGNUP_USER,
        user: res
    }))
    .fail(errors => dispatch({
        type: RECEIVE_ERRORS,
        errors: errors.responseJSON
    }));

export const getUser = id => dispatch => searchUser(id)
    .then(res => dispatch({
        type: GET_USER,
        user: res
    }))
    .fail(errors => dispatch({
        type: RECEIVE_ERRORS,
        errors: errors.responseJSON
    }));
