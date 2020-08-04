import { Command } from "discord-akairo"
import { Message, MessageAttachment } from "discord.js"
import Category from "../../typedefs/categories"
import { fetch } from "popsicle"

const api = "https://shibe.online/api/shibes"

export default class DogePicCommand extends Command {
  constructor() {
    super("dogepic", {
      aliases: ["dogepic"],
      category: Category.fun.name,
      description: {
        content: "Te muestro una imagen random de un doge",
        usage: "",
        examples: [""],
      },
      ratelimit: 2,
    })
  }

  async getDogePic() {
    try {
      const response = await fetch(
        `${api}?count=${1}&urls=${true}&httpsUrls=${true}`
      )
      return response
    } catch (error) {
      console.log(error)
    }
  }

  public async exec(message: Message) {
    const pic = await this.getDogePic()
    const dogepic = await pic!.json()

    return message.util!.send(new MessageAttachment(dogepic[0]))
  }
}
