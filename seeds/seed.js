// const sequelize = require('../config/connection');
// const { User, Stories, Comments } = require('../models');

// const userData = require('./userData.json');
// const storyData = require('./storyData.json');
// const commentData = require('./commentData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   const stories = await Stories.bulkCreate(
//     storyData.map((story) => ({
//       ...story,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     })),
//     {
//       returning: true,
//     }
//   );

//   for (const comment of commentData) {
//     const randomUser = users[Math.floor(Math.random() * users.length)];
//     const randomStory = stories[Math.floor(Math.random() * stories.length)];

//     await Comments.create({
//       ...comment,
//       user_id: randomUser.id,
//       story_id: randomStory.id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();

const sequelize = require('../config/connection');
const { User, Stories, Comments } = require('../models');

const userData = require('./userData.json');
const storyData = require('./storyData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const stories = await Stories.bulkCreate(
    storyData.map((story) => ({
      ...story,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })),
    {
      returning: true,
    }
  );

  await Comments.bulkCreate(
    commentData.map((comment) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      return {
        ...comment,
        user_id: randomUser.id,
        story_id: randomStory.id,
      };
    })
  );

  process.exit(0);
};

seedDatabase();
