import { Command } from "discord-akairo"
import { Message } from "discord.js"
import { MessageEmbed } from "discord.js"
import Category from "../../typedefs/categories"

export default class RollCommand extends Command {
  constructor() {
    super("roll", {
      aliases: ["roll"],
      category: Category.fun.name,
      editable: true,
      description: {
        content: "Tira un dado!",
        usage: "",
        examples: [""],
      },
    })
  }

  public async exec(message: Message) {
    const embed = new MessageEmbed()
    const roll = Math.floor(Math.random() * 6) + 1
    embed.color = 15897941
    embed.setTitle(`Tiraste un ${roll} :game_die:`)
    await message.util!.send({ embed })
  }
}
