const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const multer = require("multer");

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      // debug here
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "story",
  }
);

module.exports = Story;
