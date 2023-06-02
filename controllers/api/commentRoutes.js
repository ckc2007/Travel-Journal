const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//CREATE comments
router.post('/', withAuth, async (req, res) => {
  try {
    const { text, storyId } = req.body;
    const userId = req.session.user_id;

    const commentData = await Comment.create({
      comments: text,
      user_id: userId,
      story_id: storyId,
    });
    
    res.status(200).json({ message: 'Comment created successfully' });
    return;
  } catch (err) {
    res.status(400).json(err);
  };
});

//DELETE comments
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentDelete = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentDelete) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;