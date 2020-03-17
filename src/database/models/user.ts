import Sequelize, { Sequelize as ORM, Model } from "sequelize";
import sequelize from "../database";

export default sequelize.define('user', {
    discord_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    summoner_name: {
        type: Sequelize.STRING,
        unique: true
    },
    verification_code: {
        type: Sequelize.STRING,
    }
})