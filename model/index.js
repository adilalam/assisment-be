const { Sequelize, DataTypes, Model } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("assesment", "postgres", "0000", {
  host: "127.0.0.1",
  logging: false,
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes, Model);
db.list = require("./list")(sequelize, DataTypes, Model);
db.task = require("./task")(sequelize, DataTypes, Model);

db.list.hasMany(db.task, { foreignKey: "list_id" });
db.task.belongsTo(db.list);

db.sequelize.sync({ force: false, alter: true });
module.exports = db;
