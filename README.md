# StockWallet - Pocket Sized App to Handle Your Stock Portfolio

[Live Version](https://stockwalletapp.herokuapp.com/)

## Background and Overview
StockWallet allows users to buy and sell stocks from the comfort of their own phone! Using the IEX API, registered users have the ability to view current/opening stock prices, buy and sell stocks and view their entire transaction history to date. Data is updated in realtime and users can see how their portfolio has changed regarding the current stock price.

## Functionality
In StockWallet, users have the ability to:
  * Register usernames and emails to create their account portfolios
  * Buy and Sell stocks using the IEX Stock database
  * View their current stock portfolio total value as well as individual stock breakdown that has visual cues to show performance based on opening price
  * View transaction history in the transactions tab
  

## Features

### User Authentictation
StockWallet only allows verified users access to a stock portfolio and the IEX API. Registration is free and is simplay a unique username/email and password to verify. Unverified users only have access to the login/signup page.
![wire frame](https://github.com/parfittchris/stockPortfolioApp/blob/master/staticassets/Login.png)

### User Profile and Stock List
User profiles including their stock portfolio are stored in a postgreSQL database that is received on successful login. Each followed stock is then sent to the IEX API to gain current value and then that information + the users purchase quantity is displayed in a table with total portfolio value above. Stocks that are performing better than their open day price are shown in green while those performing worse are shown in red.

![wire frame](https://github.com/parfittchris/stockPortfolioApp/blob/master/staticassets/Profile.png)


### Buy and Sell
Buying a stock is achieved by using the 'Puchase' section of the profile. A user will search for a stock by symbol, and if a match is found, they will have the opportunity to buy any number of that stock as long as the total purchase price is less than or equal to their current cash wallet. This is exists as a 'POST' request into the stocks table.

Selling is initiated when a user clicks a stock in their current wallet list. This opens the 'Sell' form showing opening price and current price as well as other information about the stock. The user will then have the option of selling any number of their shares of that stock. This is either a 'PATCH' or 'DELETE' request to the stocks table.

![wire frame](https://github.com/parfittchris/stockPortfolioApp/blob/master/staticassets/Wallet.png)
 
 ```purchase(e) {
    e.preventDefault();
    const quantity = parseInt(document.getElementById("purchaseQty").value);
    const allTickers = this.state.user.followed_stocks.map(stock => stock.name);

    if (quantity > 0 && this.state.cash > (quantity * this.state.stock.latestPrice)) {
      const stock = {
        name: this.state.stock.symbol,
        quantity: quantity,
        user_id: this.state.user.id,
        price: this.state.stock.latestPrice
      };

      if (allTickers.includes(stock.name)) {
          this.props.updateCurrentStock(stock).then(this.refresh);
      } else {
          this.props.buyNewStock(stock).then(this.refresh);
      }

      const transaction = {
        user_id: this.state.user.id,
        transactionType: 'buy',
        quantity: quantity,
        price: this.state.stock.latestPrice,
        stock: this.state.stock.symbol
      }

      this.props.createTransaction(transaction);
    }
  }
  ```

### Transactions
Transactions are shown when a user selects the 'Transactions' link above the Stock search bar. This opens the page showing all transactions that user has made to date. Transactions exist in a 'Transactions' table.

![wire frame](https://github.com/parfittchris/stockPortfolioApp/blob/master/staticassets/Transactions.png)

```buildTable() {
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
```

### Future Work
* Index Landing Page to show current well performing stocks, well performing stocks in the user wallet, company news, etc.
* Feature to add flexibility to user profile. For example add option to upload profile picture, upload more cash to go above default $5000, etc.


