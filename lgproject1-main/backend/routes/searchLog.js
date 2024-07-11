const express = require('express');
const { logSearch } = require('../controllers/searchLogController');

const router = express.Router();

router.post('/log', logSearch);

module.exports = router;