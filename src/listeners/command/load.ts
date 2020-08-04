import { Listener, Command } from "discord-akairo"
import { listener as logger } from "../../logger"

export default class LoadHandler extends Listener {
  constructor() {
    super("load", {
      emitter: "commandHandler",
      event: "load",
    })
  }

  async exec(command: Command) {
    logger.debug(
      { aliases: command.aliases },
      `Loaded command <${command.id}>.`
    )
  }
}
