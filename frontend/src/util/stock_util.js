import $ from 'jquery';

export const buyStock = stock => (
    $.ajax({
        method: 'POST',
        url: 'api/stocks',
        data: stock
    })
);

export const updateStock = stock => (
    $.ajax({
        method: 'PATCH',
        url: `api/stocks/1`,
        data: stock
    })
);

export const sellStock = stock => (
    $.ajax({
        method: 'DELETE',
        url: `api/stocks/1`,
        data: stock
    })
);

export const fetchStock = stock => (
    $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_7d93d6f153d84381b7721aca7e46d09c`
    })
);