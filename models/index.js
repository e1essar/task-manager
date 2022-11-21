const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, {
    foreignKey: 'idRole',
    source: 'uuid'
})
db.user.belongsTo(db.role, {
    foreignKey: 'idRole',
    source: 'uuid'
})

db.user.hasMany(db.task, {
    foreignKey: 'idUser',
    source: 'uuid'
})
db.task.belongsTo(db.user, {
    foreignKey: 'idUser',
    source: 'uuid'
})

db.ROLES = ["admin", "manager", "collaborator"];

module.exports = db;