import { connect} from 'react-redux';
import { loginUser, removeErrors } from '../../actions/session_actions';
import { signUpUser } from '../../actions/user_actions';

import SplashPage from './splashPage.jsx';

const mapStateToProps = state => {
    return {
        errors: state.errorsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        login: user => dispatch(loginUser(user)),
        signUp: user => dispatch(signUpUser(user)),
        removeErrors: () => dispatch(removeErrors())
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);