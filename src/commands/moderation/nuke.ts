import { Command } from "discord-akairo"
import Category from "../../typedefs/categories"
import { Permissions, Message, TextChannel } from "discord.js"

export default class NukeCommand extends Command {
  public constructor() {
    super("nuke", {
      aliases: ["liquidar", "nuke"],
      category: Category.moderation.name,
      description: {
        content:
          "permite eliminar todos los mensajes de un canal instantáneamente",
        usage: "",
        examples: [""],
      },
      clientPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      channel: "guild",
      ratelimit: 2,
    })
  }

  public async exec(message: Message) {
    try {
      let fetched
      do {
        fetched = await message.channel.messages.fetch({
          limit: 100,
        })
        ;(message.channel as TextChannel).bulkDelete(fetched)
      } while (fetched.size >= 2)
    } catch (error) {
      console.error(error)
      return message.util!.send("Oops hubo un error al eliminar los mensajes!")
    }

    return (
      await message.util!.send(":exploding_head: :bomb:  Mensajes borrados!")
    ).delete({
      timeout: 800,
    })
  }
}
