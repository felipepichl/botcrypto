import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m',
});

export { api };
