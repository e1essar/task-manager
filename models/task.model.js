module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      idTask: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      type: {
        type: Sequelize.ENUM("issue", "story", "bug")
      },
      status: {
        type: Sequelize.ENUM("in process", "to do", "done")
      },
      weight: {
        type: Sequelize.INTEGER
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
        type: Sequelize.DATE
      }
    });
  
    return Task;
  };