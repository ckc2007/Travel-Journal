const User = require('./User');
const Stories = require('./Stories');

User.hasMany(Stories, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Stories.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Stories };
