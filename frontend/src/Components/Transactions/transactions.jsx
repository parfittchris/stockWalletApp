import React from 'react';
import './transactions.css';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {transactions: []}
    }

    componentDidMount() {
        this.props.fetchTransactions().then(res => {
            const userResults = [];
            
            for (const number in res.transactions) {
                if (res.transactions[number].user_id === this.props.userId) userResults.push(res.transactions[number]);
            }


            this.setState({
                transactions: userResults
            }, this.buildTable);
        })
    }


    // Builds table based on all transactions received from database 'GET' request
    buildTable() {
        const table = document.getElementById('transactionsTable');

        if (table) {
            table.innerHTML = '';
            let header = table.insertRow(0);
            header.setAttribute('class', 'tableHeader');
            header.innerHTML = `
                <tr className='tableHeader'>
                    <th>Stock</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Share Price</th>
                    <th>Date</th>
                </tr>`;

            for (const number in this.state.transactions) {
                const item = this.state.transactions[number];
                let row = document.createElement('tr');
                row.classList.add('transactionsRow');
                let date = new Date(Date.parse(item.created_at))
                let currentDate = date.toISOString().split('T')[0];

                let hours = date.getHours();
                let period = 'am'
    
                if (hours > 12) {
                    hours -= 12
                    period = 'pm';
                };

                let time = `${hours}:${date.getMinutes()}:${date.getSeconds()}${period}`;

                row.innerHTML = `
                    <td className="transactionStock">${item.stock}</td>
                    <td className="transactionType">${item.transactionType}</td>
                    <td className="transactionQty">${item.quantity}</td>
                    <td className="transactionType">$${item.price}</td>
                    <td className="transactionDate">${currentDate + ' @ ' + time}</td>
                `
                table.appendChild(row)
            }
        }
    }

    changeForm() {
        this.props.setType('buyPage')
    }

    render() {
        return (
        <div id="transactions">
            <div className="componentTop">
                <p className="changeButton"><button onClick={this.changeForm.bind(this)}>Buy Stocks</button> | Transactions</p>
                <h3 id="transactionTitle">Transactions</h3>
            </div>
            <div id="transactionSection">
                <table id="transactionsTable"></table>
            </div>
        </div>
        )
    }
}

export default TransactionPage;