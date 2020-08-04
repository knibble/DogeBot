import { Command } from "discord-akairo"
import { Message, MessageAttachment } from "discord.js"
import Category from "../../typedefs/categories"
import { fetch } from "popsicle"

const api = "https://nekos.life/api/neko"

export default class CatGirlCommand extends Command {
  constructor() {
    super("catgirl", {
      aliases: ["catgirl"],
      category: Category.fun.name,
      description: {
        content: "Te muestro una imagen random de una neko chica",
        usage: "",
        examples: [""],
      },
      ratelimit: 2,
    })
  }

  async getCatGirl() {
    try {
      const response = await fetch(`${api}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  public async exec(message: Message) {
    const pic = await this.getCatGirl()
    const { neko } = await pic!.json()

    return message.util!.send(new MessageAttachment(neko))
  }
}
