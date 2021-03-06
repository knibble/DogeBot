import { Command } from "discord-akairo"
import Category from "../../typedefs/categories"
import { Permissions, Message } from "discord.js"

export default class SayCommand extends Command {
  constructor() {
    super("say", {
      aliases: ["repite", "say"],
      category: Category.fun.name,
      description: {
        content: "Repito lo que me digas",
        usage: "[texto]",
        examples: ["hola soy doge!"],
      },
      clientPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      channel: "guild",
      ratelimit: 2,
      args: [
        {
          id: "text",
          match: "content",
        },
      ],
    })
  }

  public async exec(message: Message, { text }: { text: string }) {
    if (text) {
      await message.util!.send(text.trim())
      await message.delete()
    }
  }
}
