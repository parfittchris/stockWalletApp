import { connect } from 'react-redux';
import { fetchTransactions } from '../../actions/transaction_actions';

import Transactions from './transactions';

const mapStateToProps = state => {
    return {
        userId: state.sessionsReducer.id,
        currentUser: state.usersReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTransactions: () => dispatch(fetchTransactions()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
