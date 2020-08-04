import { Listener } from "discord-akairo"
import logger from "../../logger"

module.exports = class BlockListener extends Listener {
  constructor() {
    super("block", {
      emitter: "commandHandler",
      event: "commandBlocked",
    })
  }

  exec(message: any, command: any, reason: any) {
    let _message: any = message
    delete _message.author

    logger.warn({
      author: message.author,
      command: command,
      reason: reason,
      message: _message,
    })
  }
}
