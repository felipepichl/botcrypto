import { api } from '../../services/api';

class BotController {
  async index(req, res) {
    const response = await api.get('');

    const binance = response.data;

    return res.send({ binance });
  }
}

export { BotController };
