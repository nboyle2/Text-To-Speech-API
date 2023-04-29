const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/voices', controllers.voices);
router.post('/text-to-speech', controllers.tts);

module.exports = router;