import apiCrypto from 'imersao-bot-cripto-api';
import { api } from '../../services/api';

const creadential = {
  apiKey: 'tT3ZKxExVWGSWZ8rzD0UcUeiHWJESkWyuXiasOioZteqEOHYKQGLkZYJzWidDPmS',
  apiSecret: 'vsWuS5aliRhX87BDTEdZuoFOIoLX1PW3S3wBw74FW6yQBqduXIfZ3pA1M9iiAoJc',
  test: true,
};

class BotController {
  async index(req, res) {
    const symbol = 'BTCBUSD';
    const response = await api.get('');

    const closes = response.data.map(candle => parseFloat(candle[4]));

    // eslint-disable-next-line no-unused-vars
    let gains = 0;
    // eslint-disable-next-line no-unused-vars
    let losses = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = closes.length - 14; i < closes.length; i++) {
      // eslint-disable-next-line no-multi-assign
      const diff = closes[i] - closes[i - 1];

      if (diff >= 0) {
        gains += diff;
      } else {
        losses -= diff;
      }
    }

    const strength = gains / losses;

    const rsi = 100 - 100 / (1 + strength);

    let bought = false;

    if (rsi > 70) {
      bought = false;
      const sellResult = await apiCrypto.sell(creadential, symbol, 0.001);
      return res.send(sellResult);
    }
    if (rsi < 30 && !bought) {
      bought = true;
      const buyResult = await apiCrypto.buy(creadential, symbol, 0.001);
      return res.send(buyResult);
    }

    return res.send({ rsi });
  }
}

export { BotController };
