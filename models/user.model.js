module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      idUser: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
  };