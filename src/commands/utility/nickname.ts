import { Command } from "discord-akairo";
import Category from "../../typedefs/categories";
import { Permissions, Message, MessageEmbed } from "discord.js";

export default class NicknameCommand extends Command {
  constructor() {
    super("nickname", {
      aliases: ["apodo", "nickname"],
      category: Category.utility.name,
      description: {
        content: "Cambia tu apodo en este servidor",
        usage: "[nombre]",
        examples: ["GatoMan"],
      },
      clientPermissions: [Permissions.FLAGS.CHANGE_NICKNAME],
      channel: "guild",
      ratelimit: 2,
      args: [
        {
          id: "name",
          type: "string",
        },
      ],
    });
  }

  public async exec(message: Message, { name }: { name: string }) {
    if (!name) {
      const embed = new MessageEmbed().setColor(15897941);
      embed.addField(
        "Oops!",
        "Te estas cambiando el nombre a **?**, creo que te falto escribir el nombre ><"
      );

      return message.util!.send(embed);
    }

    if (message.author.id === message.guild!.ownerID)
      return message.reply(
        "Oops... eres muy poderoso, no puedo cambiar tu nombre :$"
      );

    message.member!.setNickname(name);
    return message.reply(`He cambiado tu nombre a ${name} :tada:`);
  }
}
