import { Sequelize, Model, DataTypes } from "sequelize";
import { database as logger, database } from "../logger";
import Environment from "../typedefs/environment";
import path from "path";
import fs from "fs";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.database,
  logging: process.env.type == Environment.DEVELOPMENT
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(`Authenticated into database (${process.env.database}).`);
  })
  .catch(() => {
    logger.error(`Failed to authenticated into database.`);
  });

function synchronize(force: boolean = false) {
  try {
    let _path = path.resolve(__dirname, "models");
    let _models = fs.readdirSync(_path);

    _models.forEach(file => {
      let model = require(path.resolve(_path, file)).default;
      model.sync({ force });
    });

    logger.info(
      `${force ? "Created" : "Initialized"} ${_models.length} model${
        _models.length > 1 ? "s" : ""
      }.`
    );
    logger.debug(
      `Model${_models.length > 1 ? "s" : ""}: ${_models.join(", ")}.`
    );
  } catch (error) {
    logger.error(`Failed to initialize models.`);
    logger.error(error);
    process.exit();
  }
}

export { synchronize };
export default sequelize;
