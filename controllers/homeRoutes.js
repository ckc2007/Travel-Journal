//IMPORT ALL NECESSARY FILES AND FOLDERS
const router = require("express").Router();
const { Story, User, Comment, Trip } = require("../models");
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");




//----HOMEPAGE GET REQUEST----
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const storyData = await Story.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const stories = storyData.map((story) => {
      const plainStory = story.get({ plain: true });
      return { ...plainStory };
    });

    // Pass serialized data and session flag into template
    res.render("homepage", {
      stories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});





//----STORIES GET REQUEST----
router.get("/stories", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const storyData = await Story.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const stories = storyData.map((story) => {
      const plainStory = story.get({ plain: true });
      return { ...plainStory };
    });

    // Pass serialized data and session flag into template
    res.render("stories", {
      stories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});








//----STORY WITH COMMENTS GET REQUEST----
router.get("/stories/:id", async (req, res) => {
  try {
    const storyData = await Story.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    //store storyData collected in to story and serialize it
    const story = storyData.get({ plain: true });

    // Pass the image array to the template << not working with array anymore
    // const imageArray = story.image ? JSON.parse(story.image) : [];

    //collecting comment data
    const commentsData = await Comment.findAll({
      where: {
        story_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    //commentData collected into comments and serialize it
    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    //render both story and comments and check if user is logged_in
    res.render("story", {
      ...story,
      // image: imageArray, // Pass the image array to the template <<< don't need array anymore
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//----PROFILE GET REQUEST----
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Story }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//--Route for searching trips--
router.get("/api/trips/search", async (req, res) => {
  const searchTerm = req.query.term;

  try {
    const trips = await Trip.findAll({
      where: {
        [Op.or]: {
          tripname: {
            [Op.like]: `%${searchTerm}%`,
          },
          description: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      },
    });

    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



//----LOGIN GET REQUEST----
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});


module.exports = router;