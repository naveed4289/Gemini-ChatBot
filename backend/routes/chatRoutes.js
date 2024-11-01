const express = require('express');
const router = express.Router();
const { chatWithGemini } = require('../controllers/chatController');

router.post('/', chatWithGemini);

module.exports = router;
