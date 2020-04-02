import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import config from "./config/config.json";
import { join } from "path";

class DogeBot extends AkairoClient {
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, ".", "commands"),
    prefix: config.bot.prefix,
    ignorePermissions: config.bot.owners,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5, // 5 minutes
    defaultCooldown: 1e4, // 1 minute
    argumentDefaults: {
      prompt: {
        modifyStart: (_, str): string =>
          `${str}\n\n Type \`cancel\` to cancel the command...`,
        modifyRetry: (_, str): string =>
          `${str}\n\n Type \`cancel\` to cancel the command...`,
        timeout: "You took too long, the command has been cancelled.",
        ended:
          "You exceeded the maximum amount of tries, the command has now been cancelled.",
        retries: 3,
        time: 3e4 // 30 seconds
      },
      otherwise: ""
    }
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, ".", "listeners")
  });

  public constructor() {
    super({
      ownerID: config.bot.owner,
      shards: "auto",
      presence: {
        activity: {
          type: "PLAYING",
          name: `doges y calabozos | ${config.bot.prefix}ayuda`
        },
        status: "online"
      }
    });
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(config.bot.token);
  }
}

export default DogeBot;
