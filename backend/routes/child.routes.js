const express = require('express');
const router = express.Router();
const { registerChild, getChildren } = require('../controllers/child.controller');
const auth = require('../middleware/auth');

router.post('/', auth, registerChild);
router.get('/', auth, getChildren);

module.exports = router;