'use strict';
const {
  Model
} = require('sequelize');
const project = require('./project');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Task.hasOne(models.Client)
      // Task.belongsTo(models.Client)
      // Task.hasOne(models.Project, { foreignKey: 'projectId' })
      // Task.belongsTo(models.Project)
      // Task.sync()
    }
  }
  Task.init({
    taskName: DataTypes.STRING,
    client: DataTypes.STRING,
    project: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    dueDate: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};