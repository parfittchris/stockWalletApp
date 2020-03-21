import { connect } from 'react-redux';
import { getUser } from '../../actions/user_actions';
import { updateCurrentStock, sellAllStock, fetchStockInfo } from '../../actions/stock_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { logoutUser } from '../../actions/session_actions';
import { withRouter } from 'react-router';

import Wallet from './wallet';

const mapStateToProps = state => {
  return {
    userId: state.sessionsReducer.id,
    currentUser: state.usersReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: id => dispatch(getUser(id)),
    updateCurrentStock: stock => dispatch(updateCurrentStock(stock)),
    sellAllStock: stock => dispatch(sellAllStock(stock)),
    fetchStock: stock => dispatch(fetchStockInfo(stock)),
    createTransaction: transaction => dispatch(createTransaction(transaction)),
    logout: () => dispatch(logoutUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
