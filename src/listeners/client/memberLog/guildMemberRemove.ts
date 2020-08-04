import { Listener } from "discord-akairo"
import { GuildMember, MessageEmbed, TextChannel } from "discord.js"

export default class GuildMemberRemoveMemberLogListener extends Listener {
  public constructor() {
    super("guildMemberRemoveMemberLog", {
      emitter: "client",
      event: "guildMemberRemove",
      category: "automation",
    })
  }

  public async exec(member: GuildMember) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .addField(
        "¡Hasta luego!",
        `¡Esperamos algún día volver a verte! ${this.client.emojis.cache.find(
          (e) => e.name === "dogesad"
        )}`
      )
      .setAuthor(
        `${member.user.tag} (${member.id})`,
        member.user.displayAvatarURL()
      )
      .setFooter("Se ha ido uwu")
      .setTimestamp(new Date())

    return (this.client.channels.cache.get(
      "640752264390246400"
    ) as TextChannel).send(embed)
  }
}
