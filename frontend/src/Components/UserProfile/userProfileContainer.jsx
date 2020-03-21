import { connect } from 'react-redux';
import { getUser } from '../../actions/user_actions';


import userProfile from './userProfile';

const mapStateToProps = state => {
    return {
        userId: state.sessionsReducer.id,
        currentUser: state.usersReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: id => dispatch(getUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
