const router = require('express').Router();
const userRoutes = require('./userRoutes');
const storyRoutes = require('./storyRoutes');

router.use('/users', userRoutes);
router.use('/stories', storyRoutes);

module.exports = router;
