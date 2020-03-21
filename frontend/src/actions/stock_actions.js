import { buyStock, updateStock, sellStock, fetchStock } from '../util/stock_util';
import { GET_USER, GET_STOCK } from './types';

export const buyNewStock = stock => dispatch => buyStock(stock)
             .then(res => dispatch({
                 type: GET_USER,
                 user: res
             }))
            .fail(errors => console.log(errors));


export const updateCurrentStock = stock => dispatch => updateStock(stock)
             .then(res => dispatch({
                 type: GET_USER,
                 user: res
             }))
             .fail(errors => console.log(errors));


export const sellAllStock = stock => dispatch => sellStock(stock)
             .then(res => {
                 dispatch({
                 type: GET_USER,
                 user: res
             })})
             .fail(errors => console.log(errors));


export const fetchStockInfo = stock => dispatch => fetchStock(stock)
    .then(res => dispatch({
        type: GET_STOCK,
        stock: res
    }))
    .fail(errors => console.log(errors));
