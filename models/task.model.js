module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      assign: {
        type: Sequelize.STRING
      },
      creator: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING
      }
    });
  
    return T;
  };