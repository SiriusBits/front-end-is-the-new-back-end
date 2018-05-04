import React, { Component } from 'react';
import { apiGetPrices } from './components/helpers/api';
import Coin from './components/coins/Coin';
import { appData } from './appdata';
import logo from './images/crypto-logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appData,
    };
    // This binding is necessary to make `this` work in the callback
    this.fetchPrices = this.fetchPrices.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
  }

  componentDidMount() {
    console.log(this.state.appData.native);
    console.log(this.state.appData.show);
    this.fetchPrices(this.state.appData.amount, this.state.appData.native);
  }

  onChangeAmount(event) {
    this.setState({
      appData: {
        fetching: this.state.appData.fetching,
        coins: this.state.appData.data,
        show: event.target.value,
        native: this.state.appData.native,
      },
    });
    this.fetchPrices(event.target.value, this.state.appData.native);
  }

  onChangeCurrency(event) {
    this.setState({
      appData: {
        fetching: this.state.appData.fetching,
        coins: this.state.appData.data,
        show: this.state.appData.show,
        native: event.target.value,
      },
    });
    this.fetchPrices(this.state.appData.show, event.target.value);
  }

  fetchPrices(amount, currency) {
    this.setState({
      appData: {
        fetching: true,
        coins: this.state.appData.data,
        show: this.state.appData.show,
        native: this.state.appData.native,
      },
    });
    const _amount = typeof amount === 'string' ? amount : appData.show;
    const _currency = typeof currency === 'string' ? currency : appData.native;
    apiGetPrices(_amount, _currency)
      .then(({ data }) => this.coinSuccess(data, _amount, _currency))
      .catch(error => this.coinError(error, _amount, _currency));
  }

  coinSuccess(data, _amount, _currency) {
    console.log(data);
    this.setState({
      appData: { fetching: false, coins: data, show: _amount, native: _currency },
    });
  }

  coinError(error, _amount, _currency) {
    console.log(error, _amount, _currency);
    this.setState({
      appData: { fetching: false, coins: error, show: _amount, native: _currency },
    });
  }

  render() {
    const { fetching, coins, show, native } = this.state.appData; // eslint-disable-line
    return (
      <div className="App wrapper">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Crypto Exchange</h1>
        </header>
        <div className="content">
          <h1>Cryptocurrency Prices</h1>

          <div className="options">
            <div className="option-wrapper amount-option">
              <p>Show</p>
              <select defaultValue={this.state.appData.show} onChange={this.onChangeAmount}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="option-wrapper currency-option">
              <p>Currency</p>
              <select value={this.state.appData.native} onChange={this.onChangeCurrency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div className="column">
            {fetching ? (
              <div className="spinner" />
            ) : (
              <div className="coins-list">
                {coins.map(coin => <Coin key={coin.symbol} coin={coin} native={native} />)}
              </div>
            )}
          </div>

          <div className="footer">
            <a
              href="https://github.com/siriusbits/front-end-is-the-new-back-end/crypto-counter"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
