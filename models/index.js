const User = require('./User');
const Stories = require('./Stories');
const Comments = require('./Comments');

User.hasMany(Stories, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Stories.belongsTo(User, {
  foreignKey: 'user_id'
});

Stories.hasMany(Comments, {
  foreignKey: 'story_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Stories, {
  foreignKey: 'story_id'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Stories, Comments };