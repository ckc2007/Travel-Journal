const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const commentRoutes = require('./commentRoutes');
const tripRoutes = require('./tripRoutes')

router.use('/users', userRoutes);
router.use('/stories', profileRoutes);
router.use('/comments', commentRoutes);
router.use('/trips', tripRoutes);

module.exports = router;
