import { Listener } from "discord-akairo"
import Category from "../../../typedefs/categories"
import { GuildMember } from "discord.js"
import { MessageEmbed } from "discord.js"
import { TextChannel } from "discord.js"

export default class GuildMemberAddListener extends Listener {
  constructor() {
    super("guildMemberAddListener", {
      emitter: "client",
      event: "guildMemberAdd",
      category: "automation",
    })
  }

  async exec(member: GuildMember) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
      .addField(
        `Bienvenido/a!`,
        `Gracias por unirte al servidor de **${member.guild.name}**!
        Esperamos que la pases bien, wow! ${this.client.emojis.cache.find(
          (e) => e.name === "cooldoge"
        )}
        Recuerda leer ${member.guild.channels.cache.get("702078137651167253")}
        Si tienes cualquier duda solo contacta a cualquiera de los miembros de ${member.guild.roles.cache.get(
          "640770292808941586"
        )}
        `
      )
      .setFooter("Doge te llenara de caricias")
      .setTimestamp(new Date())

    const channel = this.client.channels.cache.get(
      "640752264390246400"
    ) as TextChannel

    /** WIP => replace this id with the corresponding saved config channel for welcome   */
    return Promise.all([
      channel.send(`Hola, <@${member.user.id}>!`),
      channel.send(embed),
    ])
  }
}
