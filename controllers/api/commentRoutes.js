// const router = require('express').Router();
// const { Comments } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', async (req, res) => {
//   try {
//     const { story_id, comments } = req.body;

//     // Retrieve the authenticated user ID
//     const userId = req.session.user_id;

//     const commentData = await Comments.create({
//       comments,
//       user_id: userId,
//       story_id,
//     });

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

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;