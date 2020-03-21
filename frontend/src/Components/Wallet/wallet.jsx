import React from 'react';
import './wallet.css';


class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      value: null,
      stockNames: [],
      stocks: [],
      selected: false
    };

    this.refresh = this.refresh.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  removeRow(stock) {
    let row = document.getElementById(`stock-${stock.name}`)
    row.parentNode.removeChild(row);
    this.buildTable.bind(this);
  }

  componentDidMount() {
    const user = this.props.currentUser[this.props.userId];

    this.setState(
      {
        username: user.username,
        email: user.email,
        money: user.money,
        stockNames: user.followed_stocks
      },
      () => this.buildTable()
    );
  }

  //Builds Users stocks table by generating rows from GET results
  buildTable() {
    let table = document.getElementById('portfolioTable');
    let value = 0;
    let allStocks = [];

    if (table) {
      table.innerHTML = '';
      let header = table.insertRow(0);

      header.setAttribute('class', 'tableHeader');
      header.innerHTML = `
              <tr>
                <th>Stock Name</th>
                <th>Quantity</th>
                <th>Price/Share</th>
                <th>Total</th>
              </tr>`;

      this.state.stockNames.forEach(stock => {
        this.props.fetchStock(stock.name).then(res => {
          value += res.stock.latestPrice * stock.quantity;
          allStocks.push(res);
          let stockClass;
          if (
            res.stock.latestPrice >
            (res.stock['open'] || res.stock['previousClose'])
          ) {
            stockClass = 'highPrice';
          } else if (
            res.stock.latestPrice <
            (res.stock['open'] || res.stock['previousClose'])
          ) {
            stockClass = 'lowPrice';
          } else {
            stockClass = 'stockPrice';
          }
          let row = document.createElement('tr');
          row.classList.add('stockRow');
          row.setAttribute('data-name', res.stock.companyName);
          row.setAttribute('id', `stock-${res.stock.symbol}`);

          row.innerHTML = `
                      <td class="stockName">${res.stock.symbol}</td>
                      <td class="stockQty" >${stock.quantity}</td>
                      <td class="${stockClass}">$${res.stock.latestPrice.toFixed(
            2
          )}</td>
                      <td class="totalPrice">$${(
                        res.stock.latestPrice.toFixed(2) * stock.quantity
                      ).toFixed(2)}</td>`;
          row.onclick = this.selectStock.bind(this);
          table.appendChild(row);

          this.setState({
            value: value.toFixed(2)
          });
        });
      });

      this.setState({
        stocks: allStocks
      });
    }
  }

  //Identifies specific stock user clicks to set up for selling
  selectStock(e) {
    const section = document.getElementsByClassName('stockSection')[0];

    if (!this.state.selected) {
      section.classList.remove('stockSection');
      section.classList.add('stockSectionActive');
    }

    const name = e.currentTarget.dataset.name;
    const qty = e.currentTarget.getElementsByClassName('stockQty')[0].innerHTML;

    const selected = this.state.stocks.filter(stock => {
      return stock.stock.companyName === name;
    })[0];

    selected['quantity'] = qty;

    this.setState({
      selected
    });
  }

  //Sell Form only shows if a stock has been selected
  sellForm() {
    if (this.state.selected) {
      return (
        <form
          id='sellForm'
          onSubmit={this.handleSubmit.bind(this)}
          autoComplete='off'
        >
          <h3>Sell {this.state.selected.stock['companyName']} Shares</h3>
          <p>
            Opening Price: $
            {this.state.selected.stock['open'] ||
              this.state.selected.stock['previousClose']}{' '}
            | Current Share Price: ${this.state.selected.stock['latestPrice']}
          </p>
          <p> Current Shares: {this.state.selected['quantity']}</p>
          <label>How many shares do you want to sell?</label>
          <input id='sellInput' type='number' />
          <button type='submit' id='sellButton'>
            Sell
          </button>
        </form>
      );
    }
  }

  // Redirects back to index page
  redirect(e) {
    this.props.history.push('/index');
  }

  //Refreshes table so current results are shown
  refresh() {
    this.props.refresh();
  }

  //signs out from profile page
  signOut() {
    this.props.logout();
  }

  //Sells Stock via post request to transactions controller and 'DELETE' or 'PATCH' request to Stocks controller
  handleSubmit(e) {
    const sellQuantity = parseInt(document.getElementById('sellInput').value);
    const userQuantity = parseInt(this.state.selected.quantity);

    if (sellQuantity <= userQuantity) {
      const stock = {
        name: this.state.selected.stock.symbol,
        quantity: sellQuantity * -1,
        user_id: this.props.userId,
        price: this.state.selected.stock.latestPrice
      };

      if (sellQuantity === userQuantity) {
        this.props.sellAllStock(stock).then(this.removeRow(stock))
      } else {
        this.props.updateCurrentStock(stock).then(this.refresh());
      }

      const transaction = {
        user_id: this.props.userId,
        transactionType: 'sell',
        quantity: sellQuantity,
        price: this.state.selected.stock.latestPrice,
        stock: this.state.selected.stock.symbol
      };

      this.props.createTransaction(transaction);
    } else {
      alert("You don't own that much stock.");
    }
    
  }

  render() {
    return (
      <div id='walletComponent'>
        <div id='walletContents'>
          <div className='userImage' />
          <div className='walletTopButtons'>
            <button onClick={this.redirect.bind(this)}>Index</button>
            <button onClick={this.signOut.bind(this)}>Log Out</button>
          </div>
          <p>{this.state.username}</p>
          <p>Portfolio Value: ${this.state.value}</p>
          <p>My Stock Portfolio:</p>
        </div>
        <div className='stockSection'>
          <table id='portfolioTable'></table>
        </div>
        <div id='sellStock'>{this.sellForm()}</div>
      </div>
    );
  }
}

export default Wallet;