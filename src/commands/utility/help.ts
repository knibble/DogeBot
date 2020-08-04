import s from "voca"
import { Command, PrefixSupplier } from "discord-akairo"
import { Message, MessageEmbed, Permissions } from "discord.js"
import { stripIndents } from "common-tags"
import CommandCategory from "../../typedefs/categories"
import { getCategoryEmojiFromName } from "../../util/help"

export default class HelpCommand extends Command {
  public constructor() {
    super("help", {
      aliases: ["ayuda", "help"],
      description: {
        content:
          "Muestra una lista de los comandos disponibles e información acerca de ellos",
        usage: "[comando]",
        examples: ["ping"],
      },
      category: CommandCategory.utility.name,
      ratelimit: 2,
      args: [
        {
          id: "command",
          type: "commandAlias",
        },
      ],
    })
  }

  public async exec(message: Message, { command }: { command: Command }) {
    const prefix = this.handler.prefix
    const reply = (prefix: string | string[] | PrefixSupplier) => stripIndents`
					Para mas información, escribe \`${prefix}${this.aliases[0]} <comando>\`
				`
    if (!command) {
      const embed = new MessageEmbed()
        .setColor(15897941)
        .addField("**Lista De Comandos**", reply(prefix))

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `${getCategoryEmojiFromName(category.id)} ${s.titleCase(
            category.id
          )}`,
          `${category
            .filter((cmd) => cmd.aliases.length > 0)
            .map((cmd) => `\`${cmd.aliases[0]}\``)
            .join(" ")}`
        )
      }

      return message.util!.send(embed)
    }

    const embed = new MessageEmbed()
      .setColor(15897941)
      .setTitle(`**${command.aliases[0]} ${command.description.usage || ""}**`)
      .addField("❯ Descripción", command.description.content || "\u200b")

    if (command.aliases.length > 1)
      embed.addField("❯ Aliases", `\`${command.aliases.join("` `")}\``, true)
    if (command.description.examples!.length)
      embed.addField(
        "❯ Ejemplos",
        `\`${this.handler.prefix} ${
          command.aliases[0]
        } ${command.description.examples.join(
          `\`\n\`${this.handler.prefix} ${command.aliases[0]} `
        )}\``,
        true
      )

    return message.util!.send(embed)
  }
}
