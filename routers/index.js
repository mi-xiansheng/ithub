const express = require('express');

const indexController = require('../controllers/index.js');

const router = express.Router();

router.get('/',indexController.showIndex);

module.exports = router;