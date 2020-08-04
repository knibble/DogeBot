import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo"
import { join } from "path"

class DogeBot extends AkairoClient {
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, ".", "commands"),
    prefix: process.env.COMMAND_PREFIX,
    ignorePermissions: process.env.OWNER,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5, // 5 minutes
    defaultCooldown: 1e4, // 1 minute
    argumentDefaults: {
      prompt: {
        modifyStart: (_, str): string =>
          `${str}\n\n Escribe \`cancelar\` para cancelar el comando...`,
        modifyRetry: (_, str): string =>
          `${str}\n\n Escribe \`cancelar\` para cancelar el comando...`,
        timeout: "You took too long, the command has been cancelled.",
        ended:
          "Superaste la cantidad máxima de intentos, el comando ahora ha sido cancelado.",
        cancelWord: "cancelar",
        retries: 3,
        time: 3e4, // 30 seconds
      },
      otherwise: "",
    },
  })

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, ".", "listeners"),
  })

  public constructor() {
    super({
      ownerID: process.env.OWNER,
      shards: "auto",
      presence: {
        activity: {
          type: "PLAYING",
          name: `${process.env.COMMAND_PREFIX}ayuda | doges y calabozos`,
        },
        status: "online",
      },
    })
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process,
    })

    this.commandHandler.loadAll()
    this.listenerHandler.loadAll()
  }

  public async start(): Promise<string> {
    await this._init()
    return this.login(process.env.BOT_TOKEN)
  }
}

export default DogeBot
