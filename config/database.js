const sq = require("sequelize");

const sequelize = new sq.Sequelize({
    dialect: "sqlite",
    storage: "./database/sqlite"
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
