import { Command } from "discord-akairo"
import Category from "../../typedefs/categories"
import { Permissions, Message, TextChannel } from "discord.js"

export default class NukeCommand extends Command {
  public constructor() {
    super("nuke", {
      aliases: ["limpiar", "nuke"],
      category: Category.moderation.name,
      description: {
        content:
          "Elimina todo el contenido de un canal de texto | webhooks atados al canal, **desaparecerán**",
        usage: "<canal>",
        examples: ["#general"],
      },
      clientPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      channel: "guild",
      ratelimit: 2,
      args: [
        {
          id: "channel",
          type: "channel",
          prompt: {
            start: (message: Message) =>
              `${message.author}, que canal de texto te gustaría **limpiar**?\n_Recuerda que esto borrará inclusive los webhooks_`,
            retry: (message: Message) =>
              `${message.author}, por favor especifica un canal de texto.`,
            timeout: "Oops, se te acabó el tiempo. chau. wow.",
          },
        },
      ],
    })
  }

  public async exec(message: Message, { channel }: { channel: TextChannel }) {
    await message.channel.send(
      `¿Estas segur@ que quieres borrar ${channel.toString()} con id _${
        channel.id
      }_? ¡Esto no podrá deshacerse! **los webhooks serán eliminados** (si/no)`
    )
    const responses = await message.channel.awaitMessages(
      (msg) => msg.author.id === message.author.id,
      { max: 1, time: 10000 }
    )
    if (!responses || responses.size !== 1)
      return message.reply(
        "Oops, se acabó el tiempo, el comando ha sido cancelado."
      )
    const response = responses.first()
    if (
      /^s(?:i?)?$/i.test(response?.content ?? "") ||
      /^y(?:e(?:a|s)?)?$/i.test(response?.content ?? "")
    ) {
      let newChannel
      try {
        newChannel = await channel.clone()
        channel.delete()
      } catch (error) {
        console.error(error)
        return message.util!.send("Oops hubo un error al eliminar la data :S")
      }
      return (
        await newChannel.send(
          ":exploding_head: :bomb: La bomba nuclear fue lanzada **¡boom!**"
        )
      ).delete({
        timeout: 10000,
      })
    } else {
      return message.reply("Operación cancelada.")
    }
  }
}
