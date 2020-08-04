import { Listener } from "discord-akairo"
import { listener as logger } from "../../logger"

module.exports = class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    })
  }

  async exec() {
    logger.info("Connected to Discord.")
  }
}
