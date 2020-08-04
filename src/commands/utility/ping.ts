import { Command, CommandUtil } from "discord-akairo"
import { Message } from "discord.js"
import Category from "../../typedefs/categories"
import { stripIndents } from "common-tags"

const RESPONSES = [
  stripIndents`:ping_pong: Pong! \`$(ping)ms\`
					Me tarde alrededor de \`$(heartbeat)ms\` en ir y volver`,
  stripIndents`Solo para que lo sepas, esto es un poco cansado! \`$(ping)ms\`
						Me tarde alrededor de \`$(heartbeat)ms\` en ir y volver`,
  stripIndents`Espero una buena :cookie: despues de esto \`$(ping)ms\`
						Me tarde alrededor de \`$(heartbeat)ms\` en ir y volver`,
  stripIndents`Soy bueno haciendo pong! \`$(ping)ms\`
						Me tarde alrededor de \`$(heartbeat)ms\` en ir y volver`,
]

export default class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      category: Category.utility.name,
      description: {
        content:
          "Hazme ping y te doy un pong! De paso te digo cuanto me tardo en llegar al servidor y volver.",
        usage: "",
        examples: [""],
      },
      ratelimit: 2,
    })
  }

  public async exec(message: Message) {
    const msg = await message.util!.send("Pinging...")
    if (!msg) return null

    return message.util!.send(
      RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
        .replace(
          "$(ping)",
          (
            (msg.editedTimestamp || msg.createdTimestamp) -
            (message.editedTimestamp || message.createdTimestamp)
          ).toString()
        )
        .replace("$(heartbeat)", Math.round(this.client.ws.ping).toString())
    )
  }
}
