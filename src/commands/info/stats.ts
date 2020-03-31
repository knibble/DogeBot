import moment from "moment";
import { stripIndents } from "common-tags";
import { Command } from "discord-akairo";
import { Message, MessageEmbed, Permissions } from "discord.js";
import "moment-duration-format";
import Category from "../../typedefs/categories";

export default class StatsCommand extends Command {
  public constructor() {
    super("stats", {
      aliases: ["stats"],
      description: {
        content: "Muestra estadísticas acerca del bot."
      },
      category: Category.info.name,
      clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
      ratelimit: 2
    });
  }

  public async exec(message: Message) {
    const embed = new MessageEmbed()
      .setColor(15897941)
      .setDescription(`**${this.client.user!.username} Estadísticas**`)
      .addField(
        "Datos 🗄️",
        stripIndents`
				• Servidores: ${this.client.guilds.cache.size}
				• Canales: ${this.client.channels.cache.size}
			`,
        true
      )
      .addField(
        "Tiempo arriba ⏳",
        moment.duration(this.client.uptime || 0).format("d[d ]h[h ]m[m ]s[s]"),
        true
      )
      .addField(
        "Memoria usada 💾",
        `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        true
      )
      .addField("Versión", "1.0", true)
      .addField(
        "Código fuente 📝",
        "[DogeBot](https://github.com/knibble/DogeBot)",
        true
      )
      .setThumbnail(this.client.user!.displayAvatarURL() || "")
      .setFooter(`© ${new Date().getUTCFullYear()} DogeBot`);

    return message.util!.send(embed);
  }
}
