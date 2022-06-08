import { Router } from 'express';

import { BotController } from '../app/controllers/BotController';

const routes = new Router();

const botController = new BotController();

routes.get('/crypto', botController.index);

export default routes;
