import { Listener } from "discord-akairo";
import Category from "../../../typedefs/categories";
import { GuildMember } from "discord.js";
import { MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";

export default class GuildMemberAddListener extends Listener {
  constructor() {
    super("guildMemberAddListener", {
      emitter: "client",
      event: "guildMemberAdd",
      category: "automation"
    });
  }

  async exec(member: GuildMember) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
      .addField(
        `Bienvenido/a!`,
        `<@${member.user.id}> has llegado al servidor de **${
          member.guild.name
        }**!
        Esperamos que la pases bien, wow! ${this.client.emojis.cache.find(
          e => e.name === "cooldoge"
        )}
        Recuerda leer ${member.guild.channels.cache.get("640746191096774677")}
        Si tienes cualquier duda solo contacta a cualquiera de los miembros de ${member.guild.roles.cache.get(
          "640770292808941586"
        )}
        `
      )
      .setFooter("Doge te llenara de caricias")
      .setTimestamp(new Date());

    /** WIP => replace this id with the corresponding saved config channel for welcome   */
    return (this.client.channels.cache.get(
      "640752264390246400"
    ) as TextChannel).send(embed);
  }
}
