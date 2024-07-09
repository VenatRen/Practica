import Sequelize from "sequelize"
// Sequelize использую для взаимодействия Node с базой данных SQLite(sqlite3orm) без специального языка запросов
var conn;
(async function () {
    if (!conn) {
        try {
            conn = new Sequelize("dbName", null, null, {
                dialect: "sqlite",
                storage: "database/db.sqlite"
            });
            console.log("Connected to the database.");
                try {
                    await conn.sync({ force: true });
                    console.log("Created the tables successfully.");
                } catch (error) {
                    console.log("table err.\n" + error);
                }
            } catch (error) {
            console.log("connection err.\n" + error);
        }
    }
})();

export const Books = conn.define("Books", {
    Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Name: Sequelize.STRING,
});