class BotController {
  index(req, res) {
    return res.send({ ok: true });
  }
}

export { BotController };
