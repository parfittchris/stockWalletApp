import { login, logout } from '../util/session_util';
import { LOGIN_USER, LOGOUT_USER, RECEIVE_ERRORS, REMOVE_ERRORS } from './types';

export const loginUser = user => dispatch => login(user)
            .then(res => dispatch({
                type: LOGIN_USER,
                user: res
            }))
            .fail(errors => dispatch({
                type: RECEIVE_ERRORS,
                errors: errors.responseJSON 
            }));

export const logoutUser = () => dispatch => logout()
             .then(() => dispatch({
                 type: LOGOUT_USER
             }))
             .fail(errors => dispatch({
                 type: RECEIVE_ERRORS,
                 errors: errors.responseJSON
             }));


export const removeErrors = () => ({
    type: REMOVE_ERRORS
});
