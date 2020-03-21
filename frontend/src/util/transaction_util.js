import $ from 'jquery';

export const getTransactions = () => (
    $.ajax({
        method: 'GET',
        url: `api/transactions`
    })
);

export const addTransaction = transaction => (
    $.ajax({
        method: 'POST',
        url: `api/transactions`,
        data: transaction
    })
);

