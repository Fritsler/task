const express = require('express');
const auth = require('../controllers/auth');
const files = require('../controllers/files');
const verify = require('../middlewares/verify');

const router = express.Router();

router.use('/auth', auth);
router.use('/files', verify, files);

module.exports = router;
