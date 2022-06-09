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

    const rsi = 100 - 100 / (1 + strength);

    let bought = false;

    if (rsi > 70) {
      bought = false;
      return res.send({ rsi: 'Sobrecomprado' });
    }
    if (rsi < 30 && !bought) {
      bought = true;
      return res.send({ rsi: 'Sobrevendido' });
    }

    return res.send({ rsi });
  }
}

export { BotController };
