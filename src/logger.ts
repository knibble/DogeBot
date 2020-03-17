import pino, { Logger } from "pino";
import config from "./config/config.json";

const logger: Logger = pino({
  level: config.env.debug ? "debug" : config.env.log_level || "info",
  prettyPrint: {
    colorize: true,
    translateTime: true,
    ignore: "pid,hostname",
    crlf: false
  }
});

const DogeBot = logger.child({ name: "DogeBot" });
const listener = logger.child({ module: "Listener" });
const database = logger.child({ module: "Database" });

process.on(
  "uncaughtException",
  pino.final(DogeBot, (err: Error, finalLogger: Logger) => {
    finalLogger.error(err, "uncaughtException");
    process.exit(1);
  })
);

process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at:", p, reason);
  console.log(p);
});

export { listener, database };
export default DogeBot;
