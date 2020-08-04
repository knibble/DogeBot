import { Logger } from "pino"
const pino = require("pino")

const logger = pino({
  level: process.env.DEBUG ? "debug" : process.env.LOG_LEVEL || "info",
  prettyPrint: {
    colorize: true,
    translateTime: true,
    ignore: "pid,hostname",
    crlf: false,
  },
})

const DogeBot = logger.child({ name: "DogeBot" })
const listener = logger.child({ module: "Listener" })

process.on(
  "uncaughtException",
  pino.final(DogeBot, (err: Error, finalLogger: Logger) => {
    finalLogger.error(err, "uncaughtException")
    process.exit(1)
  })
)

process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at:", p, reason)
  console.log(p)
})

export { listener }
export default DogeBot
