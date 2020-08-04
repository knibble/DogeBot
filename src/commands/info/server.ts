import moment from "moment"
import { Command } from "discord-akairo"
import { Message, VerificationLevel, MessageEmbed } from "discord.js"
import Category from "../../typedefs/categories"
import { stripIndents } from "common-tags"

type HumanLevels = {
  [key in VerificationLevel]: string
}

const HUMAN_LEVELS: HumanLevels = {
  NONE: "Ninguno",
  LOW: "Bajo",
  MEDIUM: "Intermedio",
  HIGH: "(╯°□°）╯︵ ┻━┻'",
  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
}

export default class ServerCommand extends Command {
  public constructor() {
    super("server", {
      aliases: ["servidor", "server"],
      description: {
        content: "Devuelve información acerca del servidor.",
        usage: "",
        examples: [""],
      },

      category: Category.info.name,
      ratelimit: 2,
    })
  }

  public async exec(message: Message) {
    const guild = message.guild!
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setDescription(`Info acerca de **${guild.name}** (ID: ${guild.id})`)
      .addField(
        "- Canales:",
        stripIndents`
        • ${guild.channels.cache.filter(({ type }) => type === "text").size}, ${
          guild.channels.cache.filter(({ type }) => type === "voice").size
        } Voz
        • AFK: ${
          guild.afkChannel
            ? `<#${guild.afkChannelID}> en ${guild.afkTimeout / 60}min`
            : "None"
        }
      `
      )
      .addField(
        "- Miembro",
        stripIndents`
        • ${guild.memberCount} miembros
        • Dueño: ${guild.owner!.user.tag} (ID: ${guild.ownerID})
      `
      )
      .addField(
        "- Otros",
        stripIndents`
        • Roles: ${guild.roles.cache.size}
        • Region: ${guild.region}
        • Creado el: ${moment
          .utc(guild.createdAt)
          .format("YYYY/MM/DD hh:mm:ss")}
        • Nivel de Verificación: ${HUMAN_LEVELS[guild.verificationLevel]}
      `
      )
      .setThumbnail(guild.iconURL() || "")

    return message.util!.send(embed)
  }
}
