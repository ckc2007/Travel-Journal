const sequelize = require('../config/connection');
const { User, Story, Trip } = require('../models');

const userData = require('./userData.json');
const storyData = require('./storyData.json');
const tripData = require('./tripplannerData.json');
// const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const stories = await Story.bulkCreate(
    storyData.map((story) => ({
      ...story,
    })),
    {
      returning: true,
    }
  );

  const trips = await Trip.bulkCreate(
    tripData.map((trip) => ({
      tripname: trip.tripname,
      description: trip.description,
      budget: trip.budget,
    })),
    { 
      returning: true, 
    }
  );

  // await Comment.bulkCreate(
  //   commentData.map((comment) => {
  //     const randomUser = users[Math.floor(Math.random() * users.length)].id;
  //     const randomStory = stories[Math.floor(Math.random() * stories.length)].id;
  //     return {
  //       ...comment,
  //       user_id: randomUser.id,
  //       story_id: randomStory.id,
  //     };
  //   }),
  //   {
  //     individualHooks: true,
  //     returning: true,
  //   }
  // );

  process.exit(0);
};

seedDatabase();