const router = require('express').Router();
const userRoutes = require('./userRoutes');
const storyRoutes = require('./storyRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/stories', storyRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
