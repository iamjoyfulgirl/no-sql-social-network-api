const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/user', userRoutes.get());
router.use('/thoughts', thoughtRoutes.get());

module.exports = router;