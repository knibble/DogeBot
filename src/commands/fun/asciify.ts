import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fetch } from "popsicle";
import Category from "../../typedefs/categories";

const api = "http://artii.herokuapp.com/";

export default class AsciifyCommand extends Command {
  constructor() {
    super("asciify", {
      aliases: ["asciify"],
      category: Category.fun.name,
      description: {
        content: "Convierte texto en arte ASCII",
        usage: "ascii [texto]",
        examples: ["DogeBot"]
      },
      ratelimit: 2,
      args: [
        {
          id: "text",
          type: "string"
        }
      ]
    });
  }

  async toAsciiArt(text: string) {
    try {
      const response = await fetch(`${api}make?text=${text}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async exec(message: Message, { text }: { text: string }) {
    if (!text) {
      const embed = new MessageEmbed().setColor(15897941);
      embed.addField(
        "Oops!",
        "Whoa! necesitas escribir un argumento para que funcione > <"
      );

      embed.addField(
        "Ejemplos",
        `\`${this.handler.prefix} ${
          this.aliases[0]
        } ${this.description.examples.join(`\`\n\`${this.aliases[0]}`)}\``,
        true
      );

      return message.util!.send(embed);
    }

    const asciiArt = await this.toAsciiArt(text);
    const asciiText = await asciiArt!.text();

    if (asciiArt!.statusText !== "OK")
      return message.util!.send(
        "Whoa! Algo extraño sucedio :thinking: , vuelve a intentarlo."
      );

    return message.util!.send(`\`\`\`${asciiText}\`\`\``);
  }
}
