const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { text, storyId } = req.body;
    const userId = req.session.user_id;

    const commentData = await Comments.create({
      comments: text,
      user_id: userId,
      story_id: storyId,
    });
    
    res.status(200).json({ message: 'Comment created successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;