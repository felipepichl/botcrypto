import { api } from '../../services/api';

class BotController {
  async index(req, res) {
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

    const result = 100 - 100 / (1 + strength);

    return res.send({ rsi: result });
  }
}

export { BotController };
