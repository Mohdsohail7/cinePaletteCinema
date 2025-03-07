const sq = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const db = config[env];

const sequelize = new sq.Sequelize({
    dialect: db.dialect,
    storage: db.storage
});

// database connection
async function connectDB() {
    await sequelize.authenticate().then(() => {
        console.log("Database Connected Successfully.")
    }).catch((error) => {
        console.error("Unable to Connect Database", error);
    });
}
module.exports = { DataTypes: sq.DataTypes, sequelize, connectDB };
