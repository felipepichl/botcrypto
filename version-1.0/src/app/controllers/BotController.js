import { api } from '../../services/api';

class BotController {
  async index(req, res) {
    const response = await api.get('');

    const candle = response.data[499];

    return res.send(candle[4]);
  }
}

export { BotController };
