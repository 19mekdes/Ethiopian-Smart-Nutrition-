const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboard.controller');
const auth = require('../middleware/auth');

router.get('/stats', auth, getStats);

module.exports = router;