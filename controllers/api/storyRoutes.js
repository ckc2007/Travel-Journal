const router = require('express').Router();
const { Stories } = require('../../models');
const withAuth = require('../../utils/auth');

//POST request to create new story
router.post('/', withAuth, async (req, res) => {
  try {
    const newStory = await Stories.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newStory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE request to delete story from user stories
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const storyData = await Stories.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!storyData) {
      res.status(404).json({ message: 'No story found with this id!' });
      return;
    }

    res.status(200).json(storyData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;