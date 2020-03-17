import { Listener } from "discord-akairo";
import { listener as logger } from "../../logger";

export default class ErrorListener extends Listener {
  constructor() {
    super("disconnected", {
      emitter: "client",
      event: "disconnected"
    });
  }

  async exec(event: any) {
    logger.warn("Disconnected from Discord.");
    logger.debug({ metadata: { event } });
  }
}
