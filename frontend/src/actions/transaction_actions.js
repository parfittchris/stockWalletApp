import { getTransactions, addTransaction } from '../util/transaction_util';
import { GET_ALL_TRANSACTIONS } from './types';

export const fetchTransactions = () => dispatch => getTransactions()
    .then(res => dispatch({
        type: GET_ALL_TRANSACTIONS,
        transactions: res
    }))
    .fail(errors => console.log(errors));

export const createTransaction = transaction => dispatch => addTransaction(transaction)
    .then(res => dispatch({
        type: GET_ALL_TRANSACTIONS,
        transactions: res
    }))
    .fail(errors => console.log(errors));
