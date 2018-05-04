import { h, app } from 'hyperapp'; // eslint-disable-line
import { formatPrice } from '../helpers/utilities';
import './index.css';

const Coin = ({ coin, native }) => { // eslint-disable-line
  let price = null;
  switch (native) {
    case 'USD':
      price = coin.price_usd;
      break;
    case 'EUR':
      price = coin.price_eur;
      break;
    case 'GBP':
      price = coin.price_gbp;
      break;
    default:
      price = coin.price_usd;
      break;
  }
  const change =
    Number(coin.percent_change_24h) > 0 ? 'positive' : Number(coin.percent_change_24h) < 0 ? 'negative' : null;// eslint-disable-line
  return (
    <div className={`coin coin-${coin.symbol}`}>
      <div className="coin-rank">{coin.rank}</div>
      <div className="coin-icon">
        <div className={`icon icon-${coin.symbol.toLowerCase()}`} />
      </div>
      <div className="coin-name">{`${coin.name} [${coin.symbol}]`}</div>
      <div className={`coin-24h-change ${change}`}>{`${coin.percent_change_24h} %`}</div>
      <div className="coin-price">{`${formatPrice(price)} ${native}`}</div>
    </div>
  );
};

export default Coin;
