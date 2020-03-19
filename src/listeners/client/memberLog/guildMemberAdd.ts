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
      category: Category.configuration.name
    });
  }

  async exec(member: GuildMember) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setAuthor(
        `${member.user.tag} (${member.id})`,
        member.user.displayAvatarURL()
      )
      .setFooter("Nuevo integrante!")
      .setTimestamp(new Date());

    return (this.client.channels.cache.get(
      "689734814374559773"
    ) as TextChannel).send(embed);
  }
}
