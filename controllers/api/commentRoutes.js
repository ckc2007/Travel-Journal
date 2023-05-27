// const router = require('express').Router();
// const { Comments } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const { comments, story_id } = req.body;
//     const userId = req.session.user_id;

//     const commentData = await Comments.create({
//       comments,
//       user_id: userId,
//       story_id,
//     });

//     console.log(commentData);
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;


const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { comments, story_id } = req.body;
    const userId = req.session.user_id;

    const commentData = await Comments.create({
      comments,
      user_id: userId,
      story_id,
    });
    
    const commentsData = await Comments.findAll({
      where: { story_id },
      // Include any additional attributes to retrieve from the database
    });

    console.log(commentData);
    res.render('story', { comments: commentsData });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
