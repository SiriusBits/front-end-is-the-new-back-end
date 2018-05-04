import { h, app } from 'hyperapp'; // eslint-disable-line
import { apiGetPrices } from '../components/helpers/api';
import Coin from '../components/coins/Coin';
import logo from '../images/crypto-logo.svg';
import '../app.css';

const home = (state, appData) => {
  const { fetching, coins, show, native } = state;
  const {
    API_COINS_REQUEST,
    API_COINS_SUCCESS,
    API_COINS_FAILURE,
    CHANGE_AMOUNT_TO_SHOW,
    CHANGE_NATIVE_CURRENCY,
  } = appData;
  const fetchPrices = (amount, currency) => {
    API_COINS_REQUEST();
    const _amount = typeof amount === 'string' ? amount : show;
    const _currency = typeof currency === 'string' ? currency : native;
    apiGetPrices(_amount, _currency)
      .then(({ data }) => API_COINS_SUCCESS(data))
      .catch(error => API_COINS_FAILURE(error));
  };
  const onChangeAmount = ({ target }) => {
    CHANGE_AMOUNT_TO_SHOW(target.value);
    fetchPrices(target.value, native);
  };
  const onChangeCurrency = ({ target }) => {
    CHANGE_NATIVE_CURRENCY(target.value);
    fetchPrices(show, target.value);
  };
  return (
    <div className="App wrapper">
        <div oncreate={fetchPrices} className="wrapper">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Crypto Exchange</h1>
        </header>
        <div className="content">
          <h1>Cryptocurrency Prices</h1>

          <div className="options">
            <div className="option-wrapper amount-option">
              <p>Show</p>
              <select onChange={onChangeAmount}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="option-wrapper currency-option">
              <p>Currency</p>
              <select onChange={onChangeCurrency}>
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
    </div>
  );
};

export default home;
