import { Listener } from "discord-akairo"
import { Message } from "discord.js"

export default class MissingPermissionsListener extends Listener {
  public constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
      category: "commandHandler",
    })
  }

  public exec(message: Message) {
    return message.reply(
      "Oops! No tienes los permisos para usar ese comando >w<"
    )
  }
}
