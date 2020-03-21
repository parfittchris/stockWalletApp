import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import { getUser } from '../../actions/user_actions';

import IndexPage from './userIndexPage';

const mapStateToProps = state => {
  return {
    userId: state.sessionsReducer.id,
    currentUser: state
  };
};


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
    getUser: id => dispatch(getUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
