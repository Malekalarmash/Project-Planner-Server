'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Project.hasMany(models.Client)
      // Project.sync()
    }
  }
  Project.init({
    projectName: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    client: DataTypes.STRING,
    timeline: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};