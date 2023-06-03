const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const commentRoutes = require('./commentRoutes');
// const imageRoutes = require('./imageRoutes');
// const tripRoutes = require('./tripRoutes')

router.use('/users', userRoutes);
router.use('/stories', profileRoutes);
router.use('/comments', commentRoutes);
// router.use('/images', imageRoutes);
// router.use('/trips', tripRoutes);

module.exports = router;
