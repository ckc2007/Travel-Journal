const User = require("./User");
const { Story } = require("./Story");
const Comment = require("./Comment");
const Trip = require("./Trip");

User.hasMany(Story, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Story.belongsTo(User, {
  foreignKey: "user_id",
});

Story.hasMany(Comment, {
  foreignKey: "story_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Story, {
  foreignKey: "story_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Trip, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Trip.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Story, Trip, Comment };
