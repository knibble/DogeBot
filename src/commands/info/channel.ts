import moment from "moment"
import "moment-duration-format"
import Category from "../../typedefs/categories"

import { stripIndents } from "common-tags"
import { Command } from "discord-akairo"
import { Message, MessageEmbed, Permissions, TextChannel } from "discord.js"

export default class ChannelInfoCommand extends Command {
  public constructor() {
    super("channel", {
      aliases: ["canal", "channel"],
      description: {
        content: "Muestra información arcerca de un canal.",
        usage: "[canal]",
        examples: ["#general", "general", "222197033908436994"],
      },
      category: Category.info.name,
      channel: "guild",
      clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
      ratelimit: 2,
      args: [
        {
          id: "channel",
          match: "content",
          type: "channel",
          default: (message: Message) => message.channel,
        },
      ],
    })
  }

  public async exec(message: Message, { channel }: { channel: TextChannel }) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setDescription(`Acerca de **${channel.name}** (ID: ${channel.id})`)
      .addField(
        "Info",
        stripIndents`
				• Tipo: ${channel.type}
				• Tema: ${channel.topic || "Ninguno"}
				• NSFW: ${Boolean(channel.nsfw)}
				• Fecha de creación: ${moment
          .utc(channel.createdAt)
          .format("YYYY/MM/DD hh:mm:ss")}
			`
      )
      .setThumbnail(message.guild!.iconURL() || "")

    return message.util!.send(embed)
  }
}
