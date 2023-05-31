//IMPORT ALL NECESSARY FILES AND FOLDERS
const router = require("express").Router();
const { Story, User, Comment } = require("../models");
const upload = require("../utils/upload");
const withAuth = require("../utils/auth");

//----HOMEPAGE GET REQUEST----
// Homepage, using Story model with User attributes, renders it to homepage!
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
    // major debug here - must have JSON parse the image array
    const stories = storyData.map((story) => {
      const plainStory = story.get({ plain: true });
      const imageArray = plainStory.image ? JSON.parse(plainStory.image) : [];
      return { ...plainStory, image: imageArray };
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
//----END of GET REQUEST---

//----STORY WITH COMMENTS GET REQUEST----
// Story mode with User attribute to display story and associated comments
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

    //collecting comment data
    const commentsData = await Comment.findAll({
      where: {
        story_id: req.params.id, //Filter comments by the specific story ID
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    //store commentData collected into comments and serialize it
    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    //render both story and comments and check if user is logged_in
    res.render("story", {
      ...story,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//----END of GET REQUEST---

//----PROFILE GET REQUEST----
// User model with Story model attributes and checks to see if they're logged in first
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
//----END of GET REQUEST---

//NEW GET REQUEST CODE GOES HERE

//----LOGIN GET REQUEST----
// Renders login page for not-logged-in, and redirects to /profile for those logged-in
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});
//----END of GET REQUEST---

//EXPORT THE ROUTER FOR OTHER FILES AND FOLDERS TO USE
module.exports = router;
